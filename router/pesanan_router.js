const { default: jwtDecode } = require("jwt-decode");
const router = require("express")();
const ordermodel = require("../models").pesanans;
const barangmodel = require("../models").barangs;
const statusmodel = require("../models").status;

router.post("/create/:id", async (req, res) => {
  try {
    const { id } = req.params;// untuk mengambil id dari barang yang di pesan
    const userId = jwtDecode(req.headers.authorization).id;//  untuk mengambil id dari user yang login dengan jwt token
    let body = req.body;// untuk mengambil data dari body
    const data = await barangmodel.findByPk(id);// untuk mengambil data dari barang yang di pesan berdasarkan id
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });// jika data tidak ditemukan akan menampilkan pesan data tidak ditemukan  
    const value = await ordermodel.create({
      user_id: userId,
      barang_id: id,
      nama: body.nama,
      jumlah: body.jumlah,
      total: body.total,
      alamat: body.alamat,
    });// untuk menambah data ke tabel pesanans berdasarkan id user dan id barang dan data yang di inputkan dan total harga yang di pesan  
    return res.status(200).json({ message: "berhasil", value });// jika status 200 maka akan menampilkan pesan berhasil dan data yang di inputkan
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// jika status 442 maka akan menampilkan error
  }
});// untuk menambahkan data transaksi pemesanan barang
router.post("/status", async (req, res) => {
  try {
    await statusmodel.bulkCreate([
      {
        status_pemesanan: "Pesanan dibuat",
      },
      {
        status_pemesanan: "Pesanan dipacking",
      },
      {
        status_pemesanan: "Pesanan dikirim",
      },
    ]);
    return res.json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});// untuk menambahkan data status pemesanan barang  untuk mengambil data status pemesanan barang
module.exports = { pesananRouter: router };
