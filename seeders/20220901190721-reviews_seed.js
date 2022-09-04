'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      summary : 'Amazing',
      comment: 'This movie was fun!',
      rating: 8,
      userId : 4,
      movieId: 1,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      summary : 'Amazing',
      comment: 'This movie was good!',
      rating: 6,
      userId : 4,
      movieId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      summary : 'Amazing',
      comment: 'This movie was bad!',
      rating: 2,
      userId : 4,
      movieId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      summary : 'Amazing',
      comment: 'This movie was fun!',
      rating: 7,
      userId : 5,
      movieId: 3,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      summary : 'Amazing',
      comment: 'This movie was ok!',
      rating: 9,
      userId : 5,
      movieId: 3,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      summary : 'Amazing',
      comment: 'This movie was short!',
      rating: 2,
      userId : 5,
      movieId: 3,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      summary : 'Amazing',
      comment: 'This movie was too long!',
      rating: 3,
      userId : 5,
      movieId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      summary : 'Amazing',
      comment: 'This movie was awful!',
      rating: 2,
      userId : 5,
      movieId: 5,
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Reviews', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', fields, {});
  }
};
