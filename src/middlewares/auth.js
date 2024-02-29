import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = (req, res, next) => {
  // Get the token in the header authorization
  const tokenHeader = req.headers.authorization;

  // Verify if token exist
  if (!tokenHeader) {
    return res.status(401).send("Accès non autorisé");
  }
  const token = tokenHeader.split(" ")[1];

  // Verify token validity
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Store decrypted user's datas to req
    req.user = decoded.userData;
    next();
  } catch (error) {
    res.status(401).send("Token invalide");
  }
};

const generateAuthToken = (user) => {
  const userData = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign({ userData }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export { auth, generateAuthToken };
