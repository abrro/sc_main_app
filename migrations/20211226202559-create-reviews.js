'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'Movies',
          key:'id'
          }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'Users',
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
    await queryInterface.dropTable('Reviews');
  }
};