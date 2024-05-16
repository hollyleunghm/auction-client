"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Bid from "@/app/ui/bid";

export default function Client({ carPark, defaultMaxPrice, defaultIsOwner }) {

    return (
        <div className="w-[1000px] mx-auto pb-12">
            {/* {JSON.stringify(bid)} */}
            <div className="flex gap-12 justify-between">
                <div className="w-[600px]">
                    <Carousel
                        showThumbs={true}
                        showIndicators={false}
                        showArrows={false}
                        autoPlay={false}
                    >
                        <img src={carPark.mainImage} alt={carPark.title} />
                        <img src={carPark.mainImage} alt={carPark.title} />
                        <img src={carPark.mainImage} alt={carPark.title} />
                    </Carousel>
                    <div>
                        <h1 className="text-xl font-semibold">介绍信息</h1>
                        <div>
                            <div>地址：{carPark.address}</div>
                            <div>起拍價：{carPark.startingPrice.toLocaleString()} </div>
                            <div>每口價：{carPark.bidIncrement.toLocaleString()}</div>
                            <div>
                                {carPark.content.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Bid target={carPark} defaultIsOwner={defaultIsOwner} defaultMaxPrice={defaultMaxPrice} targetType={1}></Bid>
            </div>
        </div>
    );
}
