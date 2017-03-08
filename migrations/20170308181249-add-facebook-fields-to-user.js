'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("users", "facebookId", Sequelize.STRING)
    .then(function(){
      return queryInterface.addColumn("users", "facebookToken", Sequelize.STRING);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "facebookId")
    .then(function(){
      return queryInterface.removeColumn("users", "facebookToken");
    });
  }
};
