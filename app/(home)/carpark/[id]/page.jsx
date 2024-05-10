import connectMongo from '@/lib/connect-mongo';
import CarPark from '@/models/carPark';
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
    await connectMongo();
    const carPark = await CarPark.findOne({ _id: params.id });
    if (new Date(carPark.endDateTime) <= new Date()) {
        carPark.BIddingStatus = "Completed";
    } else if (new Date(carPark.startDateTime) <= new Date()) {
        carPark.BIddingStatus = "AboutToStart";
    } else {
        carPark.BIddingStatus = "InProgress";
    }
    let maxPrice = carPark.startingPrice;
    const bids = await Bid.find({ targetId: params.id }).sort({ bidPrice: -1 }).limit(1);
    if (bids && bids.length > 0) {
        maxPrice = bids[0].bidPrice;
    }
    const count = await Bid.countDocuments({ targetId: params.id });
    return (
        <UI carPark={JSON.parse(JSON.stringify(carPark))} defaultCount={count} defaultMaxPrice={maxPrice}></UI >
    );

}