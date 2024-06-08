import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Code from "@/models/code";

export async function POST(request) {
    const session = await auth();
    const { email, codeId, code } = await request.json();
    try {
        await connectMongo();
        const codeNumber = await Code.findOne({ _id: codeId, code: code });
        if (!codeNumber) {
            return NextResponse.json({ error: "驗證碼錯誤" });
        }
        let user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ error: "電郵已被註冊" });
        }

        await User.updateOne({ _id: session.user._id }, { email: email });
        return NextResponse.json({ msg: "更新成功" });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
