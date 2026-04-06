'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔹 Safe ENUM creation
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_subs_tenants_status" AS ENUM ('Active', 'Inactive', 'Deleted');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.createTable('subs_tenants', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },

      uuid: {
        type: Sequelize.STRING(36),
        allowNull: false,
        unique: true,
      },

      owner_user_id: {
        type: Sequelize.BIGINT,
        allowNull: true, // 🔥 circular dependency safe
      },

      business_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      logo_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Deleted'),
        allowNull: true,
        defaultValue: 'Active',
      },

      timezone: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      currency: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },

      locale: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },

      trial_ends_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      // 🔹 Audit fields (added by you)
      created_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      updated_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      deleted_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      created_at: {
        allowNull: false, // ✅ only required
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('subs_tenants');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_subs_tenants_status";',
    );
  },
};