import connectMongo from "@/lib/connect-mongo";
import Bid from "@/models/bid";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function GET(request) {
    console.log(request);
    const searchParams = request.nextUrl.searchParams;
    const TargetId = searchParams.get('TargetId');
    try {
        await connectMongo();
        const bids = await Bid.find({ TargetId: TargetId }).sort({ BidPrice: -1 }).limit(1);
        const count = await Bid.countDocuments({ TargetId: TargetId });
        if (bids && bids.length > 0) {
            return NextResponse.json({
                maxPrice: bids[0].BidPrice,
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
    const UserId = session._id;
    const { TargetId, BidPrice } = await request.json();
    const lastBid = await getMaxPrice(TargetId);

    if (!lastBid || (lastBid.BidPrice < BidPrice)) {
        await connectMongo();
        const bid = new Bid({
            UserId: UserId,
            TargetId: TargetId,
            BidPrice: BidPrice,
        });
        await bid.save();
        return NextResponse.json(bid);
    } else {
        return NextResponse.json({ error: "出價必須高於現價", data: lastBid });
    }
}
async function getMaxPrice(TargetId) {
    await connectMongo();
    const lastBid = await Bid.find(
        { TargetId: TargetId },
    ).sort({ BidPrice: -1 }).limit(1);
    if (lastBid) {
        return lastBid[0];
    }
    return null;
}
