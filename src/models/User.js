
const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
    {
      tableName: 'users',
      timestamps: false
    });

  // userModel.associate = (models) => {
  //   User.belongsToMany(models.Blog_posts,
  //     { foreignKey: 'user_id', as: 'id' });
  // };

  return User;
};

module.exports = userModel;