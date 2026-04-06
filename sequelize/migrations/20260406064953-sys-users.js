'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔹 Safe ENUM creation (no crash if exists)
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_users_user_type" AS ENUM ('ADMIN', 'TENANT', 'EMPLOYEE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_users_status" AS ENUM ('Active', 'Inactive', 'Deleted');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 🔹 Create users table
    await queryInterface.createTable('sys_users', {
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

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },

      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      user_type: {
        type: Sequelize.ENUM('ADMIN', 'TENANT', 'EMPLOYEE'),
        allowNull: false,
      },

      tenant_id: {
        type: Sequelize.BIGINT,
        allowNull: true, // 🔥 for circular dependency
      },

      status: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Deleted'),
        allowNull: true,
        defaultValue: 'Active',
      },

      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

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
        allowNull: false, // ✅ only required field
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sys_users'); // ✅ fixed table name

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_user_type";',
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_status";',
    );
  },
};