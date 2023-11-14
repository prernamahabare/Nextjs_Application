import { connect } from "@/dbconfig/dbconfig";
import User from "@/modules/userModule";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function PUT(request: NextRequest,{params}:{params:{username:string}}){
    try {
        // const user = await User.findOne();

        const user =  params.username;
        // console.log(user)
        const currentUser = await User.findOne({username:user});

        // const username =  params.username;
        // const user = await User.findOne({username});


        const reqbody = await request.json();
        const {name, username, email} = reqbody;

        const userId = await getDataFromToken(request);
        // const user = await User.findOne({_id: userId });

        if (!currentUser) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 400 });
        }

        const result = await User.findByIdAndUpdate({ _id: userId }, { $set : {
            name: name,
            username: username,
            email: email,
        } });
        console.log(result)

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