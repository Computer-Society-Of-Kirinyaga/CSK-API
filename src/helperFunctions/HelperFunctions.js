import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}


export const capitalizeWords = (str) => {
    return str.replace(/\b\w+\b/g, function (match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();  // capitalize first letter of each word
    });
}

// function to send emails
export const sendEmail = async (email, subject, message) => {
    // for this to work go to this link and create an app by providing an app name and copy the generated password => https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4MAyZMTo4Iu6mJAeW1ZhLXbUgJpVRUsRnEsDAM4Nfk5lQHlWRP-1ovJgOhbcFqQ0Kx-a_oAtdUYxjFpXR3Lgiu6_2E5sw
    // more info here => https://nodemailer.com/usage/using-gmail/
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: `🙏${subject}🙏`,
            text: message,
            html: `<h3>${message}</h3>`,

        };
        const mailRes = await transporter.sendMail(mailOptions);
        let mailResponse = "";
        if (mailRes.accepted.length > 0) {
            mailResponse = "Email sent successfully";
        } else if (mailRes.rejected.length > 0) {
            mailResponse = "Email not sent, please try again";
        } else {
            mailResponse = "Email server error";
        }
        return mailResponse;
    } catch (error) {
        console.log(error);
    }
}

