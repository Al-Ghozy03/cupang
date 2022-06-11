const router = require("express")();
const usermodel = require("../models").users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    let body = req.body;
    const data = await usermodel.findOne({
      where: { username: body.username },
    });
    if (!data) return res.status(404).json({ message: "user tidak ditemukan" });
    const verify = bcrypt.compareSync(body.password, data.password);
    if (!verify) return res.status(442).json({ message: "password salah" });
    const token = jwt.sign({ id: data.id }, process.env.JWT_SIGN);
    return res.status(200).json({ token });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});
router.post("/register", async (req, res) => {
  try {
    let body = req.body;
    const checkName = await usermodel.findOne({
      where: { username: body.username },
    });
    if (checkName)
      return res.status(442).json({ message: "username telah digunakan" });
    const checkPhone = await usermodel.findOne({
      where: { phone: body.phone },
    });
    if (checkPhone)
      return res.status(442).json({ message: "nomer hp telah digunakan" });
    body.password = bcrypt.hashSync(body.password, 10);
    const data = await usermodel.create(body);
    const token = jwt.sign({ id: data.id }, process.env.JWT_SIGN);
    return res.status(200).json({ token });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
});

module.exports = { userRouter: router };
