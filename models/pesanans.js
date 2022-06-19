'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesanans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pesanans.init({
    user_id: DataTypes.INTEGER,
    barang_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    total: DataTypes.BIGINT,
    alamat: DataTypes.STRING,  
  }, {
    sequelize,
    modelName: 'pesanans',
  });
  return pesanans;
};