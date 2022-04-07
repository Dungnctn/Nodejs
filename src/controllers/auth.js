import User from '../models/user';
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const {username, email, password} = req.body
    try {
        const checkEmail = await User.findOne({email}).exec()
        if(checkEmail){
            res.status(400).json({
                msg: "Tai khoan ton tai"
            })
        }
        const user = await new User({email, username, password}).save();
        res.json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(400).json({
            msg: "Dang ky tai khoan khong thanh cong"
        })
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email}).exec()
        if(!user) {
            res.status(400).json({
                msg: "Tai khoan khong ton tai"
            })
        }
        if(!user.authenticate(password)) {
            res.status(400).json({
                msg: "Mat khau khong chinh xac"
            })
        }
        const token = jwt.sign({_id: user._id}, "123", {expiresIn: "5h"} )
        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(400).json({
            msg: "Dang nhap that bai"
        })
    }
}