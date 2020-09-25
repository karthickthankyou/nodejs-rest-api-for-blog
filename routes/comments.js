const express = require("express")

const router = express.Router()

const { getComments } = require("../controllers/Comment")
const { authenticate } = require("../middleware/auth")

router.get("/", getComments)

module.exports = router
