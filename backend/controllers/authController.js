import User from '../models/User.js';
import { createToken } from '../utils/token.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });


        if (!user || !(password == user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        let token = createToken(user, "7d");
        let expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, {
            expires,
            httpOnly: true,
            signed: true,
            sameSite: 'none',
            secure: true
        });

        res.status(200).json({
            message: "login successful",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            signed: true,
            sameSite: 'none',
            secure: true
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        return res.status(400).json({ message: "ERROR", cause: err.message });
    }
}

export const sendUserData = async (req, res) => {
    try {
        const { id } = res.locals.jwtData;
        const user = await User.findById(id);
        console.log(id, user);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' });
    }
}