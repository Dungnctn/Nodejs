import User from "../models/user"

export const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec();
        if(!user){
            res.status(400).json({
                message: "Khong tim thay user"
            })
        }
        req.profile = user
        req.profile.password = undefined;
        next()
    } catch (error) {
        res.status(400).json({
            message: "Khong tim thay user"
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const user = await User.find().exec();
        res.json({
            user
        })
    } catch (error) {
        res.status(400).json({
            message: "Khong co user"
        })
    }
}

export const getUser = async (req, res) => {
    const condition = {_id: req.params.id}
    try {
        const user = await User.findOne(condition).exec();
        res.json({
            user
        })
    } catch (error) {
        res.status(400).json({
            message: "Khong co user"
        })
    }
}