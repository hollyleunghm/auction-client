import connectMongo from "@/lib/connect-mongo";
import Bid from "@/models/bid";
import Property from "@/models/property";
import CarPark from "@/models/carPark";
import { NextResponse } from "next/server";
import { Types } from 'mongoose';

import { auth } from "@/auth";
export async function GET() {
    const session = await auth();
    const userId = session.user._id;
    console.log(userId);

    const targetData = await Bid.aggregate([
        // 过滤阶段
        {
            $match: {
                userId: Types.ObjectId.createFromHexString(userId)
            }
        },
        // 分组阶段
        {
            $group: {
                _id: '$targetId',
                allBids: {
                    $push: '$$ROOT'
                },
                maxBidPrice: {
                    $max: '$allBids.bidPrice'
                }
            }
        },
        // 投影阶段
        {
            $project: {
                _id: 0,
                targetId: '$_id',
                // bids: 1,
                maxBidPrice: 1
            }
        }
    ]);
    const targetIds = targetData.map(t => t.targetId);


    const bids = await Bid.aggregate([
        // Match stage
        {
            $match: {
                targetId: { $in: targetIds }
            }
        },
        // 将字符串类型的 targetId 转换为 ObjectId
        {
            $addFields: {
                targetIdObject: { $toObjectId: '$targetId' }
            }
        },
        // Group stage
        {
            $group: {
                _id: '$targetId',
                allBids: {
                    $push: '$$ROOT'
                },
                maxBidPrice: {
                    $max: '$bidPrice'
                },
                targetIdObject: { $first: '$targetIdObject' }
            }
        },
        // Project and reverse array stage
        {
            $project: {
                _id: 0,
                targetId: '$_id',
                allBids: {
                    $reverseArray: '$allBids'
                },
                maxBidPrice: 1,
                targetType: { $arrayElemAt: ['$allBids.targetType', 0] } // Assuming targetType is the same for all bids
            }
        },
    ]);


    // 处理 bids，追加属性
    for (const item of bids) {
        if (item.targetType === 0) {
            const property = await Property.findById(item.targetId);
            if (!property) {
                continue;
            }
            customStatus(property);
            item.property = property;
        } else {
            const carPark = await CarPark.findById(item.targetId);
            if (!carPark) {
                continue;
            }
            customStatus(carPark);
            item.carPark = carPark;
        }
    }
    return NextResponse.json({ bids });
}
function customStatus(item) {
    if (new Date(item.completionDateTime) <= new Date()) {
        item.status = "Completed";
    } else if (new Date(item.completionDateTime) >= new Date() && new Date(item.startDateTime) <= new Date()) {
        item.status = "InProgress";
    } else {
        item.status = "AboutToStart";
    }
}