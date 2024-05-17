"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Bid from "@/app/ui/bid";
import dayjs from "dayjs";
export default function Client({ property, defaultMaxPrice, defaultIsOwner }) {
    return (
        <div className="w-full max-w-[1000px] mx-auto pb-12 px-4 md:px-0">
            {/* {JSON.stringify(bid)} */}
            <div className="md:flex gap-12 justify-between">
                <div className="w-full md:w-[600px]">
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
                            {/* <div>地址：{property.address}</div> */}
                            <div>起標價：{property.startingPrice.toLocaleString()} </div>
                            {/* <div>每口價：{property.bidIncrement.toLocaleString()}</div> */}
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
                            {/* <div>物業地址：{property.propertyAddress}</div> */}
                        </div>
                        <div className="flex justify-between border-t mt-4 pt-4">
                            <div>物業編號：CIA762</div>
                            <div>刊登日期：{dayjs(property.createdAt).format("YYYY-MM-DD")}</div>
                        </div>
                    </div>
                </div>
                <Bid target={property} defaultIsOwner={defaultIsOwner} defaultMaxPrice={defaultMaxPrice}></Bid>
            </div>
        </div>
    );
}
