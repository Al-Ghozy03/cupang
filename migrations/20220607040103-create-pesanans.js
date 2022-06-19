'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pesanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
        references:{
          model:"users",
          key:"id",
          as:"user_id"
        }
      },
      barang_id: {
        type: Sequelize.INTEGER,
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
        references:{
          model:"barangs",
          key:"id",
          as:"barang_id"
        }
      },

      nama: {
        type: Sequelize.STRING
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.BIGINT
      },
      alamat: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pesanans');
  }
};