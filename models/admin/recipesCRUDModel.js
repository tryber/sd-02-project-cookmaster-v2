const connection = require('../connection');
const { ObjectId } = require('mongodb');
const { FailedToSaveRecipe, RecipesNotFound, FailedToDeleteRecipe, ImageNotUploaded } = require('../../services/errorObjects')

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

const deleteRecipe = async (recipeId) => {
  const deletedRecipe = await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(recipeId)}));

  if(deletedRecipe.result.ok !== 1) throw new FailedToDeleteRecipe;

  return { message: 'Receita deletada com sucesso' };
};

const addRecipeImage = async (recipeId, imagepath) => {
  const updatedRecipes = await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(recipeId) },
    {
      $set: { imageUrl: imagepath }
    }));

  if(updatedRecipes.result.ok !== 1) throw new ImageNotUploaded;
  return { message: 'Imagem adicionada com sucesso.' };
}

module.exports = {
  create,
  read,
  update,
  deleteRecipe,
  addRecipeImage
};
