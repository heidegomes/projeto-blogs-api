const { BlogPost, Category, PostCategory } = require('../models');

const getAll = async () => {
  const result = await BlogPost.findAll();
  return result;
};

const getCategoriesId = async () => {
  const categoriesId = await Category.findAll();
  const arr = categoriesId.map((e) => e.dataValues.id);
  return arr;
}; 

// const getPublished = async () => {
//   const posts = await BlogPost.findAll();
//   const published = posts.map((e) => console.log(e.dataValues.published));
//   console.log('published', published);
//   return published;
// };

// const getUpdated = async () => {
//   const posts = await BlogPost.findAll();
//   console.log('posts', posts);
//   const updated = posts.map((e) => console.log(e.dataValues.updated));
//   console.log('updated', updated);
//   return updated;
// };

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
  // const posts = await BlogPost.findByPk(newPost.id);
  // await getPublished();
  // await getUpdated();

  return newPost;
};

module.exports = {
  createPost,
  getAll,
};
