'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('users', [{
      email: 'cat@cu.edu',
      name: 'Hello Kitty',
      age: 7,
      school: 'Cat University',
      work: '',
      about: 'I am a cat going to school.',
      animalId: '1',
      interestedIn: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'doge@hrblock.com',
      name: 'Doge',
      age: 10,
      school: '',
      work: 'H&R Block',
      about: 'I am a dog that loves doing taxes',
      animalId: '2',
      interestedIn: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'jake@at.com',
      name: 'Jake the Dog',
      age: 12,
      school: '',
      work: '',
      about: 'I am already with Lady R',
      animalId: '2',
      interestedIn: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
