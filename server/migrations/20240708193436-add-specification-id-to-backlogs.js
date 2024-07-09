'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Backlogs', 'specification_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permettre les valeurs NULL temporairement
      references: {
        model: 'Specifications',
        key: 'id'
      }
    });

    // Mettre à jour les lignes existantes avec une valeur appropriée
    await queryInterface.bulkUpdate('Backlogs', { specification_id: 1 }, {}); // Mettez 1 ou une autre valeur appropriée

    // Modifier la colonne pour ajouter la contrainte NOT NULL
    await queryInterface.changeColumn('Backlogs', 'specification_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Specifications',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Backlogs', 'specification_id');
  }
};