const { Op } = require("sequelize");
const { upload } = require("../middleware/upload_barang");
const { sequelize } = require("../models");
const barangmodel = require("../models").barangs;
const router = require("express")();

router.get("/rekomendasi", async (req, res) => {
  try {
    const data = await barangmodel.findAll({
      order: sequelize.random(),
      limit: 5,
    });
    return res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.get("/popular", async (req, res) => {
  try {
    const data = await barangmodel.findAll({
      order: sequelize.random(),
      limit: 5,
    });
    return res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await barangmodel.findByPk(id);
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    await barangmodel.destroy({ where: { id: id } });
    return res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.get("/get", async (req, res) => {
  try {
    const { category, search } = req.query;
    const data = await barangmodel.findAll({
      ...(category !== undefined && { where: { kategori: category } }),
      ...(search !== undefined && {
        where: { nama_barang: { [Op.substring]: search } },
      }),
    });
    return res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(200).json({ er });
  }
});
router.put("/update/:id", upload.single("foto_barang"), async (req, res) => {
  try {
    const { id } = req.params;
    let body = req.body;
    const data = await barangmodel.findByPk(id);
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    if (req.file?.path === undefined) {
      body.foto_barang = data.foto_barang;
    } else {
      body.foto_barang = req.file.path;
    }
    await barangmodel.update(body, { where: { id: id } });
    return res.status(200).json({ message: "berhasil update" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.post("/create", upload.single("foto_barang"), async (req, res) => {
  try {
    let body = req.body;
    if (req.file?.path === undefined)
      return res.status(442).json({ message: "wajib memasukkan foto" });
    body.foto_barang = req.file.path;
    const data = await barangmodel.create(body);
    return res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
module.exports = { barangRouter: router };
