const connection = require('../connection');

const formatIngredients = (ingredientsArray) => {
  const formattedArray = ingredientsArray.split(',');
  return formattedArray.map((ingredient) => {
    const stringIngredient = typeof ingredient === 'number' ? ingredient.toString() : String(ingredient);
    return stringIngredient.trim();
  })
    .filter((ingredient) => ingredient !== ' ' && ingredient !== undefined && ingredient !== '');
};

const addNewRecipe = async (recipeData, userId) => {
  const { name, ingredients, description } = recipeData;
  const ingredientsArray = formatIngredients(ingredients);
  const newRecipe = await connection().then((db) =>
    db
      .getTable('recipes').insert(['name', 'recipe_description']).values([name, description])
      .execute()
      .then((results) => results.getAutoIncrementValue())
      .then((recipeId) => db
        .getTable('users_recipes').insert(['user_id', 'recipe_id']).values([userId, recipeId])
        .execute()
        .then(() => ingredientsArray.map((ingredient) => db
          .getTable('ingredients').insert('ingredient_name').values(ingredient)
          .execute()
          .then((results) => results.getAutoIncrementValue())
          .then((ingredientId) => db
            .getTable('recipes_ingredients').insert(['recipe_id', 'ingredient_id']).values([recipeId, ingredientId])
            .execute())))));

  const status = await Promise.all(newRecipe).then((results) => results);
  const errorCount = status.reduce((acc, stats) => acc + stats.getWarnings().length, 0);
  if (errorCount === 0) return { message: 'Receita criada com sucesso', redirect: true };
  return { message: 'Algo deu errado...', redirect: false };
};

const updateRecipe = async (recipeData) => {
  const { id, name, description, ingredients } = recipeData;
  const ingredientsArray = formatIngredients(ingredients);

  console.log(recipeData);

  const updatedRecipes = await connection().then((db) =>
    db
      .getTable('recipes').update().where('id = :id').bind('id', id)
      .set('name', name)
      .set('recipe_description', description)
      .execute()
      .then(() => db.getTable('recipes_ingredients')
        .delete()
        .where('recipe_id = :id')
        .bind('id', id)
        .execute()
        .then(() => ingredientsArray.map((ingredient) => db
          .getTable('ingredients').insert('ingredient_name').values(ingredient).execute()
          .then((results) => results.getAutoIncrementValue())
          .then((ingredientId) => db.getTable('recipes_ingredients').insert(['recipe_id', 'ingredient_id'])
            .values([id, ingredientId]).execute())))));

  await Promise.all(updatedRecipes);
};

const deleteRecipe = async (recipeId, userId, deletePassword) => {
  const userPassword = await connection().then((db) =>
    db
      .getTable('users').select('password').where('id = :userId').bind('userId', userId)
      .execute()
      .then((results) => results.fetchAll())
      .then(([[password]]) => password));

  if (deletePassword === userPassword) {
    await connection().then((db) =>
      db
        .getTable('recipes_ingredients').delete().where('recipe_id = :recipeId').bind('recipeId', recipeId)
        .execute()
        .then(() => db
          .getTable('users_recipes').delete().where('recipe_id = :recipeId').bind('recipeId', recipeId)
          .execute()
          .then(() => db
            .getTable('recipes').delete().where('id = :recipeId').bind('recipeId', recipeId)
            .execute())));

    return { redirect: true };
  }

  return { redirect: false };
};

module.exports = {
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
};
