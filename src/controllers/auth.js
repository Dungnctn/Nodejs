import { templateSendMailForgotPassword } from "../constants/templateEmail";
import { generateToken, verifyToken } from "../serviecs/auth";
import { comparePassword, hashPassword } from "../serviecs/security";
import { createUser, getUser, getUserByEmail, updateUser } from "../serviecs/user";
import { createVerifyCode, deleteManyVerifyCode, getVerifyCode } from "../serviecs/verifyCode";
import { sendMail, sendMailForgotPassword } from "./sendMail";


export const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email, password);
        // validate
        const existedUser = await getUser({ email: email});
        if(!existedUser){
            return res.status(401).json({
                success: false,
                message: 'User not found' 
            })
        }

        const isComparePassword = comparePassword(password, existedUser.password)
        if(!isComparePassword){
            return res.status(401).json({
                success: false,
                message: 'Password incorrect'
            })
        }

        let user = {
            _id: existedUser._id,
            user: existedUser.username,
            email: existedUser.email,
            role: existedUser.role,
            createdAt: existedUser.createdAt
        }

        const tokenAuth = generateToken(user);
        return res.status(200).json({
            success: true,
            message: 'Success',
            data: {
                user,
                token: tokenAuth
            }
        })
        
    } catch (error) {
        res.unauthorized()
    }

}

export const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body
        console.log(email, password, username);

        const existedUser = await getUser({ email: email });
        if(existedUser) {
            res.status(401).json({
                success: false,
                message: 'User already exist'
            })
        }
        const isHashPassword = hashPassword(password);

        const newData = {
            email: email,
            username: username,
            password: isHashPassword
        }

        await createUser(newData)

        return res.status(200).json({
            success: true,
            message: 'Signup success'
        })
        
    } catch (error) {
        res.unauthorized()
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email, redirectUrl } = req.body;

        if(!email){
            return res.badRequest('Email is required')
        }
        if(!redirectUrl){
            return res.badRequest('redirectUrl is required')
        }

        const existUser = await getUserByEmail(email);
        if(!existUser) {
            return res.notFound('Email not found')
        }
        const token = generateToken({ _id: existUser._id});
        const mailTemplate = templateSendMailForgotPassword(token, email, redirectUrl);
        console.log(`[forgotPs] mailTp -> ${JSON.stringify(mailTemplate)}`);
        const mailer = await sendMail(mailTemplate);
        
        if(!mailer || !mailer.success){
            return res.badRequest('Send mail fail')
        }

        await deleteManyVerifyCode({ email })

        await createVerifyCode({ email, code: token })

        // console.log(email, redirectUrl);
        return res.success('Success send email')
    } catch (error) {
        return res.internalServer(error.message)
    }
}

export const resetPassword = async (req, res) => {
    
    try {
        const { token } = req.query;
        const { password } = req.body;
        
        if(!token) {
            return res.notFound('Token not found')
        }

        if(!password){
            return res.badRequest('Password not found')
        }

        const verifyCode = await getVerifyCode(token.toString());
        console.log(`[resetPassword] verifyCode -> ${JSON.stringify(verifyCode)}`);
        if(!verifyCode) {
            return res.notFound('Code not found')
        }

        const userId = verifyToken(token);
        if(!userId){
            return res.notFound('Token not found')
        }

        const existUser = await getUser({ _id: userId })

        await deleteManyVerifyCode({ code: token })

        if(!existUser) {
            return res.notFound('User not found')
        }

        const _hashPassword = hashPassword(password);

        await updateUser({ _id: existUser._id }, { password: _hashPassword })

        delete existUser.password;

        return res.success({ user: existUser  })
    } catch (error) {
        return res.internalServer(error.message)
    }

}
