'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Backlogs', 'specification_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null // Supprime la valeur par défaut
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Backlogs', 'specification_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0 // Valeur par défaut temporaire
    });
  }
};