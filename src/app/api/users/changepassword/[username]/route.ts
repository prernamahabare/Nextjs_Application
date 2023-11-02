import User from "@/modules/userModule";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcryptjs from "bcryptjs";

connect();

export async function PUT(request: NextRequest, { params }: any) {
    try {

        const username = params.username;
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 400 });
        }

        const reqBody = await request.json();
        const { newpassword } = reqBody;

        const userId = await getDataFromToken(request);

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newpassword, salt);

        const result = await User.findByIdAndUpdate({ _id: userId }, {
            $set: {
                password: hashPassword
            }
        });

        return NextResponse.json({
            message: "Password Update Succesfully",
            success: true,
            password: newpassword
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }

}