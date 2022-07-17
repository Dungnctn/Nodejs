import jwt from 'jsonwebtoken'
import { EXPIRES_IN, SECRET_KEY } from '../constants/constants'

export const generateToken = (payload) => {
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_IN
    })
    console.log(token);
    return token
}

export const verifyToken = (token) => {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload
}

