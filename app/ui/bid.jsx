import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import dayjs from "dayjs";
import UseCountdownTimer from "@/hooks/UseCountdownTimer";
import { ToastContainer, toast } from "react-toastify";
import { Avatar } from 'rsuite';
import Divider from "@/app/ui/divider";
import Link from "next/link";
import BidList from "@/app/ui/bidList";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const Bid = ({ target, defaultIsOwner, defaultMaxPrice, targetType = 0 }) => {
    const [isOwner, setIsOwner] = useState(defaultIsOwner);
    const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
    const deadline = new Date(target.endDateTime).getTime();
    const timeRemaining = UseCountdownTimer(deadline);
    const [request, setRequest] = useState({
        loading: false,
        error: false,
        success: false,
        data: {},
    });
    const [bidPrice, setBidPrice] = useState();
    const id = useRef(null);
    const refreshBid = async () => {
        fetch("/api/bid/" + target._id + "?targetType=" + targetType).then(async (res) => {
            const data = await res.json();
            if (!data.error) {
                setMaxPrice(data.maxPrice);
                setIsOwner(data.isOwner);
            } else {
                // toast.error("更新數據失敗，請稍後重試");
            }
        });
    }
    const notify = async () => {
        if (id.current) {
            return;
        }
        id.current = toast.info("正在下拍，請稍後");
        fetch("/api/bid/" + target._id, {
            method: "POST",
            body: JSON.stringify({
                bidPrice: bidPrice,
                targetType: targetType,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!data.error) {
                    setRequest({ ...request, error: true, data: data });
                    toast.update(id.current, {
                        render: data.msg,
                        type: "success",
                        isLoading: false,
                    });
                } else {
                    setRequest({ ...request, success: false, data: data });
                    toast.update(id.current, {
                        render: "下拍失敗：" + data.error,
                        type: "error",
                        isLoading: false,
                    });
                }
                refreshBid();
            })
            .catch((err) => {
                toast.update(id.current, {
                    render: "發生了錯誤請稍後重試",
                    type: "error",
                    isLoading: false,
                });
            })
            .finally(() => {
                id.current = null;
            });
    };
    return (
        <div>
            <ToastContainer position="top-center" autoClose={false} />
            <h1 className="text-2xl font-semibold text-[#253D59]">{target.title}</h1>
            <h3 className="text-sm text-[#253D59]">{target.address}</h3>
            <div className="mt-8 text-md  text-[#253D59] ">
                <div>
                    <p>拍賣截止時間:</p>
                    <p className="font-semibold"> {dayjs(target.endDateTime).format("YYYY-MM-DD HH:mm:ss") + "(UTC+8)"} </p>
                </div>
                {
                    target.BIddingStatus === "InProgress" ? (
                        <div className="py-2 border-b border-[#253D59]">
                            <div>倒計時</div>
                            {/* {timeRemaining.days}天 {timeRemaining.hours}时 {timeRemaining.minutes}分 {timeRemaining.seconds}秒 */}
                            <div className="flex text-center gap-2">
                                <div>
                                    <Button size="sm" className="w-12 cursor-default">
                                        {timeRemaining.days}
                                    </Button>
                                    <p>天</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12 cursor-default">
                                        {timeRemaining.hours}
                                    </Button>
                                    <p>时</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12 cursor-default">
                                        {timeRemaining.minutes}
                                    </Button>
                                    <p>分</p>
                                </div>
                                <div>
                                    <Button
                                        size="sm"
                                        className="w-12 cursor-default"
                                        suppressHydrationWarning={true}
                                    >
                                        {timeRemaining.seconds}
                                    </Button>
                                    <p>秒</p>
                                </div>
                            </div>
                        </div>
                    ) : target.BIddingStatus === "AboutToStart" ? "拍賣尚未開始（" + dayjs(target.startDateTime).format('YYYY-MM-DD HH:mm:ss') + ")" : target.BIddingStatus === "Completed" ? "拍賣已結束" : null
                }
                <div className="flex justify-between py-2 border-b border-[#253D59]">
                    <div>
                        <p>當前出價{isOwner ? "（你的出價現在最高）" : ""}</p>
                        <p>HKD {maxPrice.toLocaleString()}</p>
                    </div>
                    <Dialog >
                        <DialogTrigger>
                            <div className=" underline cursor-pointer" >出價歷史</div>
                        </DialogTrigger>
                        <DialogContent className="w-[800px] max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>{target.title}出價歷史</DialogTitle>
                                <DialogDescription>
                                    <BidList id={target._id}></BidList>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex justify-between py-2 gap-2">
                    <Input type="text" onChange={(e) => setBidPrice(e.target.value)} />

                    <Button Button className="bg-[#5E5E5E]" onClick={notify}>
                        出價
                    </Button>
                </div>
                <div className="py-2">
                    <p>每口價</p>
                    <p>HKD {target.bidIncrement.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <span className="text-sm">保證金：{(maxPrice * 0.1).toLocaleString()}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span className="text-sm">需要在中標後4小時內支付的價格，為拍賣現價的10%</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <span className="text-sm">評估價：{target.startingPrice.toLocaleString()}</span>
                </div>
            </div>
            <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
                <Divider >
                    <span className="font-semibold text-lg text-[#253D59]">聯絡方式</span>
                </Divider>
                <div className="flex gap-4 p-4 border bg-white mt-2">
                    <div><Avatar circle className=" text-xl" /></div>
                    <div>
                        <p className="font-semibold text-lg mb-1">葉比德（Ivy Yeh）</p>
                        <p className="mb-1">電話：+852 62015450</p>
                        <p className="mb-1">微信：ineedluck99</p>
                        <p className="mb-1">電郵：普比德.hk@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="border border-[#253D59] p-3 mt-8 bg-[#f3f3f3]">
                <Divider className="mb-2">
                    <span className="font-semibold text-lg text-[#253D59]">文件下載</span>
                </Divider>
                <div className="p-4 border bg-white mt-2">
                    <Link href="/file.pdf" className="underline">地契.pdf</Link>
                </div>
            </div>
        </div>
    )
}
export default Bid;