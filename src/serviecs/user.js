import User from '../models/user'

export const getUser = async (dataFilter) => {
    return await User.findOne(dataFilter);
}

export const createUser = async (user) => {
    const newUser = new User(user);
    return newUser.save()
}  

export const getUserById = async (_id) => {
    return await User.findById(_id)
}

export const getUserByEmail = async (email) => {
    return await User.findOne({ email })
}

export const getUserResponse = (user) => {
    return {
        _id: user._id,
        email: user.email,
        role: user.role,
    }
}

export const updateUser = async (_id, dataUpdate) => {
    return await User.findOneAndUpdate(_id, dataUpdate)
}

export const deleteUser = async (_id) => {
    return await User.findOneAndDelete(_id)
}