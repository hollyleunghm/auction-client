import { auth } from "@/auth";
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import Bid from '@/models/bid';
import UI from "./ui";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "@/app/i18n";
export default async function Page({ params }) {
    const { t } = await useTranslation(params.lng);
    const session = await auth();
    let isOwner = false;
    await connectMongo();
    const property = await Property.findOne({ _id: params.id });
    const next = await Property.find({ _id: { $gt: params.id }, deleted: false }).sort({ _id: 1 }).limit(1);
    const prev = await Property.find({ _id: { $lt: params.id }, deleted: false }).sort({ _id: -1 }).limit(1);
    if (new Date(property.endDateTime) <= new Date()) {
        property.status = "Completed";
    } else if (new Date(property.startDateTime) >= new Date()) {
        property.status = "AboutToStart";
    } else {
        property.status = "InProgress";
    }

    let maxPrice = property.startingPrice;
    const bids = await Bid.find({ targetId: params.id }).sort({ bidPrice: -1 }).limit(1);
    if (bids && bids.length > 0) {
        maxPrice = bids[0].bidPrice;
        // if (session && session.user._id === bids[0].userId.toString()) {
        //     isOwner = true;
        // }
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
                        prev[0] ? <Link className="flex items-center" href={prev[0]._id}><FaArrowLeft></FaArrowLeft>{t("prev")}</Link> : null
                    }
                    {
                        next[0] ? <Link className="flex items-center" href={next[0]._id}>{t("next")}<FaArrowRight></FaArrowRight></Link> : null
                    }
                </div>
            </div>
            <UI lng={params.lng} property={JSON.parse(JSON.stringify(property))} defaultCount={count} defaultMaxPrice={maxPrice} defaultIsOwner={isOwner}></UI >
        </>
    );

}