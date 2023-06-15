const { BlogPost, Category, PostCategory, User } = require('../models');

const getAll = async () => {
  const result = await BlogPost.findAll({ 
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, 
        as: 'categories', 
        through: { attributes: [] }, 
      },
    ],
  });
  return result;
};

const getCategoriesId = async () => {
  const categoriesId = await Category.findAll();
  const arr = categoriesId.map((e) => e.dataValues.id);
  return arr;
}; 

const createPost = async ({ title, content, categoryIds, id }) => {
  const array = await getCategoriesId();
  const result = categoryIds.map((categoryId) => array.includes(categoryId));
  console.log('categoryIds', result);
  if (result.includes(false)) {
    return false;
  }
  const newPost = await BlogPost.create({ title, content, userId: id });
  const newCategory = categoryIds.map(async (i) => PostCategory.create({ 
    categoryId: i, postId: newPost.id, 
  }));
  await Promise.all(newCategory);

  return newPost;
};

module.exports = {
  createPost,
  getAll,
};
