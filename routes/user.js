const express = require("express")

const { register, login, getUsers } = require("../controllers/user")
const { authenticate, authorize } = require("../middleware/auth")

const router = express.Router()

router.get("/", authenticate, authorize(["admin"]), getUsers)
router.post("/register", register)
router.post("/login", login)

module.exports = router
