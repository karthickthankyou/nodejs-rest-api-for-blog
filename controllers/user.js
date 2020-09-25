const User = require("../models/User")

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body

  const user = await User.create({
    name,
    email,
    password,
    role,
  })

  const token = user.getSignedJwt()

  res.status(201).json({
    success: true,
    token,
    user,
  })
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.json({
      success: false,
      err: { message: "Please provide valid email and password" },
    })
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return res.json({
      success: false,
      err: { message: "Invalid credentials." },
    })
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return res.json({
      success: false,
      err: { message: "Invalid credentials" },
    })
  }

  const token = user.getSignedJwt()

  res.status(201).json({
    success: true,
    token,
  })
}
