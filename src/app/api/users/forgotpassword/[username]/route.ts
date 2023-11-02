import { connect } from "@/dbconfig/dbconfig";
import User from "@/modules/userModule";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({
            forgotpasswordToken: token,
            forgotpasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        console.log(user);

        user.password = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}