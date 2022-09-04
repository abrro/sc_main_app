'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Movielists, { foreignKey: 'userId', as: 'movielists', onDelete: 'cascade', hooks: true });
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Not a proper email"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false
    },
    role: {
      type : DataTypes.ENUM(['admin', 'content_creator', 'user']),
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};