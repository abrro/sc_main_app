'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Moviegroups', {
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
      celebrityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references:{
          model:'Celebrities',
          key:'id'
          }
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        references:{
          model:'Roles',
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
      // }, {
    //   uniqueKeys : {
    //     Items_unique: {
    //       fields: ['movieId', 'celebrityId', 'roleId']
    //     }
    //   }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Moviegroups');
  }
};