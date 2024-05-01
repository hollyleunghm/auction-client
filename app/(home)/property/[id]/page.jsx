import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import Bid from '@/models/bid';
import UI from "./ui";
export default async function Page({ params }) {
    await connectMongo();
    const property = await Property.findOne({ _id: params.id });
    let maxPrice = property.StartingPrice;
    const bids = await Bid.find({ TargetId: params.id }).sort({ BidPrice: -1 }).limit(1);
    if (bids && bids.length > 0) {
        maxPrice = bids[0].BidPrice;
    }
    console.log(bids);
    const count = await Bid.countDocuments({ TargetId: params.id });
    return (
        <UI property={JSON.parse(JSON.stringify(property))} defaultCount={count} defaultMaxPrice={maxPrice}></UI >
    );

}