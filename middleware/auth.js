const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
        const token = req.cookies.token || bearerToken;

        if (!token) {
        return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.redirect("/login");
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Admin access required" });
    }

    return next();
};

const preventContributorWrites = (req, res, next) => {
    if (req.user.role === "contributor") {
        return res.status(403).json({
            success: false,
            message: "Contributor accounts do not have permission to modify data.",
        });
    }

    return next();
};

module.exports = protect;
module.exports.requireAdmin = requireAdmin;
module.exports.preventContributorWrites = preventContributorWrites;
