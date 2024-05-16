import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { NextResponse } from "next/server";
export async function POST(request) {
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const firstChineseName = formData.get("firstChineseName");
    const lastChineseName = formData.get("lastChineseName");
    const password = formData.get("password");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const countryAndRegion = formData.get("countryAndRegion");
    const code = formData.get("code");
    try {
        await connectMongo();
        let user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "電郵已被註冊" });
        }
        user = await User.findOne({ phone, code });
        if (user) {
            return NextResponse.json({ error: "電話已被註冊" });
        }
        const userSaved = await User.insertMany([
            {
                email,
                countryAndRegion,
                firstName,
                lastName,
                firstChineseName,
                lastChineseName,
                code,
                phone,
                password

            },
        ]);
        return NextResponse.json({ message: "success", user: userSaved[0] });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
