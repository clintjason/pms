'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Notifications', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Notifications', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      // Remove autoIncrement and primaryKey if it was not the default behavior
    });
  }
};
