"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("barangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_barang: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.BIGINT,
      },
      totalBarang: {
        type: Sequelize.BIGINT,
      },
      foto_barang: {
        type: Sequelize.STRING,
      },
      kategori: {
        type: Sequelize.ENUM("rosetail", "giant", "avatar", "koi", "halfmoon", "vancy", "Multicolor","avatar", "plakat", "candy", "nemo","red dragon"),
      },
      height: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      deskripsi: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("barangs");
  },
};
