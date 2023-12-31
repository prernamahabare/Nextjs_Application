import { connect } from "@/dbconfig/dbconfig";
import User from "@/modules/userModule";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { EmailTypes } from "@/enums/emailTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, username, email, password } = reqBody;

        // check if user is already exist
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already Exist" },
                { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            username,
            email,
            password: hashPassword,
        })

        const savedUser = await newUser.save();

        await sendEmail({email, emailType:EmailTypes.VERIFY, userId: savedUser._id})

        return NextResponse.json({
            message: "User created Succesfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
        { status: 500 })
    }
}


