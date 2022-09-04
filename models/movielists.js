'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movielists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {foreignKey: 'userId', as: 'user'});
      this.belongsToMany(models.Movies, {through: 'Listgroups', foreignKey: 'movielistsId', as: 'movies'});
      this.hasMany(models.Listgroups, { foreignKey: 'movielistsId', as: 'listgroups', onDelete: 'cascade', hooks: true });
    }
  };
  Movielists.init({
    label: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'Movielists',
  });
  return Movielists;
};