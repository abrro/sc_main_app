'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      movieId : 1,
      movielistsId: 1,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      movieId : 2,
      movielistsId: 1,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      movieId : 3,
      movielistsId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      movieId : 5,
      movielistsId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      movieId : 1,
      movielistsId: 3,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      movieId : 4,
      movielistsId: 3,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      movieId : 2,
      movielistsId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      movieId : 3,
      movielistsId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    }]
   
    return queryInterface.bulkInsert('Listgroups', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Listgroups', null, {});
  }
};
