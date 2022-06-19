const { Op } = require("sequelize");
const { upload } = require("../middleware/upload_barang");
const { sequelize } = require("../models");
const barangmodel = require("../models").barangs;
const router = require("express")();

router.get("/rekomendasi", async (req, res) => {
  try {
    const data = await barangmodel.findAll({
      order: sequelize.random(),
      limit: 50,
    });// untuk mengambil data secara acak dan mengambil data dari 50 barang yang ada di database 
    return res.json({ data });//  untuk mengirimkan data ke frontend yang akan ditampilkan di halaman rekomendasi barang
  } 
  catch (er) // untuk menangkap error yang terjadi saat mengambil data dari database 
  {
    console.log(er);// menampilkan error yang terjadi
    return res.status(442).json({ er });// mengirimkan error yang terjadi ke frontend
  }
});
router.get("/popular", async (req, res) => {
  try {
    const data = await barangmodel.findAll({
      order: sequelize.random(),
      limit: 50,
    });// untuk mengambil data secara acak dan mengambil data dari 50 barang yang ada di database  
    return res.json({ data });//  untuk mengirimkan data ke frontend yang akan ditampilkan di halaman rekomendasi barang
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// mengirimkan error yang terjadi ke frontend
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;// untuk menangkap id yang dikirimkan dari frontend
    const data = await barangmodel.findByPk(id);// untuk mencari data yang sesuai dengan id yang dikirimkan dari frontend
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });// jika data tidak ditemukan maka akan menampilkan pesan data tidak ditemukan
    await barangmodel.destroy({ where: { id: id } });// untuk menghapus data yang sesuai dengan id yang dikirimkan dari frontend
    return res.status(200).json({ message: "berhasil" });// jika berhasil maka akan menampilkan pesan berhasil
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// mengirimkan error yang terjadi ke frontend
  }
});// untuk menghapus data yang ada di database  dan mengirimkan pesan berhasil ke frontend
router.get("/get", async (req, res) => {
  try {
    const { category, search } = req.query;// untuk menangkap category dan search yang dikirimkan dari frontend 
    //untuk mencari data yang sesuai dengan category dan search yang dikirimkan dari frontend 
    const data = await barangmodel.findAll({
      ...(category !== undefined && { where: { kategori: category } }),//jika undefined maka tidak akan mencari data yang sesuai dengan category yang dikirimkan dari frontend
      ...(search !== undefined && {
        where: { nama_barang: { [Op.substring]: search } },
      }),//jika undefined maka tidak akan mencari data yang sesuai dengan search yang dikirimkan dari frontend
    });// untuk mengambil data secara acak dan mengambil data dari 50 barang yang ada di database  untuk mencari data yang sesuai dengan category dan search yang dikirimkan dari frontend  
    return res.json({ data }); //menampilkan data yang dicari ke frontend 
  } catch (er) {
    console.log(er);
    return res.status(200).json({ er });//jika status 200 maka akan menampilkan pesan error yang terjadi
  }
});
router.put("/update/:id", upload.single("foto_barang"), async (req, res) => {
  try {
    const { id } = req.params;// untuk menangkap id yang dikirimkan dari frontend 
    let body = req.body;// untuk menangkap data yang dikirimkan dari frontend
    const data = await barangmodel.findByPk(id);// untuk mencari data yang sesuai dengan id yang dikirimkan dari frontend
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });// jika data tidak ditemukan maka akan menampilkan pesan data tidak ditemukan 
    if (req.file?.path === undefined)// jika file tidak ada maka akan mengirimkan pesan file tidak ada 
    {
      body.foto_barang = data.foto_barang;// jika file tidak ada maka akan mengirimkan foto_barang yang ada di database
    } else {
      body.foto_barang = req.file.path;// jika file ada maka akan mengirimkan foto_barang yang baru
    }
    await barangmodel.update(body, { where: { id: id } });// untuk mengupdate data yang sesuai dengan id yang dikirimkan dari frontend
    return res.status(200).json({ message: "berhasil update" });// jika berhasil maka akan menampilkan pesan berhasil update
  } catch (er) {
    console.log(er);// jika terjadi error maka akan menampilkan pesan error yang terjadi
    return res.status(442).json({ er });// jika status 200 maka akan menampilkan pesan error yang terjadi
  }
});// untuk mengupdate data yang ada di database  dan mengirimkan pesan berhasil ke frontend  dan mengirimkan pesan error yang terjadi ke frontend 
router.post("/create", upload.single("foto_barang"), async (req, res) => {
  try {
    let body = req.body;// untuk menangkap data yang dikirimkan dari frontend
    if (req.file?.path === undefined)// jika file tidak ada maka akan mengirimkan pesan wajib upload file
      return res.status(442).json({ message: "wajib memasukkan foto" });//  jika status 200 maka akan menampilkan pesan error yang terjadi  dan mengirimkan pesan wajib upload file
    body.foto_barang = req.file.path;// jika file ada maka akan mengirimkan foto_barang yang baru
    const data = await barangmodel.create(body);// untuk menambah data yang sesuai dengan data yang dikirimkan dari frontend
    return res.status(200).json({ data });// jika status 200 maka akan menampilkan pesan berhasil
  } catch (er) {
    console.log(er);// jika terjadi error maka akan menampilkan pesan error yang terjadi
    return res.status(442).json({ er });// jika status 200 maka akan menampilkan pesan error yang terjadi
  }
});// untuk menambah data yang ada di database  dan mengirimkan pesan berhasil ke frontend  dan mengirimkan pesan error yang terjadi ke frontend

// mendapatkan semua barang
router.get("/get all", async (req, res) => {
  try {
    const data = await barangmodel.findAll({
     
    
    });// untuk mengambil data secara acak dan mengambil data dari 50 barang yang ada di database 
    return res.json({ data });//  untuk mengirimkan data ke frontend yang akan ditampilkan di halaman rekomendasi barang
  } 
  catch (er) // untuk menangkap error yang terjadi saat mengambil data dari database 
  {
    console.log(er);// menampilkan error yang terjadi
    return res.status(442).json({ er });// mengirimkan error yang terjadi ke frontend
  }
});
module.exports = { barangRouter: router };
