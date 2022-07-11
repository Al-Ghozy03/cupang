const {
  default: jwtDecode
} = require("jwt-decode");
const {
  QueryTypes
} = require("sequelize");
const {
  sequelize
} = require("../models");
const router = require("express")();
const cartmodel = require("../models").keranjang;
const barangmodel = require("../models").barangs;

router.get("/get", async (req, res) => {
  try {
    const data = await sequelize.query(
      `select cart.id,cart.barang_id,barangs.nama_barang,cart.jumlah,barangs.harga,barangs.foto_barang,barangs.kategori,barangs.height,barangs.weight,barangs.age,barangs.deskripsi from keranjangs as cart join barangs on cart.barang_id = barangs.id where cart.user_id = ${
        jwtDecode(req.headers.authorization).id
      }`// untuk mengambil data dari tabel keranjang dan barangs
      , {
        type: QueryTypes.SELECT,// type yang digunakan untuk mengambit adalah SELECT
        raw: true,// raw yang digunakan untuk mengambil adalah true
      }
    );// untuk mengambil data dari database berdasarkan id user yang login 
    return res.json({
      data
    });// untuk mengirim data ke frontend
  } catch (er) // jika terjadi error
  {
    console.log(er);// untuk menampilkan error
    return res.status(442).json({
      er
    });//jika status 442 maka akan menampilkan error
  }
});// untuk mengambil data keranjang dari database berdasarkan id user yang login 
router.delete("/delete/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;// untuk mengambil id dari parameter
    const data = await cartmodel.findByPk(id);// untuk mengambil data dari tabel keranjang berdasarkan id
    if (!data) return res.status(442).json({
      message: "data tidak ditemukan"
    });// jika data tidak ditemukan akan menampilkan pesan data tidak ditemukan 
    await cartmodel.destroy({
      where: {
        id: id
      }
    });// untuk menghapus data dari tabel keranjang berdasarkan id 
    return res.status(200).json({
      message: "berhasil"
    });//jika status 200 maka akan menampilkan pesan berhasil
  } catch (er) {
    console.log(er);
    return res.status(442).json({
      er
    });// jika status 442 maka akan menampilkan error
  }
});// untuk menghapus data keranjang dari database berdasarkan id user yang login
router.post("/add/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;// untuk mengambil id dari parameter
    const data = await barangmodel.findByPk(id);// untuk mengambil data dari tabel barangs berdasarkan id 
    if (!data) return res.status(404).json({
      message: "data tidak ditemukan"
    });// jka data tidak ditemukan akan menampilkan pesan data tidak ditemukan
    const check = await cartmodel.findOne({
      where: {
        user_id: jwtDecode(req.headers.authorization).id,
        barang_id: id,
      },// untuk mengambil data dari tabel keranjang berdasarkan id user dan id barang
    });// untuk mengecheck data dari tabel keranjang berdasarkan id user dan id barang
    if (check)
      return res.status(442).json({
        message: "data sudah ada di keranjang"
      });//jika data sudah ada di keranjang akan menampilkan pesan data sudah ada di keranjang 
    await cartmodel.create({
      user_id: jwtDecode(req.headers.authorization).id,
      barang_id: id,
      jumlah:  req.body.jumlah ,
    });// untuk menambah data ke tabel keranjang berdasarkan id user dan id barang dan jumlah 1
    await barangmodel.update({totalBarang: parseInt(data.totalBarang) - parseInt(req.body.jumlah)}, {where:{id:id}})
    return res.status(200).json({
      message: "berhasil"
    });//jika status 200 maka akan menampilkan pesan berhasil
  } catch (er) {
    console.log(er);// untuk menampilkan error
    return res.status(442).json({
      er
    });// jika status 442 maka akan menampilkan error
  }
});// untuk menambah data keranjang dari database berdasarkan id user yang login 


module.exports = {
  keranjangRouter: router
};