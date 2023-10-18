import {connect} from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modules/userModule";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const users = await User.find({_id:{ $ne: userId }}).select("-password");
        return NextResponse.json({
            message: "Users Found",
            data: users
        })
    
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:400});
    }
    
}