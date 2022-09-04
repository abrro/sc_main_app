'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      label : 'Horror',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'Drama',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'Musical',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'Comedy',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'Action',
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Categories', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
