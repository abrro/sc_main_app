'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movies, {foreignKey: 'movieId', as: 'movie'});
      this.belongsTo(models.Users, {foreignKey: 'userId', as: 'user'});
    }
  };
  Reviews.init({
    summary:{
      type: DataTypes.STRING,
      allowNull: false
    },
    comment:{
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};