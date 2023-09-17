import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
}
