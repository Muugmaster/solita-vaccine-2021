'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      healthCareDistrict: {
        type: Sequelize.STRING
      },
      orderNumber: {
        type: Sequelize.INTEGER
      },
      responsiblePerson: {
        type: Sequelize.STRING
      },
      injections: {
        type: Sequelize.INTEGER
      },
      arrived: {
        type: Sequelize.DATE
      },
      vaccine: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};