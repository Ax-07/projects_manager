'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Mettez à jour les lignes existantes ici avec une valeur appropriée pour specification_id
    await queryInterface.bulkUpdate('Backlogs', { specification_id: 1 }, {}); // Mettez 1 ou une autre valeur appropriée
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate('Backlogs', { specification_id: 0 }, {});
  }
};