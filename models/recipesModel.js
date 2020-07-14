const connection = require('./connection');

const createRecipe = async (recipeParams) => {
  const { name, ingredients, preparation, userId } = recipeParams;
  const session = await connection();
  const id = await session.sql(
    `INSERT INTO recipes (name, ingredients, prepare_method, author_id)
          VALUES (?, ?, ?, ?);`,
  )
    .bind(name)
    .bind(ingredients)
    .bind(preparation)
    .bind(userId)
    .execute()
    .then((result) => result.getAutoIncrementValue());
  return { id, name, ingredients, preparation, userId };
};

const getAllRecipes = async () => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, name, ingredients, prepare_method, url_image, author_id
    FROM recipes`,
  )
    .execute()
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(
      ([recipeId, name, ingredients, preparation, recipeImage, authorId]) =>
        ({ recipeId, name, ingredients, preparation, recipeImage, authorId }),
    ));
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
