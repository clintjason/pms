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
    await queryInterface.addColumn('Notifications', 'type', {
      type: Sequelize.STRING,
      allowNull: false,  // Adjust according to your needs
    });
    
    await queryInterface.addColumn('Notifications', 'message', {
      type: Sequelize.STRING,
      allowNull: false,  // Adjust according to your needs
    });

    // Remove the foreign key and column related to the Message table
    await queryInterface.removeColumn('Notifications', 'message_id');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Revert the changes: remove new columns and add back the foreign key
    await queryInterface.removeColumn('Notifications', 'type');
    await queryInterface.removeColumn('Notifications', 'message');

    await queryInterface.addColumn('Notifications', 'message_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Messages',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
