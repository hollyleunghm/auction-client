import connectMongo from "@/lib/connect-mongo";
import Bid from "@/models/bid";
import Property from "@/models/property";
import CarPark from "@/models/carPark";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const targetId = searchParams.get('targetId');
    try {
        await connectMongo();
        const bids = await Bid.find({ targetId: targetId }).sort({ bidPrice: -1 }).limit(1);
        const count = await Bid.countDocuments({ targetId: targetId });
        if (bids && bids.length > 0) {
            return NextResponse.json({
                maxPrice: bids[0].bidPrice,
                count: count
            });
        } else {
            return NextResponse.json({ error: "沒有任何出價" });
        }

    } catch (error) {
        return NextResponse.json({ error });
    }
}
