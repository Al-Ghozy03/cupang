const express = require("express")
const cors = require("cors")
const { router } = require("./router/router")
const app = express()
const dotenv = require("dotenv").config()


app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT)