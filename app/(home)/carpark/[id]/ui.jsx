"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Bid from "@/app/ui/bid";
import dayjs from "dayjs";
import ConcatCard from "@/app/ui/concatCard";
import FileCard from "@/app/ui/fileCard";
export default function Client({ carPark, defaultMaxPrice, defaultIsOwner }) {

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
                        <div className="flex justify-between border-t mt-4 pt-4">
                            <div>物業編號：CIA762</div>
                            <div>刊登日期：{dayjs(carPark.createdAt).format("YYYY-MM-DD")}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <Bid target={carPark} defaultIsOwner={defaultIsOwner} defaultMaxPrice={defaultMaxPrice} targetType={1}></Bid>
                    <ConcatCard></ConcatCard>
                    <FileCard></FileCard>
                </div>
            </div>
        </div>
    );
}
