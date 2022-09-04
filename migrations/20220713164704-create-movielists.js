'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Movielists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      label: {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
      },
      description: {
        type : DataTypes.STRING,
        allowNull : false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'users',
          key:'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Movielists');
  }
};