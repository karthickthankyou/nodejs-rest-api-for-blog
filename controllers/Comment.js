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
exports.getComment = tryCatch(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
    .populate({
      path: "post",
      select: "postTitle duration",
      populate: {
        path: "user",
        select: "name email",
      },
    })
    .populate({
      path: "user",
    })

  if (!comment) {
    return next({
      message: "Comment not found",
    })
  }

  res.status(200).json({
    success: true,
    data: comment,
  })
})

exports.addComment = tryCatch(async (req, res, next) => {
  const { postId } = req.body
  const user = req.user._id

  const post = await Post.findById(postId)

  if (!post) {
    return next({
      message: "Post not found",
    })
  }

  const comment = await Comment.create({ ...req.body, user, post: postId })

  res.status(200).json({
    success: true,
    data: comment,
  })
})
