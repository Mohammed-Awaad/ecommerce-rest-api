const jwt = require("jsonwebtoken");

// Authentication
function verifyToken(req, res, next) {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, seller) {
      if (err) res.status(403).json({ error: err.message });
      else {
        req.seller = seller;
        next();
      }
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
}

// Authorization
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.seller.id == req.params.id) next();
    else res.status(403).json("You are not allowed to do that!");
  });
}

module.exports = { verifyToken, verifyTokenAndAuthorization };
