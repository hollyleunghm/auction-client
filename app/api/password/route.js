import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function POST(request) {
    const session = await auth();
    const { password, newPassword1, newPassword2 } = await request.json();
    if (newPassword1 !== newPassword2) {
        return NextResponse.json({ error: "密碼不一致" });
    }
    try {
        await connectMongo();
        const user = await User.findOne({ password: password, _id: session.user._id });
        if (user) {
            await User.updateOne({ _id: session.user._id }, { password: newPassword1 });
            return NextResponse.json({ msg: "密碼更新成功" });
        } else {
            return NextResponse.json({ error: "密碼錯誤" });
        }
    } catch (error) {
        return NextResponse.json({ error });
    }
}
