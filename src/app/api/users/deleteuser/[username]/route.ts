import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modules/userModule";

connect();

export async function DELETE(request: NextRequest,{params}:{params:{username:string}}) {
    try {
        const username =  params.username;
        const user = await User.findOne({username});
        console.log(user);

        if (!user) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 400 });
        }
        await User.deleteOne(user);
        return NextResponse.json({
            message: "User Deleted Successfully",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }

}

