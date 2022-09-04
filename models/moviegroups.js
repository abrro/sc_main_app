'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moviegroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movies, {foreignKey: 'movieId', as: 'movie'});
      this.belongsTo(models.Celebrities, {foreignKey: 'celebrityId', as: 'celebrity'});
      this.belongsTo(models.Roles, {foreignKey: 'roleId', as: 'role'});   
    }
  };
  Moviegroups.init({
  }, {
    sequelize,
    modelName: 'Moviegroups',
  });
  return Moviegroups;
};