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
    return queryInterface.bulkInsert('likes', [{
      userId: 1,
      userIdLiked: 2,
      isSuperLike: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      userIdLiked:1,
      isSuperLike: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId:3,
      userIdLiked: 1,
      isSuperLike: false,
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
