import connectMongo from "@/lib/connect-mongo";
import Bid from "@/models/bid";
import Property from "@/models/property";
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
    const { targetId, bidPrice } = await request.json();
    await connectMongo();
    // 判斷下拍時間
    const property = await Property.findById(targetId);
    if (property.endDateTime < Date.now()) {
        return NextResponse.json({ error: "拍賣已經完結" });
    }

    const session = await auth();
    // 判斷是否登錄
    if (!session) {
        return NextResponse.json({ error: "請先登入以出價" });
    }
    const userId = session._id;


    //1. if 檢查 出價 != 數字：
    //then  -> 彈窗信息：下拍失敗：請輸入數字
    if(!(bidPrice * 1) || !bidPrice){
        return NextResponse.json({ error: "請輸入數字" });
    }


    const lastBid = await getMaxPrice(targetId);

    if (lastBid && lastBid.bidPrice >= bidPrice) {
        return NextResponse.json({ error: "你的出價需要高於當前出價", data: lastBid });
    }
    console.log("-----------------------------------------");
    console.log(bidPrice);
    console.log(lastBid.bidPrice);

    if ((bidPrice - lastBid.bidPrice) % property.bidIncrement !== 0) {
        return NextResponse.json({ error: "你的出價和當前出價的差距，需要為每口價的倍數" });
    }
    const bid = new Bid({
        userId: userId,
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
