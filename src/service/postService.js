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

const getById = async (id) => {
  const result = await BlogPost.findByPk(
    id,
    {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  },
);
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

const verifiedIdPost = async (id) => {
  const idPost = await BlogPost.findOne({ where: { id } });
  if (!idPost) return false;
  return idPost;
};

const verifyUserIdPost = async (idPost, userIdValue) => {
  const isPostUserIdFound = await BlogPost.findOne({ where: { id: idPost, userId: userIdValue } });
  return !(!isPostUserIdFound);
};

const updatedPost = async ({ title, content, id, userId }) => {
  const verifiedId = await verifiedIdPost(id);
  if (!verifiedId) return false;

  await BlogPost.update({ title, content }, { where: { id, userId } });

  const result = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] }, 
      },
      { 
        model: Category,
        as: 'categories',
        through: { attributes: [] },  
      }],
  });

  return result;
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatedPost,
  verifyUserIdPost,
};
