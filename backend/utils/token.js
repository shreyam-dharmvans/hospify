import jwt from 'jsonwebtoken';
export const createToken = (user, expiresIn) => {
    const payload = {
        id: user._id,
        role: user.role,
    };

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });

    return token;
}
