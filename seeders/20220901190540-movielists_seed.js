'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      label : 'Collection 1',
      description: 'Movies i want to see',
      userId : 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'Collection 2',
      description: 'I hate there movies',
      userId : 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'Collection watchlist',
      description: 'Movies i want to watch',
      userId : 5,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'Collection 2000s',
      description: 'Movies from 00s i love',
      userId : 5,
      createdAt: new Date(),
      updatedAt:  new Date()
    }
  ]

    return queryInterface.bulkInsert('Movielists', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movielists', null, {});
  }
};
