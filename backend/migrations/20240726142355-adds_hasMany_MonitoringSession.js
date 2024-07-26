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
    await queryInterface.addColumn('MonitoringSessions', 'user_id', {
      type: Sequelize.UUID,
      references: {
        model: 'Users', // name of the target model
        key: 'id', // key in the target model that the foreign key refers to
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.removeColumn('MonitoringSessions', 'session_id');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('MonitoringSessions', 'user_id');
  }
};
