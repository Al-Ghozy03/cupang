const { default: jwtDecode } = require("jwt-decode");
const router = require("express")();
const ordermodel = require("../models").pesanans;
const barangmodel = require("../models").barangs;
const statusmodel = require("../models").status;

router.post("/create/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = jwtDecode(req.headers.authorization).id;
    let body = req.body;
    const data = await barangmodel.findByPk(id);
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    const value = await ordermodel.create({
      user_id: userId,
      barang_id: id,
      jumlah: body.jumlah,
      total: body.total,
      alamat: body.alamat,
    });
    return res.status(200).json({ message: "berhasil", value });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
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
});
module.exports = { pesananRouter: router };
