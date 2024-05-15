import { auth } from "@/auth";
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import Bid from '@/models/bid';
import UI from "./ui";
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
    if (new Date(property.endDateTime) <= new Date()) {
        property.BIddingStatus = "Completed";
    } else if (new Date(property.startDateTime) <= new Date()) {
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
        console.log(isOwner);
    }
    const count = await Bid.countDocuments({ targetId: params.id });

    return (
        <UI property={JSON.parse(JSON.stringify(property))} defaultCount={count} defaultMaxPrice={maxPrice} defaultIsOwner={isOwner}></UI >
    );

}