const connection = require('../connection');
const { ObjectId } = require('mongodb');
const { FailedToSaveRecipe, RecipesNotFound } = require('../../services/errorObjects')

const formatIngredients = (ingredientsArray) => {
  const formattedArray = ingredientsArray.split(',');
  return formattedArray.map((ingredient) => {
    const stringIngredient = typeof ingredient === 'number' ? ingredient.toString() : String(ingredient);
    return stringIngredient.trim();
  })
    .filter((ingredient) => ingredient !== ' ' && ingredient !== undefined && ingredient !== '');
};

const create = async (recipeData, authorId) => {
  const { name, ingredients, preparation } = recipeData;
  const ingredientsArray = formatIngredients(ingredients);
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({
      name,
      ingredients: ingredientsArray,
      preparation,
      authorId,
      imageUrl: ''
    }))
    .catch((err) => {
      throw new FailedToSaveRecipe;
    });
  return { message: 'Receita criada com sucesso', recipe: recipe.ops[0]};
};


const read = async (recipeId = null) => {
  let recipes = await connection().then((db) =>
  db.collection('recipes').find().toArray());
  if (recipeId !== 'null') {
    recipes = recipes.filter(({ _id }) => String(_id) === recipeId)[0];
  }
  if(!recipes) throw new RecipesNotFound;
  return { message: 'Receitas encontradas:', recipes };
}


const update = async (recipeData) => {
  const { recipeId, name, preparation, ingredients } = recipeData;
  const ingredientsArray = formatIngredients(ingredients);
  const updatedRecipes = await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(recipeId) },
    {
      $set: { name, preparation, ingredients: ingredientsArray }
    }));

  if(updatedRecipes.result.ok !== 1) throw new FailedToSaveRecipe();

  return { message: 'Receita atualizada com sucesso' }
};

// const deleteRecipe = async (recipeId, userId, deletePassword) => {
//   const userPassword = await connection().then((db) =>
//     db
//       .getTable('users').select('password').where('id = :userId').bind('userId', userId)
//       .execute()
//       .then((results) => results.fetchAll())
//       .then(([[password]]) => password));

//   if (deletePassword === userPassword) {
//     await connection().then((db) =>
//       db
//         .getTable('recipes_ingredients').delete().where('recipe_id = :recipeId').bind('recipeId', recipeId)
//         .execute()
//         .then(() => db
//           .getTable('users_recipes').delete().where('recipe_id = :recipeId').bind('recipeId', recipeId)
//           .execute()
//           .then(() => db
//             .getTable('recipes').delete().where('id = :recipeId').bind('recipeId', recipeId)
//             .execute())));

//     return { redirect: true };
//   }

//   return { redirect: false };
// };

module.exports = {
  create,
  read,
  update,
  // deleteRecipe,
};
