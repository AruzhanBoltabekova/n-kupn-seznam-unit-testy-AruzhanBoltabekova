module.exports = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Invalid input data" });
    }
    next();
};