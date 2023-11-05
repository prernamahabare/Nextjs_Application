import { connect } from "@/dbconfig/dbconfig";
import User from "@/modules/userModule";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import { EmailTypes } from "@/enums/emailTypes";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { email }= reqBody

        const user = await User.findOne({
            email: email
        });

        console.log(email);
        if (!user) {
            return NextResponse.json({ error: "User Not Exits" }, { status: 400 })
        }

        await sendEmail({email, emailType:EmailTypes.RESET, userId: user._id})

        return NextResponse.json({
            message: "To reset password, check your Email",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}