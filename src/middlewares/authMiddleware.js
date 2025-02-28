const jwt = require('jsonwebtoken');

const veryfyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            success: false,
            msg: "A token is required for authorization"
        });
    }

    try {
        const bearer = token.split(" ");
        const bearerToken = bearer[1];

        const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
        req.user = decoded;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            msg: "Invalid token"
        })
    }

    // return next();
}

module.exports = veryfyToken;