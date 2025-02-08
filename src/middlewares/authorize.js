module.exports = (req, res, next) => {
    const userId = req.header("User-ID");
    if (!userId) return res.status(401).json({ error: "Unauthorized access" });
    next();
};