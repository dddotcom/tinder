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
    return queryInterface.bulkInsert('users_interests', [{
      userId: 1,
      interestId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      interestId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      interestId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      interestId: 3,
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
