import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    try {
        let token = req.signedCookies['auth_token'];
        if (!token || token.trim() == "") {
            return res.status(400).json({ message: "ERROR", cause: "token not present" });
        }

        const result = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtData = result;
        next();

    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }

}