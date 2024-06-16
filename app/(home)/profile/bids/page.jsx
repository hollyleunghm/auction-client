"use client"
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ToastContainer, toast } from "react-toastify";
import Viewer from "react-viewer";
function ImageViewer({ src = "https://infeng.github.io/react-viewer/bbbc41dac417d9fb4b275223a6a6d3e8.jpg" }) {

    const [visible, setVisible] = useState(false);
    const [images] = useState([{ src: src }]);
    return (
        <div>
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); }}
                images={images}
            >
            </Viewer>
            <img className="h-12 w-24 object-contain cursor-pointer" src={src} onClick={() => setVisible(true)} alt="" />
        </div>
    );

}
export default function Page() {
    const { data: session } = useSession();
    const [list, setList] = useState([]);
    const mutation = useMutation({
        mutationFn: async () => {
            let res = await fetch("/api/profile/bid");
            return await res.json();
        },
    });
    const getMyMaxPrice = (id, bids) => {
        let max = 0;
        for (let i = 0; i < bids.length; i++) {
            if (bids[i].userId === id) {
                if (bids[i].bidPrice > max) {
                    max = bids[i].bidPrice;
                }
            }
        }
        return max;
    }
    useEffect(() => {
        if (typeof document !== 'undefined') {
            mutation.mutate();
        }
    }, []);
    useEffect(() => {
        if (mutation.data) {
            if (mutation.data.error) {
                toast.error(mutation.data.error);
            } else {
                setList(mutation.data.bids);
            }
        }
    }, [mutation.data]);
    return (
        <div className="w-full max-w-[1000px] mx-auto">
            {/* {mutation.data && JSON.stringify(mutation.data)} */}
            <ToastContainer position="top-center" />
            <Table className="w-full my-4">
                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap">標題</TableHead>
                        <TableHead className="whitespace-nowrap">地址</TableHead>
                        <TableHead className="whitespace-nowrap">圖片</TableHead>
                        <TableHead className="whitespace-nowrap">出價</TableHead>
                        <TableHead className="whitespace-nowrap">現價</TableHead>
                        <TableHead className="whitespace-nowrap">狀態</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-[100px] overflow-auto" >
                    {list.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-left">
                                {
                                    item.targetType === 0 ? item.property?.traditionalChineseTitle : item.carPark?.traditionalChineseTitle
                                }
                            </TableCell>
                            <TableCell className="text-left">
                                {
                                    item.targetType === 0 ? item.property?.address : item.carPark?.address
                                }
                            </TableCell>
                            <TableCell className="text-left">
                                {
                                    item.targetType === 0 ? <ImageViewer src={item.property?.coverImage?.url}></ImageViewer> : <ImageViewer src={item.carPark?.coverImage?.url} />
                                }
                            </TableCell>
                            <TableCell className="text-left">
                                <Popover>
                                    <PopoverTrigger >
                                        <span className="cursor-pointe underline">{getMyMaxPrice(session.user?._id, item.allBids).toLocaleString()}</span>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="max-h-[30vh] overflow-auto" >
                                            {item.allBids.map(item => {
                                                return (
                                                    <div className="py-2 flex border-b w-full justify-between" key={item.bidPrice}>
                                                        <span>{item.bidPrice.toLocaleString()}</span>
                                                        {
                                                            item.userId === session.user?._id ?
                                                                <div>
                                                                    <span>
                                                                        我的出價
                                                                    </span>
                                                                    <span className="p-1 ml-2 bg-primary rounded-full"></span>
                                                                </div> : null
                                                        }

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            </TableCell>
                            <TableCell className="text-left">

                                {item.maxBidPrice}
                            </TableCell>
                            <TableCell className="text-left">
                                {
                                    item.targetType === 0 ? item.property?.status : item.carPark?.status
                                }
                            </TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
        </div>
    );
}