'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('galleries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gambar: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('galleries');
  }
};