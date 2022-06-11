const { default: jwtDecode } = require("jwt-decode");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const router = require("express")();
const paymentmodel = require("../models").transaksi;

router.put("update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await paymentmodel.findByPk(id);
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    await paymentmodel.update(
      { status_id: req.body.status_id },
      { where: { id: id } }
    );
    return res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await paymentmodel.findByPk(id);
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    await paymentmodel.destroy({ where: { id: id } });
    return res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.get("/get", async (req, res) => {
  try {
    const data = await sequelize.query(
      `select payment.id,payment.user_id,status.status_pemesanan,payment.barang_id,payment.pesanan_id,payment.status_id,orders.jumlah,orders.total,orders.alamat,barangs.foto_barang,barangs.nama_barang from transaksis as payment join pesanans as orders on payment.pesanan_id = orders.id join barangs on payment.barang_id = barangs.id join statuses as status on payment.status_id = status.id where payment.user_id = ${
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
router.post("/create/:id", async (req, res) => {
  try {
    let body = req.body;
    body.user_id = jwtDecode(req.headers.authorization).id;
    body.barang_id = req.params.id;
    await paymentmodel.create(body);
    return res.json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
module.exports = { transaksiRouter: router };
