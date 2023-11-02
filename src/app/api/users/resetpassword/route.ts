import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modules/userModule";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { newpassword, confirmpassword, token } = reqBody

        const user = await User.findOne({ forgotpasswordToken: token, forgotpasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        
        if (newpassword != confirmpassword) {
            return NextResponse.json({ error: "Confirmpassword and Newpassword flied not match" }, { status: 400 })
        }
        
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newpassword, salt);
        user.password = hashPassword;
        await user.save();

        return NextResponse.json({
            message: "passsword update successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}