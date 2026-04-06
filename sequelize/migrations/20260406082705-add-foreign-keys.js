'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔹 users → tenants
    await queryInterface.addConstraint('sys_users', {
      fields: ['tenant_id'],
      type: 'foreign key',
      name: 'fk_users_tenant',
      references: {
        table: 'subs_tenants',
        field: 'id',
      },
      onDelete: 'SET NULL',
    });

    // 🔹 tenants → users
    await queryInterface.addConstraint('subs_tenants', {
      fields: ['owner_user_id'],
      type: 'foreign key',
      name: 'fk_tenant_owner',
      references: {
        table: 'sys_users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('sys_users', 'fk_users_tenant');
    await queryInterface.removeConstraint('subs_tenants', 'fk_tenant_owner');
  },
};