'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      role : 'star',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      role : 'writer',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      role : 'director',
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Roles', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
