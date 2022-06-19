"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  barangs.init({
    nama_barang: DataTypes.STRING,

    harga: DataTypes.BIGINT,
    totalBarang: DataTypes.BIGINT,
    foto_barang: DataTypes.STRING,
    kategori: DataTypes.ENUM(
      "rosetail", 
      "giant", 
      "avatar", 
      "koi", 
      "halfmoon", 
      "vancy", 
      "Multicolor", 
      "avatar", 
      "plakat",
      "candy",
      "nemo",
      "red dragon"
    ),
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "barangs",
  });
  return barangs;
};