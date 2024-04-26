"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UseCountdownTimer from '@/hooks/UseCountdownTimer';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Client({ data }) {
    const deadline = new Date('2024-04-29 00:00:00').getTime();
    const timeRemaining = UseCountdownTimer(deadline);
    const [s, setS] = useState(0);
    const id = useRef(null);
    const notify = () => {
        if (id.current) {
            return;
        }
        id.current = toast.loading("Please wait...", { position: "top-center" });
        setTimeout(() => {
            setS(s + 1);
        }, 1000);
    }

    useEffect(() => {
        if (!s) {
            return;
        }
        toast.update(id.current, { render: "All is good", type: "success", isLoading: false, autoClose: true });
        id.current = null;
    }, [s])


    return (
        <div>
            <ToastContainer autoClose={2000} />
            <div className="flex gap-12">
                <div className="w-[500px]">
                    <Carousel showThumbs={true} showIndicators={false} showArrows={false} autoPlay={false}>
                        <div>
                            <img src="https://static.wixstatic.com/media/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg/v1/fill/w_500,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg" alt="" />
                        </div>
                        <div>
                            <img src="https://static.wixstatic.com/media/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg/v1/fill/w_500,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg" alt="" />
                        </div>
                        <div>
                            <img src="https://static.wixstatic.com/media/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg/v1/fill/w_500,h_333,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/18190a_f5467424699c4734ad45071e73dc6961~mv2.jpeg" alt="" />
                        </div>
                    </Carousel>
                    <div>
                        <h1 className="text-xl font-semibold">介绍信息</h1>
                        <div>
                            <div>地址：港岛东区鲗鱼涌太古湾道</div>
                            <div>起拍价：5,000,000 </div>
                            <div>每口价：10,000</div>
                            罕有放盘, 笋价出售, 开扬园景, 内园景, 大型屋村, 大型商场, 中心旺地, 旺中带静
                            住宅，业权良好，连约，私人屋苑，港岛东区鲗鱼涌，私人委托，即将开始
                            <div>按揭每月供款：$31,867 元</div>
                            <div>首期 $288 万元, 按揭成数 70%</div>
                            <div>按揭利率 3%, 供款年期 25年</div>
                            *以上价钱只供参考
                            <div>建筑面积：708 平方呎</div>
                            <div>呎价: @13,559 元</div>
                            <div>实用面积：591 平方呎</div>
                            <div>呎价: @16,244 元</div>
                            <div>座数及单位: FLAT A室</div>
                            <div>屋苑楼龄: 47 年</div>
                            <div>座向(客厅)：东北</div>
                            <div>单位楼层：中层</div>
                            <div>房间及浴室：2 房 1 浴室</div>
                            <div>小学校网：14校网(东区)</div>
                            <div>中学校网：东区(HK3)</div>
                            <div>物业地址：香港岛太古湾道</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl text-[#253D59]">太古城 高山台 高层 A室</h1>
                    <div className="mt-24 text-md  text-[#253D59] ">
                        <div>
                            <span >拍卖截止时间:</span>
                            <span className="font-semibold"> 2024-04-29 00:00:00 </span>
                        </div>
                        <div className="py-2 border-b border-[#253D59]">
                            <div>倒计时</div>
                            {/* {timeRemaining.days}天 {timeRemaining.hours}时 {timeRemaining.minutes}分 {timeRemaining.seconds}秒 */}
                            <div className="flex text-center gap-2">
                                <div>
                                    <Button size="sm" className="w-12">{timeRemaining.days}</Button>
                                    <p>天</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12">{timeRemaining.hours}</Button>
                                    <p>时</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12">{timeRemaining.minutes}</Button>
                                    <p>分</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12" suppressHydrationWarning={true}>{timeRemaining.seconds}</Button>
                                    <p>秒</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#253D59]">
                            <div>
                                <p>当前出价</p>
                                <p>HKD 11,000,000.00</p>
                            </div>
                            <div>
                                1次出价
                            </div>
                        </div>
                        <div className="flex justify-between py-2 gap-2">
                            <Input type="text" />
                            <Button className="bg-[#5E5E5E]" onClick={notify}>出价</Button>
                        </div>
                        <div className="py-2">
                            <p>最小竞价阶梯</p>
                            <p>HKD 10,000.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}