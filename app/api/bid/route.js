import connectMongo from "@/lib/connect-mongo";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function GET(request) {
    console.log(request);
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
export async function POST(request) {
    const session = await auth();
    const userId = session._id;
    const { targetId, bidPrice } = await request.json();
    const lastBid = await getMaxPrice(targetId);

    if (!lastBid || (lastBid.bidPrice < bidPrice)) {
        await connectMongo();
        const bid = new Bid({
            userId: userId,
            targetId: targetId,
            bidPrice: bidPrice,
        });
        await bid.save();
        return NextResponse.json(bid);
    } else {
        return NextResponse.json({ error: "出價必須高於現價", data: lastBid });
    }
}
async function getMaxPrice(targetId) {
    await connectMongo();
    const lastBid = await Bid.find(
        { targetId: targetId },
    ).sort({ bidPrice: -1 }).limit(1);
    if (lastBid) {
        return lastBid[0];
    }
    return null;
}
