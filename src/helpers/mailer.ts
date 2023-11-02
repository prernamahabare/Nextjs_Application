import nodemailer from 'nodemailer';
import User from "@/modules/userModule";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {  forgotpasswordToken: hashedToken, forgotpasswordTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525, auth:
            {
                user: "df91f4fbda9a67",
                pass: "bc7c825a9f2462"
            }
        });


        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY"
                ? "Verify your Email"
                : "Reset your password",
            html: emailType === "VERIFY" ?
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

        // "VERIFY" ? "Verify your email" : "Reset your password"

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}