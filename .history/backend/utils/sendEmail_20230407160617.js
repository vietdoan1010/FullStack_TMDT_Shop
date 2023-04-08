const nodeMailer = require('nodemailer');


const sendMail = async (options) => {
    
    const transporter = nodeMailer.createTransporter({
        service: "gmail",
        auth: {
            user: "",
            password: ""
        }
    })

    const mailOptions = {
        from: "",
        to:"",
        subject: "",
        text: ""
    }
};

module.exports = sendEmail;