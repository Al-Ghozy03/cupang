'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaksi.init({
    user_id: DataTypes.INTEGER,
    barang_id: DataTypes.INTEGER,
    pesanan_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};