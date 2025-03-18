import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {

    const {userId} = params;
    if (!userId) {
        return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
      }

    try{
        const user= await User.findOne({_id:userId});

        if(!user)
        {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, user }, { status: 200 });
    }
    catch(err)
    {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}


export async function DELETE(req,{params}) {

    const {userId} = params;
    if (!userId) {
        return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
      }

    try{
        const result = await User.deleteOne({_id:userId});

        if(!result.deletedCount)
        {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 200 });
    }
    catch(err)
    {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function PUT(req,{params}) {

    const {userId} = params;
    if (!userId) {
        return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
      }
    
    const data = await req.json();

    if(!data || Object.keys(data).length===0)
    {
        return NextResponse.json({ success: false, error: "No data provided for update" }, { status: 400 });
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(userId,data,{new:true})
        if(!updatedUser)
        {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message:'User information has updated!!' }, { status: 200 });
    }
    catch(err)
    {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
