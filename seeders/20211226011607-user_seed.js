'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      name : 'Admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('1234', 10),
      role : 'admin',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Andrej',
      email: 'andrej@gmail.com',
      password: bcrypt.hashSync('andrej1234', 10),
      role : 'content_creator',
      createdAt:  new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Marko',
      email: 'marko@gmail.com',
      password: bcrypt.hashSync('marko1234', 10),
      role : 'content_creator',
      createdAt:  new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'John',
      email: 'johndoe@gmail.com',
      password: bcrypt.hashSync('john1234', 10),
      role : 'user',
      createdAt:  new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'User',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('user1234', 10),
      role : 'user',
      createdAt:  new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Users', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
  }
};
