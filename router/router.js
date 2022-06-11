const { jwtMiddle } = require("../middleware/jwt_middleware");
const { barangRouter } = require("./barang_router");
const { keranjangRouter } = require("./keranjang_router");
const { pesananRouter } = require("./pesanan_router");
const { transaksiRouter } = require("./transaksi_router");
const { userRouter } = require("./user_router");
const router = require("express")();

router.use("/user", userRouter);
router.use(jwtMiddle);
router.use("/barang", barangRouter);
router.use("/keranjang",keranjangRouter)
router.use("/pesanan",pesananRouter)
router.use("/transaksi",transaksiRouter)
module.exports = { router };
