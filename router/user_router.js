const router = require("express")();
const usermodel = require("../models").users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
// const { where } = require("sequelize/types");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    let body = req.body;// untuk mengambil data dari body
    const data = await usermodel.findOne({
      where: { username: body.username },
    });// untuk mengambil data dari user berdasarkan username yang di inputkan di register
    if (!data) return res.status(404).json({ message: "user tidak ditemukan" });// jika data tidak ditemukan akan menampilkan pesan user tidak ditemukan
    const verify = bcrypt.compareSync(body.password, data.password);// untuk mengecek password yang di inputkan dan password yang ada di database  berdasarkan username yang di inputkan
    if (!verify) return res.status(442).json({ message: "password salah" });// jika password salah akan menampilkan pesan password salah 
    const token = jwt.sign({ id: data.id }, process.env.JWT_SIGN);// untuk mengambil token yang dibuat berdasarkan id user dan secret yang ada di .env file
    return res.status(200).json({ token });// jika status 200 maka akan menampilkan pesan berhasil dan token yang dibuat
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// jika status 442 maka akan menampilkan error
  }
});// untuk melakukan login dengan username dan password yang di inputkan
router.post("/register", async (req, res) => {
  try {
    let body = req.body;// untuk mengambil data dari body
    const checkName = await usermodel.findOne({
      where: { username: body.username },// untuk mengcheck username yang di inputkan apakah sudah ada atau belum di database 
    });// 
    if (checkName) //jika username sudah ada akan menampilkan pesan username telah digunakan
      return res.status(442).json({ message: "username telah digunakan" });// jika status 442 maka akan menampilkan pesan username telah digunakan
    const checkPhone = await usermodel.findOne({
      where: { phone: body.phone },
    });// untuk mengcheck phone yang di inputkan apakah sudah ada atau belum di database
    if (checkPhone)// jika phone sudah ada akan menampilkan pesan phone telah digunakan 
      return res.status(442).json({ message: "nomer hp telah digunakan" });// jika status 442 maka akan menampilkan pesan phone telah digunakan
    body.password = bcrypt.hashSync(body.password, 10);// untuk mengenkripsi password yang di inputkan 
    const data = await usermodel.create(body);// untuk menambah data user ke database 
    const token = jwt.sign({ id: data.id }, process.env.JWT_SIGN);// untuk mengambil token yang dibuat berdasarkan id user dan secret yang ada di .env file 

    return res.status(200).json({ token });// jika status 200 maka akan menampilkan pesan berhasil dan token yang dibuat
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });// jika status 442 maka akan menampilkan error
  }
});// untuk melakukan register dengan username dan password yang di inputkan dan nomer hp yang di inputkan 



//membuat user get
router.get("/get", async (req, res) => {
  try {
    const data = await usermodel.findOne ({
      where: { id: jwtDecode(req.headers.authorization).id },

      
    })
    if (!data) return res.status(404).json({ message: "user tidak ditemukan" });
    return res.status(200).json({ data });
  
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
   
  }
});


 

// untuk melakukan get semua data user


module.exports = { userRouter: router };
