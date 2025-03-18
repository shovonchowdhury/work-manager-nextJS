import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server"

await connectDB();
export function GET(req){

    const users=[
        {
            name:'Shovon',
            employment: 'bekar'
        },
        {
            name:'Tanjil',
            employment: 'Software Engineer'
        }
    ]

    return NextResponse.json(users);
}