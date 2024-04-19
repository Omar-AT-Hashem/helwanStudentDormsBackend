import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenSecretOne = process.env.TOKEN_SECRET_LEVELONE;
const tokenSecretTwo = process.env.TOKEN_SECRET_LEVELTWO;

function authenticateTokenLevelOne(req, res, next) {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").split(" ")[1];
    if (!token || token == "") {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }

    jwt.verify(token, tokenSecretOne, (err, decoded) => {
      if (err) {
        jwt.verify(token, tokenSecretTwo, (err, decoded) => {
          if (err) {
            return res.status(403).json({ message: "Invalid token" });
          } else {
            req.adminId = decoded.userId;
            return next();
          }
        });
      } else {
        return next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }
}

export default authenticateTokenLevelOne;
