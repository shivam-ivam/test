const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../Database/dbSchema");

const authentication = async (req, res, next) => {
  try {
    const token = req.body.token;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
  } catch (error) {
    res.status(401).send("Unaithorized:No token Provided");
    console.log(error);
  }
  next();
};

module.exports = authentication;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2MxMTA4YzhjYjg4MTlmODU3ODdjNzgiLCJpYXQiOjE2NzM1OTcwODR9.cGYeP7kk4h6lcbZkNdGTXprWmy-CFD7R5uv2AAqu_kE
