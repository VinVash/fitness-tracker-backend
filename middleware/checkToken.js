const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token.startsWith("Bearer")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, "yehuinabaatabhimajaaayegnanabhidu", (err, decoded) => {
      if (err) {
        return res.status(404).send({
          message: "Token is not right",
          success: false,
        });
      } else {
        req.body.email = decoded.email;
        next();
      }
    });
  } else {
    return res.status(401).send({
      message: "Token not sent in header",
      success: false,
    });
  }
};

module.exports = checkToken;
