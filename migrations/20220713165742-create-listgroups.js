'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Listgroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references:{
          model:'Movies',
          key:'id',
          }
      },
      movielistsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references:{
          model:'Movielists',
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
    await queryInterface.dropTable('Listgroups');
  }
};