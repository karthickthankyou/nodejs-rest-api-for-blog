const Comment = require("../models/Comment")
const Post = require("../models/Post")
const { tryCatch } = require("../utils/tryCatch")

exports.getComments = tryCatch(async (req, res, next) => {
  const { postId } = req.body
  if (!postId) {
    return next({
      message: "Post id not given",
    })
  }

  const post = await Post.findById(postId)

  if (!post) {
    return next({
      message: "Post not found",
    })
  }

  const comments = await Comment.find({ post: postId })

  res.status(200).json({
    success: true,
    data: comments,
  })
})
