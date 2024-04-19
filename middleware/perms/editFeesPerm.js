import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET_LEVELTWO;

function editFeesPerm(req, res, next) {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").split(" ")[1];
    if (!token || token == "") {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided" });
    }

    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.adminId = decoded.userId;

      if (decoded.editFees == 1 || decoded.superAdmin == 1) {
        next();
      } else {
        return res
          .status(401)
          .json({ message: "You dont have valid Permissions" });
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }
}

export default editFeesPerm;
