import sgMail from '@sendgrid/mail'
import { getLogger } from 'nodemailer/lib/shared';


export const sendMail = async (mailProp) => {
    try {
      sgMail.setApiKey(process.env.API_KEY_SENGRID);

      const response = await sgMail.send(mailProp).catch((err) => {
        getLogger.debug(`[send mail] sendMailError -> ${JSON.stringify(err.message)}`)
      })

      console.log(`[[send mail] sendmail] -> ${JSON.stringify(response)}`);
      
      return {
        success: true,
        message: 'success'
      }
    } catch (error) {
      return {
        success: false,
        message: 'fail'
      }
    }
    
}

// sendMail({
//   to: 'dungnc0402@gmail.com',
//   from: 'Dungnc.greenifyvn@gmail.com',
//   subject: 'Nodejs says Hello',
//   text: 'Hihihihi easy'
// })

export const sendMailForgotPassword = async (mail) => {
  
}