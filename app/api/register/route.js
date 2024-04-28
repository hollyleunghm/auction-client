import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request) {
    const formData = await request.formData();
    const password = formData.get("password");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const name = formData.get("name");
    const chineseName = formData.get("chineseName");
    const address = formData.get("address");
    console.log(email, password);
    try {
        await connectMongo();
        let user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "該郵箱已被使用" });
        }
        user = await User.findOne({ phone });
        if (user) {
            return NextResponse.json({ error: "改電話已被使用" });
        }
        const userSaved = await User.insertMany([
            {
                email,
                phone,
                password,
                name,
                chineseName,
                address
            },
        ]);
        console.log(userSaved[0]);
        return NextResponse.json({ message: "success",user:userSaved[0] });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
