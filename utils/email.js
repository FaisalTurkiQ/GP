const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST_DEV,
        port : process.env.EMAIL_PORT_DEV,
        auth :{
            user : process.env.EMAIL_USERNAME_DEV,
            pass :process.env.EMAIL_PASSWORD_DEV
        }
    })

    const mailOptions = {
        from : '',
        to : options.email,
        subject : options.subject,
        text : options.text,
        // html:
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail