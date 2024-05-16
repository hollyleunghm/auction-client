import connectMongo from "@/lib/connect-mongo";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const targetId = params.id;
    try {
        await connectMongo();
        const bids = await Bid.find({ targetId: targetId }).populate('userId', 'email');
        if (bids && bids.length > 0) {
            bids.map(bid => {
                if (bid.userId) {
                    bid.userId.email = maskEmail(bid.userId.email);
                }
            });
            return NextResponse.json(bids);
        } else {
            return NextResponse.json([]);
        }

    } catch (error) {
        return NextResponse.json({ error });
    }
}
function maskEmail(email) {
    if (typeof email !== 'string' || email.length <= 3) {
        return email;
    }

    const maskedPart = email.slice(3);
    return email.slice(0, 3) + maskedPart.replace(/./g, '*');
}
