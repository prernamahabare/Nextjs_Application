import {connect} from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modules/userModule";

connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {newpassword, confirmpassword, token} = reqBody
        console.log(newpassword);

        const user = await User.findOne({forgotpasswordToken: token, forgotpasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.password = newpassword;
        await user.save();
        
        return NextResponse.json({
            message: "passsword update successfully",
            success: true
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}