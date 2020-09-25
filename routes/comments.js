const express = require("express")

const router = express.Router()

const {
  getComments,
  getComment,
  addComment,
} = require("../controllers/Comment")
const { authenticate } = require("../middleware/auth")

router.get("/", getComments)
router.get("/:id", getComment)
router.post("/", authenticate, addComment)

module.exports = router
