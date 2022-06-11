"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("statuses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status_pemesanan: {
        type: Sequelize.ENUM(
          "Pesanan dibuat",
          "Pesanan dipacking",
          "Pesanan dikirim"
        ),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("statuses");
  },
};
