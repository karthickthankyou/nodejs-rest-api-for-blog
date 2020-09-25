const express = require("express")

const router = express.Router()

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/Post")
const { authenticate } = require("../middleware/auth")

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", authenticate, createPost)
router.put("/:id", authenticate, updatePost)
router.delete("/:id", authenticate, deletePost)

module.exports = router
