'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [
      {
        movieId : 1,
        celebrityId: 1,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 1,
        celebrityId: 2,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 1,
        celebrityId: 3,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 1,
        celebrityId: 4,
        roleId : 2,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 1,
        celebrityId: 5,
        roleId : 3,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 2,
        celebrityId: 6,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 2,
        celebrityId: 7,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 2,
        celebrityId: 9,
        roleId : 2,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 2,
        celebrityId: 8,
        roleId : 3,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 3,
        celebrityId: 6,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 3,
        celebrityId: 9,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 3,
        celebrityId: 10,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 3,
        celebrityId: 11,
        roleId : 2,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 3,
        celebrityId: 12,
        roleId : 2,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 3,
        celebrityId: 11,
        roleId : 3,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 4,
        celebrityId: 13,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 4,
        celebrityId: 13,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 4,
        celebrityId: 7,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 4,
        celebrityId: 15,
        roleId : 2,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 4,
        celebrityId: 16,
        roleId : 2,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 4,
        celebrityId: 15,
        roleId : 3,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 5,
        celebrityId: 17,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 5,
        celebrityId: 18,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 5,
        celebrityId: 19,
        roleId : 1,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 5,
        celebrityId: 21,
        roleId : 3,
        createdAt: new Date(),
        updatedAt:  new Date()
      },
      {
        movieId : 5,
        celebrityId: 20,
        roleId : 3,
        createdAt: new Date(),
        updatedAt:  new Date()
      }
      ]

    return queryInterface.bulkInsert('Moviegroups', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Moviegroups', null, {});
  }
};
