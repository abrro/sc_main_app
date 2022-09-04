'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      name : 'Meryl',
      lastname: 'Streep',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Pierce',
      lastname: 'Brosnan',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Amanda',
      lastname: 'Seyfried',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Phyllida',
      lastname: 'Lloyd',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Catherine',
      lastname: 'Johnson',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Hugh',
      lastname: 'Jackman',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Anne',
      lastname: 'Hathaway',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Tom',
      lastname: 'Hopper',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'William',
      lastname: 'Nicholson',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Patrick',
      lastname: 'Stewart',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Ian',
      lastname: 'McKellen',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Tom',
      lastname: 'Singer',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Tom',
      lastname: 'DeSanto',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Matthew',
      lastname: 'McConaughey',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Jessica',
      lastname: 'Chestian',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Christopher',
      lastname: 'Nolan',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Johnathan',
      lastname: 'Nolan',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Leonardo',
      lastname: 'DiCaprio',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Margot',
      lastname: 'Robbie',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Jonah',
      lastname: 'Hill',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Martin',
      lastname: 'Scorsese',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Terence',
      lastname: 'Winter',
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Celebrities', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Celebrities', null, {});
  }
};
