import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function POST(request) {
    const session = await auth();
    const json = await request.json();
    try {
        await connectMongo();
        let user = await User.findOne({ email: json.email });
        if (user) {
            return NextResponse.json({ error: "電郵已被註冊" });
        }
        user = await User.findOne({ phone: json.phone, code: json.code });
        if (user) {
            return NextResponse.json({ error: "電話已被註冊" });
        }
        user = await User.findOne({ _id: session.user._id });
        if (user) {
            await User.updateOne({ _id: session.user._id }, json);
            return NextResponse.json({ msg: "更新成功" });
        } else {
            return NextResponse.json({ error: "更新失敗，用戶不存在" });
        }
    } catch (error) {
        return NextResponse.json({ error });
    }
}
