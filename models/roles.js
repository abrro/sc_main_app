'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Movies, {through: 'Moviegroups', foreignKey: 'roleId', as: 'movies'});
      this.belongsToMany(models.Celebrities, {through: 'Moviegroups', foreignKey: 'roleId', as: 'celebrities'});

      this.hasMany(models.Moviegroups, { foreignKey: 'roleId', as: 'moviegroups', onDelete: 'cascade', hooks: true });
    }
  };
  Roles.init({
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};