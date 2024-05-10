"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UseCountdownTimer from "@/hooks/UseCountdownTimer";
import { ToastContainer, toast } from "react-toastify";
import { InputNumber, Divider, Avatar } from 'rsuite';
import Link from "next/link";
import Image from "next/image";

export default function Client({ property, defaultCount, defaultMaxPrice }) {
    const [count, setCount] = useState(defaultCount);
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
        fetch("/api/bid?targetId=" + property._id).then(async (res) => {
            const data = await res.json();
            if (!data.error) {
                console.log(data);
                setCount(data.count);
                setMaxPrice(data.maxPrice);
            } else {
                // toast.error("更新數據失敗，請稍後重試");
            }
        });
    }
    const notify = async () => {
        if (id.current) {
            return;
        }
        id.current = toast.loading("正在下拍，請稍後");
        fetch("/api/bid", {
            method: "POST",
            body: JSON.stringify({
                targetId: property._id,
                bidPrice: bidPrice,
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
                        autoClose: true,
                    });
                } else {
                    setRequest({ ...request, success: false, data: data });
                    toast.update(id.current, {
                        render: "下拍失敗：" + data.error,
                        type: "error",
                        isLoading: false,
                        autoClose: true,
                    });
                }
                refreshBid();
            })
            .catch((err) => {
                toast.update(id.current, {
                    render: "發生了錯誤請稍後重試",
                    type: "error",
                    isLoading: false,
                    autoClose: true,
                });
            })
            .finally(() => {
                id.current = null;
            });
    };

    return (
        <div className="w-[1000px] mx-auto">
            <ToastContainer autoClose={2000} position="top-center" />
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
                        <h1 className="text-xl font-semibold">介绍信息</h1>
                        <div>
                            <div>地址：{property.address}</div>
                            <div>起拍價：{property.startingPrice.toLocaleString()} </div>
                            <div>每口價：{property.bidIncrement.toLocaleString()}</div>
                            <div>
                                {property.content.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                            <div>按揭每月供款：$31,867 元</div>
                            <div>首期 $288 万元, 按揭成数 70%</div>
                            <div>按揭利率 3%, 供款年期 25年</div>
                            *以上價钱只供参考
                            <div>建筑面积：{property.constructionArea} 平方呎</div>
                            <div>呎價: @{property.pricePerFoot1.toLocaleString()} 元</div>
                            <div>实用面积：{property.practicalArea} 平方呎</div>
                            <div>呎價: @{property.pricePerFoot2.toLocaleString()} 元</div>
                            <div>座数及单位: {property.seatsAndUnits}</div>
                            <div>屋苑楼龄: {property.age} 年</div>
                            <div>座向(客厅)：{property.towards}</div>
                            <div>单位楼层：{property.floor}</div>
                            <div>房间及浴室：{property.rooms}</div>
                            <div>小学校网：{property.primarySchoolNetwork}</div>
                            <div>中学校网：{property.middleSchoolNetwork}</div>
                            <div>物业地址：{property.propertyAddress}</div>
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
                                <p>當前出價</p>
                                <p>HKD {maxPrice.toLocaleString()}</p>
                            </div>
                            <div>{count}次出價</div>
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
                    <div className="border p-2 mt-4">
                        <Divider>
                            <span className="font-semibold  text-[#253D59]">聯絡方式</span>
                        </Divider>
                        <div className="flex gap-4 p-2">
                            <div><Avatar circle className=" text-xl" /></div>
                            <div>
                                <p className="font-semibold text-lg mb-1">葉比德（Ivy Yeh）</p>
                                <p className="mb-1">電話：+852 62015450</p>
                                <p className="mb-1">微信：ineedluck99</p>
                                <p className="mb-1">電郵：propbid.hk@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="border p-2 mt-8">
                        <Divider>
                            <span className="font-semibold  text-[#253D59]">文件下载</span>
                        </Divider>
                        <div className="p-2">
                            <Link href="/file.pdf" className="underline">地契.pdf</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
