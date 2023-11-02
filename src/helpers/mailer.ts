import nodemailer from 'nodemailer';
import User from "@/modules/userModule";
import bcryptjs from 'bcryptjs';
import {EmailTypes} from '../enums/emailTypes'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === EmailTypes.VERIFY) {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === EmailTypes.RESET) {
            await User.findByIdAndUpdate(userId,
                { forgotpasswordToken: hashedToken, forgotpasswordTokenExpiry: Date.now() + 3600000 })
        }

        //  Mail send using Gmail
        // const transport = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: process.env.MAILSERVICE_USER,
        //         pass: process.env.MAILSERVICE_PASS,
        //     },
        // });

        //  Mail send using MailTrap
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525, auth:
            {
                user: process.env.MAILSERVICE_USER,
                pass: process.env.MAILSERVICE_PASS,
            }
        });


        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: emailType === EmailTypes.VERIFY
                ? "Verify your Email"
                : "Reset your password",
            html: emailType === EmailTypes.VERIFY ?
                `<p>Click <a href="${process.env.DOMAIN
                }/verifyemail?token=${hashedToken}">here</a> to ${emailType === "RESET"
                    ? "reset your password"
                    : "verify your email"
                }
                    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN
                }/verifyemail?token=${hashedToken}
                    </p>`
                :
                `<p>Click <a href="${process.env.DOMAIN
                }/resetpassword?token=${hashedToken}">here</a> to ${emailType === "RESET"
                    ? "reset your password"
                    : "verify your email"
                }
                  or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
                  </p>`
        };

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}