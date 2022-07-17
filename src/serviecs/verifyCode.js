import VerifyCode from "../models/verifyCode"


export const createVerifyCode = async ({ email, code }) => {
    const newVerifyCode = {
        email: email,
        code: code
    }

    const _newVerifyCode = new VerifyCode(newVerifyCode);
    return await _newVerifyCode.save()
}

export const getVerifyCode = async (code) => {
    return await VerifyCode.findOne({ code: code })
}

export const deleteManyVerifyCode = async (email) => {
    return await VerifyCode.deleteMany(email)
}