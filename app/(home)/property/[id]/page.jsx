import { auth } from "@/auth";
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import Bid from '@/models/bid';
import UI from "./ui";
import Link from "next/link";
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
export default async function Page({ params }) {
    const session = await auth();
    let isOwner = false;
    await connectMongo();
    const property = await Property.findOne({ _id: params.id });
    const next = await Property.find({_id: {$gt: params.id}}).sort({_id: 1 }).limit(1);
    const prev = await Property.find({_id: {$lt: params.id}}).sort({_id: -1 }).limit(1);
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
                <div></div>
                <div className="flex gap-2">
                    {/* {JSON.stringify(prev)}
                    {JSON.stringify(next)} */}
                    {
                        prev[0]?<Link className="flex items-center" href={prev[0]._id}><FaArrowLeft></FaArrowLeft>上一個</Link>:null
                    }
                    {
                        next[0]?<Link className="flex items-center" href={next[0]._id}>下一個<FaArrowRight></FaArrowRight></Link>:null
                    }
                </div>
            </div>
            <UI property={JSON.parse(JSON.stringify(property))} defaultCount={count} defaultMaxPrice={maxPrice} defaultIsOwner={isOwner}></UI >
        </>
    );

}