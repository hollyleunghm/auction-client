"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UseCountdownTimer from "@/hooks/UseCountdownTimer";
import { ToastContainer, toast } from "react-toastify";
import { InputNumber } from 'rsuite';

export default function Client({ property, defaultCount, defaultMaxPrice }) {
    const [count, setCount] = useState(defaultCount);
    const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
    const deadline = new Date(property.EndDateTime).getTime();
    const timeRemaining = UseCountdownTimer(deadline);
    const [request, setRequest] = useState({
        loading: false,
        error: false,
        success: false,
        data: {},
    });
    const id = useRef(null);
    const refreshBid = async () => {
        fetch("/api/bid?TargetId=" + property._id).then(async (res) => {
            const data = await res.json();
            if (!data.error) {
                console.log(data);
                setCount(data.count);
                setMaxPrice(data.maxPrice);
            } else {
                toast.error("更新數據失敗，請稍後重試");
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
                TargetId: property._id,
                BidPrice: property.BidIncrement + maxPrice,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!data.error) {
                    setRequest({ ...request, error: true, data: data });
                    toast.update(id.current, {
                        render: "下拍成功",
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
                <div className="w-[700px]">
                    <Carousel
                        showThumbs={true}
                        showIndicators={false}
                        showArrows={false}
                        autoPlay={false}
                    >
                        <div>
                            <img
                                src="https://static.wixstatic.com/media/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg/v1/fill/w_500,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                src="https://static.wixstatic.com/media/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg/v1/fill/w_500,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                src="https://static.wixstatic.com/media/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg/v1/fill/w_500,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg"
                                alt=""
                            />
                        </div>
                    </Carousel>
                    <div>
                        <h1 className="text-xl font-semibold">介绍信息</h1>
                        <div>
                            <div>地址：{property.Address}</div>
                            <div>起拍价：{property.StartingPrice.toLocaleString()} </div>
                            <div>每口价：{property.BidIncrement.toLocaleString()}</div>
                            <div>
                                {property.Content.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                            <div>按揭每月供款：$31,867 元</div>
                            <div>首期 $288 万元, 按揭成数 70%</div>
                            <div>按揭利率 3%, 供款年期 25年</div>
                            *以上价钱只供参考
                            <div>建筑面积：{property.ConstructionArea} 平方呎</div>
                            <div>呎价: @{property.PricePerFoot1.toLocaleString()} 元</div>
                            <div>实用面积：{property.PracticalArea} 平方呎</div>
                            <div>呎价: @{property.PricePerFoot2.toLocaleString()} 元</div>
                            <div>座数及单位: {property.SeatsAndUnits}</div>
                            <div>屋苑楼龄: {property.Age} 年</div>
                            <div>座向(客厅)：{property.Towards}</div>
                            <div>单位楼层：{property.Floor}</div>
                            <div>房间及浴室：{property.Rooms}</div>
                            <div>小学校网：{property.PrimarySchoolNetwork}</div>
                            <div>中学校网：{property.MiddleSchoolNetwork}</div>
                            <div>物业地址：{property.PropertyAddress}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl text-[#253D59]">{property.Title}</h1>
                    <div className="mt-24 text-md  text-[#253D59] ">
                        <div>
                            <p>拍卖截止时间:</p>
                            <p className="font-semibold"> {property.EndDateTime} </p>
                        </div>
                        <div className="py-2 border-b border-[#253D59]">
                            <div>倒计时</div>
                            {/* {timeRemaining.days}天 {timeRemaining.hours}时 {timeRemaining.minutes}分 {timeRemaining.seconds}秒 */}
                            <div className="flex text-center gap-2">
                                <div>
                                    <Button size="sm" className="w-12">
                                        {timeRemaining.days}
                                    </Button>
                                    <p>天</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12">
                                        {timeRemaining.hours}
                                    </Button>
                                    <p>时</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12">
                                        {timeRemaining.minutes}
                                    </Button>
                                    <p>分</p>
                                </div>
                                <div>
                                    <Button
                                        size="sm"
                                        className="w-12"
                                        suppressHydrationWarning={true}
                                    >
                                        {timeRemaining.seconds}
                                    </Button>
                                    <p>秒</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#253D59]">
                            <div>
                                <p>当前出价</p>
                                <p>HKD {maxPrice.toLocaleString()}</p>
                            </div>
                            <div>{count}次出价</div>
                        </div>
                        <div className="flex justify-between py-2 gap-2">
                            {/* <Input type="text" /> */}
                            {/* onChange={(value) => setBidPrice(value)}  */}
                            <InputNumber step={property.BidIncrement} min={0} />
                            <Button className="bg-[#5E5E5E]" onClick={notify}>
                                出价
                            </Button>
                        </div>
                        <div className="py-2">
                            <p>每口价</p>
                            <p>HKD {property.BidIncrement.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
