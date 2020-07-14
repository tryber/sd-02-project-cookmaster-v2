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

const getRecipeById = async (paramId) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, name, ingredients, prepare_method, url_image, author_id
    FROM recipes
    WHERE id = ?`,
  )
    .bind(paramId)
    .execute()
    .then((results) => results.fetchAll()[0] || []);

  if (!result.length) return null;

  const [id, name, ingredients, preparation, image, authorId] = result;
  return { id, name, ingredients, preparation, image, authorId };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
