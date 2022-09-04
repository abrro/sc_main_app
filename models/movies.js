'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categories, {foreignKey: 'categoryId', as: 'category'});
      this.hasMany(models.Reviews, { foreignKey: 'movieId', as: 'reviews', onDelete: 'cascade', hooks: true });
      
      this.belongsToMany(models.Celebrities, {through: 'Moviegroups', foreignKey: 'movieId', as: 'celebrities'});
      this.belongsToMany(models.Roles, {through: 'Moviegroups', foreignKey: 'movieId', as: 'roles'});

      this.hasMany(models.Moviegroups, { foreignKey: 'movieId', as: 'moviegroups', onDelete: 'cascade', hooks: true });

      this.belongsToMany(models.Movielists, {through: 'Listgroups', foreignKey: 'movieId', as: 'movielists'});
      this.hasMany(models.Listgroups, { foreignKey: 'movieId', as: 'listgroups', onDelete: 'cascade', hooks: true });
    }
  };
  Movies.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};