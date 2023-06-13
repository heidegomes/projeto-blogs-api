const categoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
    {
      tableName: 'categories',
      timestamps: false,
      underscored: true,
    });

  // userModel.associate = (models) => {
  //   User.belongsToMany(models.Blog_posts,
  //     { foreignKey: 'user_id', as: 'id' });
  // };

  return Category;
};

module.exports = categoryModel;