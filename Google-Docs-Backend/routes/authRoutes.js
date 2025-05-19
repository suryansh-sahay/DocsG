const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const crypto = require("crypto");
const sendEmail = require("../sendEmail");
const createToken = (id) => {
  return jwt.sign({ id }, "surya secret", {
    expiresIn: 60 * 60 * 3,
  });
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  if (!user.verified) {
    return res.status(403).json({ error: "Please verify your email first" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const jwtToken = createToken(user._id);
  res.cookie("jwt", jwtToken, {
    httpOnly: false,
    maxAge: 3 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Logged in successfully" });
});

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.create({
    username,
    password,
    email,
  });
  const emailToken = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  const url = `http://localhost:3002/${user._id}/verify/${emailToken.token}`;
  await sendEmail(user.email, "Verification email", url);

  res.status(202).json({ message: "Email sent to your Account !" });
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ message: "logged out" });
  // redirect part left
});

router.get("/:userid/verify/:token", async (req, res) => {
  const userId = req.params.userid;
  try {
    const user = await User.findOne({ _id: req.params.userid });
    if (!user) res.status(400).send("invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) res.status(400).send("invalid link");
    await User.findByIdAndUpdate(userId, { verified: true });
    const jwtToken = createToken(user._id);
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 60,
    });
    res.status(200).send(`
<html>
  <head>
    <title>Email Verified</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(to right, #74ebd5, #ACB6E5);
        margin: 0;
      }
      .card {
        background: #fff;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 400px;
        animation: fadeIn 0.6s ease-out;
      }
      .card h1 {
        color: #27ae60;
        font-size: 28px;
        margin-bottom: 10px;
      }
      .card p {
        font-size: 16px;
        color: #555;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>✅ Email Verified!</h1>
      <p>Your email has been successfully verified. You may now log in.</p>
    </div>
  </body>
</html>
`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/verify", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "surya secret", async (err, decodedToken) => {
      if (err) {
        console.log("error while verifying");
      } else {
        console.log("decoded token is", decodedToken);
        const { username } = await User.findById(decodedToken.id);
        res.json({ decodedToken, username });
      }
    });
  } else {
    console.log("not found");
    res.json({ error: "not found" });
  }
});

module.exports = router;
