'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listgroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movies, {foreignKey: 'movieId', as: 'movie'});
      this.belongsTo(models.Movielists, {foreignKey: 'movielistsId', as: 'movielist'});
    }
  };
  Listgroups.init({
  }, {
    sequelize,
    modelName: 'Listgroups',
  });
  return Listgroups;
};