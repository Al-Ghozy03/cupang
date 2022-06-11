const { default: jwtDecode } = require("jwt-decode");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const router = require("express")();
const cartmodel = require("../models").keranjang;
const barangmodel = require("../models").barangs;

router.get("/get", async (req, res) => {
  try {
    const data = await sequelize.query(
      `select cart.id,cart.barang_id,barangs.nama_barang,cart.jumlah,barangs.harga,barangs.foto_barang,barangs.kategori,barangs.height,barangs.weight,barangs.age,barangs.deskripsi from keranjangs as cart join barangs on cart.barang_id = barangs.id where cart.user_id = ${
        jwtDecode(req.headers.authorization).id
      }`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    return res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cartmodel.findByPk(id);
    if (!data) return res.status(442).json({ message: "data tidak ditemukan" });
    await cartmodel.destroy({ where: { id: id } });
    return res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.post("/add/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await barangmodel.findByPk(id);
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    const check = await cartmodel.findOne({
      where: {
        user_id: jwtDecode(req.headers.authorization).id,
        barang_id: id,
      },
    });
    if (check)
      return res.status(442).json({ message: "data sudah ada di keranjang" });
    await cartmodel.create({
      user_id: jwtDecode(req.headers.authorization).id,
      barang_id: id,
    });
    return res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
module.exports = { keranjangRouter: router };
