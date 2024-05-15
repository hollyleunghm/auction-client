"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
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

import UseCountdownTimer from "@/hooks/UseCountdownTimer";
import { ToastContainer, toast } from "react-toastify";
import { Avatar } from 'rsuite';
import Divider from "@/app/ui/divider";
import Link from "next/link";
import BidList from "@/app/ui/bidList";
export default function Client({ property, defaultCount, defaultMaxPrice,defaultIsOwner }) {
    const [count, setCount] = useState(defaultCount);
    const [isOwner, setIsOwner] = useState(defaultIsOwner);
    const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
    const deadline = new Date(property.endDateTime).getTime();
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
        fetch("/api/bid/" + property._id + "?targetType=1").then(async (res) => {
            const data = await res.json();
            if (!data.error) {
                setCount(data.count);
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
        fetch("/api/bid/" + property._id, {
            method: "POST",
            body: JSON.stringify({
                bidPrice: bidPrice,
                targetType: 0,
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
        <div className="w-[1000px] mx-auto pb-12">
            <ToastContainer position="top-center" autoClose={false} />


            {/* {JSON.stringify(bid)} */}
            <div className="flex gap-12 justify-between">
                <div className="w-[600px]">
                    <Carousel
                        showThumbs={true}
                        showIndicators={false}
                        showArrows={false}
                        autoPlay={false}
                    >
                        <img src={property.mainImage} alt={property.title} />
                        <img src={property.mainImage} alt={property.title} />
                        <img src={property.mainImage} alt={property.title} />
                    </Carousel>
                    <div>
                        <h1 className="text-xl font-semibold">樓盤介紹</h1>
                        <div>
                            <div>地址：{property.address}</div>
                            <div>起標價：{property.startingPrice.toLocaleString()} </div>
                            <div>每口價：{property.bidIncrement.toLocaleString()}</div>
                            <div>
                                {property.content.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                            <div>建築面積：{property.constructionArea} 平方呎</div>
                            <div>呎價: @{property.pricePerFoot1.toLocaleString()} 元</div>
                            <div>實用面積：{property.practicalArea} 平方呎</div>
                            <div>呎價: @{property.pricePerFoot2.toLocaleString()} 元</div>
                            <div>座數及單位: {property.seatsAndUnits}</div>
                            <div>屋苑樓齡: {property.age} 年</div>
                            <div>座向(客廳)：{property.towards}</div>
                            <div>單位樓層{property.floor}</div>
                            <div>房間及浴室：{property.rooms}</div>
                            <div>小學校網：{property.primarySchoolNetwork}</div>
                            <div>中學校網：{property.middleSchoolNetwork}</div>
                            <div>物業地址：{property.propertyAddress}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-[#253D59]">{property.title}</h1>
                    <h3 className="text-sm text-[#253D59]">{property.address}</h3>
                    <div className="mt-8 text-md  text-[#253D59] ">
                        <div>
                            <p>拍賣截止時間:</p>
                            <p className="font-semibold"> {property.endDateTime + "(UTC+8)"} </p>
                        </div>
                        {
                            property.BIddingStatus === "InProgress" ? (
                                <div className="py-2 border-b border-[#253D59]">
                                    <div>倒计时</div>
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
                            ) : property.BIddingStatus === "AboutToStart" ? "拍賣尚未開始" : property.BIddingStatus === "Completed" ? "拍賣已結束" : null
                        }
                        <div className="flex justify-between py-2 border-b border-[#253D59]">
                            <div>
                                <p>當前出價{isOwner?"（你的出價現在最高）":""}</p>
                                <p>HKD {maxPrice.toLocaleString()}</p>
                            </div>
                            <Dialog >
                                <DialogTrigger>
                                    <div className=" underline cursor-pointer" >出價歷史</div>
                                </DialogTrigger>
                                <DialogContent className="w-[800px] max-w-[800px]">
                                    <DialogHeader>
                                        <DialogTitle>{property.title}出價歷史</DialogTitle>
                                        <DialogDescription>
                                            <BidList id={property._id}></BidList>
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
                            <p>HKD {property.bidIncrement.toLocaleString()}</p>
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
                                <p className="mb-1">電郵：propbid.hk@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-[#253D59] p-3 mt-8 bg-[#f3f3f3]">
                        <Divider className="mb-2">
                            <span className="font-semibold text-lg text-[#253D59]">文件下载</span>
                        </Divider>
                        <div className="p-4 border bg-white mt-2">
                            <Link href="/file.pdf" className="underline">地契.pdf</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
