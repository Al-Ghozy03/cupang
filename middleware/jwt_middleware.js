const usermodel = require("../models").users;
const jwt = require("jsonwebtoken");

async function jwtMiddle(req, res, next) {
  const { authorization } = req.headers;// untuk mengambil token yang ada di header 
  if (authorization == undefined) return res.sendStatus(401);// jika token tidak ada akan menampilkan status 401
  const token = authorization.split(" ")[1];// untuk mengambil token yang ada di header authorization 

  jwt.verify(token, process.env.JWT_SIGN, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        message: "invalid token", 
        data: err,
      });// jika token tidak valid akan menampilkan pesan invalid token dan error
    } else {
      const user = await usermodel.findOne({ id: decode.id });// untuk mengambil data user berdasarkan id yang ada di token 
      if (!user)
        return res.json({
          message: "user sudah dihapus",
        });// jika user tidak ditemukan akan menampilkan pesan user sudah dihapus
      req.id = decode?.id;// untuk mengambil id user yang ada di token 
      next();// untuk melanjutkan ke next 
    }
  });// untuk mengecek token yang ada di header authorization dan jika tidak sama dengan secret yang ada di .env file maka akan menampilkan pesan invalid token dan jika sama dengan secret yang ada di .env file maka akan melanjutkan ke next()
}// untuk mengecek token yang di inputkan apakah valid atau tidak
module.exports = { jwtMiddle };
