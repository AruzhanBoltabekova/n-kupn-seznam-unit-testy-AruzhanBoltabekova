module.exports = (req, res, next) => {
    console.log("Authorization middleware bypassed.");
    next();
};