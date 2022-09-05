'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      title : 'Mamma mia!',
      synopsis: 'The story of a bride-to-be trying to find her real father told using hit songs by the popular 1970s group ABBA.',
      release_date: new Date("2008-05-05"),
      categoryId: 3,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Les Miserables',
      synopsis: 'In 19th-century France, Jean Valjean, who for decades has been hunted by the ruthless policeman Javert after breaking parole, agrees to care for a factory worker\'s daughter. The decision changes their lives forever.',
      release_date: new Date("2012-06-26"),
      categoryId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'X-Men',
      synopsis: 'In a world where mutants (evolved super-powered humans) exist and are discriminated against, two groups form for an inevitable clash: the supremacist Brotherhood, and the pacifist X-Men.',
      release_date: new Date("2000-05-02"),
      categoryId: 5,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Interstellar',
      synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      release_date: new Date("2014-07-15"),
      categoryId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'The Wolf of Wall Street',
      synopsis: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 1',
      synopsis: 'Dummy movie synopsis 1',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 2',
      synopsis: 'Dummy movie synopsis 2',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 3',
      synopsis: 'Dummy movie synopsis 3',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 4',
      synopsis: 'Dummy movie synopsis 4',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 5',
      synopsis: 'Dummy movie synopsis 5',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 6',
      synopsis: 'Dummy movie synopsis 6',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 7',
      synopsis: 'Dummy movie synopsis 7',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'Dummy movie 8',
      synopsis: 'Dummy movie synopsis 8',
      release_date: new Date("2013-12-11"),
      categoryId: 4,
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Movies', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Movies', null, {});
  }
};
