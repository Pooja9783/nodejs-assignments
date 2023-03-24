import jwt from "jsonwebtoken";

import Login from "../model/login.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Login.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  else{
    return res.status(200)
  }

  const accessToken = jwt.sign(
    { email: user.email },
    "secret",
    {
      expiresIn: "1h",
    },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
  const refreshToken = jwt.sign({ email: user.email }, "refresh_secret", {
    expiresIn: "7d",
  });

  user.refreshTokens.push(refreshToken);
  await user.save();

  res.json({ accessToken, refreshToken });
};
