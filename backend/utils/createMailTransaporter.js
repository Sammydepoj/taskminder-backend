const nodemailer = require("nodemailer");

const createMailTransorter = () => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "matthewoluwajuwon056@outlook.com",
            pass: process.env.MAIL_PASSWORD
        }
    })
    
    return transporter
}

exports.createMailTransorter = createMailTransorter