import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUI from 'swagger-ui-express'
import YAML from "yamljs";
import session from "express-session";
import dotenv from 'dotenv'
// import nodemailer from 'nodemailer';
// import { OAuth2Client } from "google-auth-library";
// router
import productRouter from "./routes/product";
import CategoryRouter from "./routes/category";
import userRouter from './routes/auth';
import orderRouter from './routes/order';
import sendMailRouter from './routes/sendmail'
import fileRouter from './routes/file'
import { SESSION_SECRET_KEY } from "./constants/constants";

dotenv.config();
const app = express();
const storageUrl = process.env.STORAGE_URL
// const option = {
//     service: 'gmail',
//     auth: {
//         user: 'dungnc.greenifyvn@gmail.com',
//         pass: 'dungnc_greenifyvn2022'
//     }
// }
// const transpoter = nodemailer.createTransport(option.auth);
const SwaggerJSDocs = YAML.load('./api.yaml');

// const GOOGLE_MAILER_CLIENT_ID = '544162640795-bi8l9r7b7k4f52qk8hee5j3biuen439i.apps.googleusercontent.com'
// const GOOGLE_MAILER_CLIENT_SECRET = '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'
// const GOOGLE_MAILER_REFRESH_TOKEN = '1//04aZEt9tK0gsNCgYIARAAGAQSNwF-L9Irney9Lk-wZ3pgrwIA5brNh8_uqttE3PCprNwauSF8W7dIcKY_h504Nbfvo2_P9vYSENY'
// const ADMIN_EMAIL_ADDRESS = 'dungnc.greenifyvn@gmail.com'

// // Khởi tạo OAuth2Client với Client ID và Client Secret 
// const myOAuth2Client = new OAuth2Client(
//   GOOGLE_MAILER_CLIENT_ID,
//   GOOGLE_MAILER_CLIENT_SECRET
// )
// // Set Refresh Token vào OAuth2Client Credentials
// myOAuth2Client.setCredentials({
//   refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
// })

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use('/api/public', express.static(storageUrl));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(SwaggerJSDocs));
app.use(session ({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true},
}))

//setup middle response 
app.use((req, res, next) => {
    res.badRequest = (message) => {
        return res.status(400).json({
            success: false,
            message: message
        })
    }
    res.unauthorized = () => {
        return res.status(401).json({
            success: false,
            message: 'UnAuthorization'
        })
    }
    res.notFound = (message) => {
        return res.status(400).json({
            success: false,
            message: message
        })
    }
    res.internalServer = (message) => {
        return res.status(500).json({
            success: false,
            message: message
        })
    },
    res.success = (message) => {
        return res.status(200).json({
            success: true,
            message: message
        })
    }

    next()
})

// routes
app.use("/api", productRouter);
app.use("/api", CategoryRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", sendMailRouter);
app.use("/api", fileRouter);

// app.post('/api/email/send', async (req, res) => {
//   try {
//      // Lấy thông tin gửi lên từ client qua body
//      const { email, subject, content } = req.body
//      console.log('email', email);
//      console.log('sub', subject);
//      console.log('content', content);
//      if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')

//       /**
//      * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
//      * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
//      */
//       const myAccessTokenObject = await myOAuth2Client.getAccessToken()
//       // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
//       const myAccessToken = myAccessTokenObject ? myAccessTokenObject.token : myAccessTokenObject.token
//       // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
//       const transport = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           type: 'OAuth2',
//           user: ADMIN_EMAIL_ADDRESS,
//           clientId: GOOGLE_MAILER_CLIENT_ID,
//           clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
//           refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
//           accessToken: myAccessToken
//         }
        
//       }) 

//       // mailOption là những thông tin gửi từ phía client lên thông qua API
//       const mailOptions = {
//         to: email, // Gửi đến ai?
//         subject: subject, // Tiêu đề email
//         html: `<h3>${content}</h3>` // Nội dung email
//       }

//       // Gọi hành động gửi email
//       await transport.sendMail(mailOptions)

//       // Không có lỗi gì thì trả về success
//     res.status(200).json({ message: 'Email sent successfully.' })
//   } catch (error) {
//      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
//     console.log(error)
//     res.status(500).json({ errors: error.message })
//   }
// })

// connect mongodb
try {
    mongoose.connect("mongodb://localhost:27017/project");
    console.log("Connect mongodb thanh cong");
} catch (error) {
    console.log("Connect mongodb khong thanh cong");
}

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server dang chay cong "+PORT);
})
