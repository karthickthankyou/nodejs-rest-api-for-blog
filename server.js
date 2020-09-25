const express = require("express")
const app = express()
require("dotenv").config()

const { connectDB } = require("./db")
connectDB()

const ErrorResponse = require("./middleware/ErrorResponse")

const user = require("./routes/user")
const posts = require("./routes/posts")
const comments = require("./routes/comments")

app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" })
})

app.use("/user", user)
app.use("/posts", posts)
app.use("/comments", comments)

app.use(ErrorResponse)

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`)
})
