const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
const token = req.headers.authorization?.split(" ")[1];
if (!token) {
return res.status(401).json({ message: "No token provided" });
}
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
} catch (error) {
return res.status(401).json({ message: "Invalid token" });
}
}

const authorize = (role) => {
    return (req, res, next) => {
    if (req.user.role !== role) {
    return res.status(403).json({ message: "Access denied" });
    }
    next();
    };
    };
    module.exports = { protect, authorize };
