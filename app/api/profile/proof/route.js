import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function POST(request) {
    const session = await auth();
    const { idCard, financialProof } = await request.json();
    try {
        await connectMongo();
        let user = await User.findOne({ _id: session.user._id });
        if (!user) {
            return NextResponse.json({ error: "更新失敗，用戶不存在" });
        }
        console.log(idCard, financialProof);
        if (idCard) {
            user.idCard = idCard;
            user.idCardStatus = "1";
        }
        if (financialProof) {
            user.financialProof = financialProof;
            user.financialProofStatus = "1";
        }
        await user.save();
        return NextResponse.json({ msg: "更新成功" });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
