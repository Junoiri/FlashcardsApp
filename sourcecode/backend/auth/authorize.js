const jwt = require("jsonwebtoken");

const authorize = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth Header Received:", authHeader);

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("No token found in headers.");
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(403).json({ message: "Invalid token" });
      }

      console.log("Decoded Token:", decoded);

      if (requiredRole && decoded.role !== requiredRole) {
        console.log(
          `Access denied. Required role: ${requiredRole}, User role: ${decoded.role}`
        );
        return res
          .status(403)
          .json({ message: "Access denied: insufficient permissions" });
      }

      req.user = decoded;
      next();
    });
  };
};

module.exports = authorize;
