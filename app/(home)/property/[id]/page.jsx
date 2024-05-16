import { auth } from "@/auth";
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import Bid from '@/models/bid';
import UI from "./ui";
import Link from "next/link";
// {
//     "id": "7-1",
//     "value": "InProgress",
//     "label": "正在進行"
// },
// {
//     "id": "7-2",
//     "value": "AboutToStart",
//     "label": "即將開始"
// },
// {
//     "id": "7-3",
//     "value": "Completed",
//     "label": "已結束"
// },
// {
//     "id": "7-4",
//     "value": "Aborted",
//     "label": "中止"
// },
// {
//     "id": "7-5",
//     "value": "Cancelled",
//     "label": "撤回"
// }
export default async function Page({ params }) {
    const session = await auth();
    let isOwner = false;
    await connectMongo();
    const property = await Property.findOne({ _id: params.id });
    const next = Property.find({_id: {$gt: params.id}}).sort({_id: 1 }).limit(1)
    const prev = Property.find({_id: {$lt: params.id}}).sort({_id: -1 }).limit(1)
    if (new Date(property.endDateTime) <= new Date()) {
        property.BIddingStatus = "Completed";
    } else if (new Date(property.startDateTime) >= new Date()) {
        property.BIddingStatus = "AboutToStart";
    } else {
        property.BIddingStatus = "InProgress";
    }

    let maxPrice = property.startingPrice;
    const bids = await Bid.find({ targetId: params.id }).sort({ bidPrice: -1 }).limit(1);
    if (bids && bids.length > 0) {
        maxPrice = bids[0].bidPrice;
        if (session && session.user._id === bids[0].userId.toString()) {
            isOwner = true;
        }
    }
    const count = await Bid.countDocuments({ targetId: params.id });

    return (
        <>
            <div className="w-full max-w-[1000px] mx-auto flex justify-between mt-4 mb-8">
                <div>麵包屑</div>
                <div className="flex gap-2">
                    <Link href={prev?prev._id:''}>上一個</Link>
                    <Link href={next?next._id:''}>下一個</Link>
                </div>
            </div>
            <UI property={JSON.parse(JSON.stringify(property))} defaultCount={count} defaultMaxPrice={maxPrice} defaultIsOwner={isOwner}></UI >
        </>
    );

}