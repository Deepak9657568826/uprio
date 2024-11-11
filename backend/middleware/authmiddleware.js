const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        if (!token) {
            res.status(200).json({ "Message": "Please login first" })
        }
        else {
            jwt.verify(token, process.env.secreate_key, function (err, decoded) {
                if (err) {
                    res.status(200).json({ err })
                }
                else if (decoded) {
                    console.log(decoded);

                    // if (req.method === 'POST') {
                        req.body.userId = decoded.user._id
                        req.body.userName = decoded.user.name

                    // }
                    next()
                }
            });
        }

    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = {
    authmiddleware
}