import { connect } from "@/dbconfig/dbconfig";
import User from "@/modules/userModule";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function PUT(request:NextRequest){
    try {
        // const user = await User.findOne();

        const reqbody = await request.json();
        const {username,email, password} = reqbody;

        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 400 });
        }

        const result = await User.findByIdAndUpdate({ _id: userId }, { $set : {
            username: username,
            email: email,
            password: password
        } });

        return NextResponse.json({
            message: "User Update Successfully",
            success: true
        })


    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
        
    }
}