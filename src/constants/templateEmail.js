export const templateSendMailForgotPassword = (code, to, returnUrl, subject = 'FORGOT PASSWORD') => {
    // console.log(`[code] -> ${JSON.stringify(code)}`);
    // console.log(`[to] -> ${JSON.stringify(to)}`);
    return {
        to: to,
        from: process.env.EMAIL_SEND,
        subject: subject,
        text: subject,
        html: `<div><h1>${subject}</h1><h3>You need click to under link</h3><p>${returnUrl}?token=${code}</p></div>`,
    }
}