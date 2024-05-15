import connectMongo from "@/lib/connect-mongo";
import Bid from "@/models/bid";
import Property from "@/models/property";
import CarPark from "@/models/carPark";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function GET(request, { params }) {
    const session = await auth();
    const targetId = params.id;
    try {
        await connectMongo();
        const bids = await Bid.find({ targetId: targetId }).sort({ bidPrice: -1 }).limit(1);
        const count = await Bid.countDocuments({ targetId: targetId });
        if (bids && bids.length > 0) {
            let json = {
                maxPrice: bids[0].bidPrice,
                count: count,
            };
            if (session && session.user._id == bids[0].userId) {
                json.isOwner = true;
            }
            return NextResponse.json(json);
        } else {
            return NextResponse.json({ error: "沒有任何出價" });
        }

    } catch (error) {
        return NextResponse.json({ error });
    }
}
export async function POST(request, { params }) {
    // targetType 0 樓盤 1 車位
    const targetId = params.id;
    const { targetType, bidPrice } = await request.json();
    const session = await auth();
    // const userId = session._id;
    let target;
    let lastBidPrice;
    let lastBid;
    await connectMongo();
    // 判斷下拍時間
    if (targetType == 1) {
        target = await CarPark.findById(targetId);
    } else {
        target = await Property.findById(targetId);
    }
    lastBidPrice = target.startingPrice;
    if (target.startDateTime > Date.now()) {
        return NextResponse.json({ error: "拍賣尚未開始" });
    }
    if (target.endDateTime < Date.now()) {
        return NextResponse.json({ error: "拍賣已經完結" });
    }

    // 判斷是否登錄
    if (!session) {
        return NextResponse.json({ error: "請先登入以出價" });
    }
    if (!(bidPrice * 1) || !bidPrice) {
        return NextResponse.json({ error: "請輸入數字" });
    }
    lastBid = await getMaxPrice(targetId);
    if (lastBid) {
        lastBidPrice = lastBid.bidPrice;
    }
    if (lastBidPrice >= bidPrice) {
        return NextResponse.json({ error: "你的出價需要高於當前出價" });
    }

    if ((bidPrice - lastBidPrice) % target.bidIncrement !== 0) {
        return NextResponse.json({ error: "你的出價和當前出價的差距，需要為每口價的倍數" });
    }
    const bid = new Bid({
        userId: session.user._id,
        targetId: targetId,
        bidPrice: bidPrice,
    });
    await bid.save();
    return NextResponse.json({ msg: "出價成功，現時你爲出價最高的買家", data: bid });
}
async function getMaxPrice(targetId) {
    // await connectMongo();
    const lastBid = await Bid.find(
        { targetId: targetId },
    ).sort({ bidPrice: -1 }).limit(1);
    if (lastBid) {
        return lastBid[0];
    }
    return null;
}
