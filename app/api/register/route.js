import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import Code from "@/models/code";
import { NextResponse } from "next/server";
import { sendEmail } from "@/services/email";

export async function POST(request) {
    const data = await request.json();
    try {
        await connectMongo();
        let user = await User.findOne({ email: data.email });
        if (user) {
            return NextResponse.json({ error: "電郵已被註冊" });
        }
        const codeNumber = await Code.findOne({ _id: data.codeId, code: data.validateCode });
        if (!codeNumber) {
            return NextResponse.json({ error: "驗證碼錯誤" });
        }
        user = await User.findOne({ phone: data.phone, code: data.code });
        if (user) {
            return NextResponse.json({ error: "電話已被註冊" });
        }

        const userSaved = await User.insertMany([
            {
                email: data.email,
                countryAndRegion: data.countryAndRegion,
                firstName: data.firstName,
                lastName: data.lastName,
                firstChineseName: data.firstChineseName,
                lastChineseName: data.lastChineseName,
                code: data.code,
                phone: data.phone,
                password: data.password

            },
        ]);
        const email = "xxx.com";
        sendEmail(email, "用戶注冊通知", `用戶${user.email}注冊成功，請查看`);
        return NextResponse.json({ message: "success", user: userSaved[0] });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
