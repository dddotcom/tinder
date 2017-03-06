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
    return queryInterface.bulkInsert('profile_pics', [{
      url: 'http://www.cartoon-clipart.co/amp/images/hello-kitty-camera.png',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: 'https://s-media-cache-ak0.pinimg.com/originals/3a/40/46/3a40461482ddd71a1110275dbf64b7f6.gif',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: 'https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: 'http://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/0/0b/Blush.jpg/revision/latest?cb=20131031114000',
      userId: 3,
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
