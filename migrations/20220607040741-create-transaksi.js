'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksis', {
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
      pesanan_id: {
        type: Sequelize.INTEGER,
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
        references:{
          model:"pesanans",
          key:"id",
          as:"pesanan_id"
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
        references:{
          model:"statuses",
          key:"id",
          as:"status_id"
        }
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
    await queryInterface.dropTable('transaksis');
  }
};