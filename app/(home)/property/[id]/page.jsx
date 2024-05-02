import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import Bid from '@/models/bid';
import UI from "./ui";
export default async function Page({ params }) {
    await connectMongo();
    const property = await Property.findOne({ _id: params.id });
    let maxPrice = property.startingPrice;
    const bids = await Bid.find({ targetId: params.id }).sort({ bidPrice: -1 }).limit(1);
    if (bids && bids.length > 0) {
        maxPrice = bids[0].bidPrice;
    }
    console.log(maxPrice,"maxPricemaxPricemaxPricemaxPricemaxPricemaxPricemaxPrice");
    const count = await Bid.countDocuments({ targetId: params.id });
    return (
        <UI property={JSON.parse(JSON.stringify(property))} defaultCount={count} defaultMaxPrice={maxPrice}></UI >
    );

}