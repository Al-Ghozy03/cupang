const { default: jwtDecode } = require("jwt-decode");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const router = require("express")();
const paymentmodel = require("../models").transaksi;

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;// untuk mengambil id dari parameter
    await paymentmodel.update(
      { status_id: req.body.status_id },// untuk mengupdate status_id dari tabel transaksi berdasarkan id
      { where: { pesanan_id: id } }// untuk mengupdate data berdasarkan id
    );// untuk mengupdate data dari tabel transaksi berdasarkan id yang di inputkan dan status yang di inputkan untuk mengupdate status pemesanan
    return res.status(200).json({ message: "berhasil" });// jika status 200 maka akan menampilkan pesan berhasil
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// jika status 442 maka akan menampilkan error
  }
});// untuk mengubah data status pemesanan barang berdasarkan id pesanan barang
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;// untuk mengambil id dari parameter
    const data = await paymentmodel.findByPk(id);// untuk mengambil data dari tabel transaksi berdasarkan id yang di inputkan untuk menghapus data
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });// jika data tidak ditemukan akan menampilkan pesan data tidak ditemukan
    await paymentmodel.destroy({ where: { id: id } });// untuk menghapus data dari tabel transaksi berdasarkan id yang di inputkan 
    return res.status(200).json({ message: "berhasil" });// jika status 200 maka akan menampilkan pesan berhasil
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// jika status 442 maka akan menampilkan error
  }
});// untuk menghapus data transaksi pemesanan barang berdasarkan id pesanan barang
router.get("/get", async (req, res) => {
  try {
    const data = await sequelize.query(
      `select payment.id,payment.user_id,status.status_pemesanan,payment.barang_id,payment.pesanan_id,payment.status_id,orders.nama,orders.jumlah,orders.total,orders.alamat,barangs.foto_barang,barangs.nama_barang from transaksis as payment join pesanans as orders on payment.pesanan_id = orders.id join barangs on payment.barang_id = barangs.id join statuses as status on payment.status_id = status.id where payment.user_id = ${
        jwtDecode(req.headers.authorization).id
      }`,
      // untuk mengambil data dari tabel transaksi berdasarkan id yang di inputkan untuk menampilkan data transaksi pemesanan barang berdasarkan id user 
      {
        type: QueryTypes.SELECT,// menggunaan type query types select
        raw: true,// menggunaan raw true
      }
    );
    return res.json({ data });// jika status 200 maka akan menampilkan data transaksi pemesanan barang berdasarkan id user
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// jika status 442 maka akan menampilkan error
  }
});// untuk menampilkan data transaksi pemesanan barang berdasarkan id user yang login dan status pemesanan yang di inputkan 
router.post("/create/:id", async (req, res) => {
  try {
    let body = req.body;// untuk mengambil data dari body
    body.user_id = jwtDecode(req.headers.authorization).id;// untuk mengambil id user yang login dari token
    body.barang_id = req.params.id;// untuk mengambil id barang yang di inputkan dari parameter 
    await paymentmodel.create(body);// untuk menambah data transaksi pemesanan barang  berdasarkan data yang di inputkan
    return res.json({ message: "berhasil" });// jika status 200 maka akan menampilkan pesan berhasil
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// jika status 442 maka akan menampilkan error
  }
});// untuk menambah data transaksi pemesanan barang berdasarkan id user yang login dan id barang yang di inputkan
module.exports = { transaksiRouter: router };
