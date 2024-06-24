"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Bid from "@/app/ui/bid";
import ConcatCard from "@/app/ui/concatCard";
import FileCard from "@/app/ui/fileCard";
import PriceCard from "@/app/ui/priceCard";
import AreaCard from "@/app/ui/areaCard";
import dayjs from "dayjs";
import { useTranslation } from "@/app/i18n/client";
import { useState } from "react";

export default function Client({ property, defaultMaxPrice, defaultIsOwner, lng }) {
    const { t } = useTranslation(lng);
    const title = lng === "zhcn" ? property.simplifiedChineseTitle : lng === "en" ? property.englishTitle : property.traditionalChineseTitle;
    const address = lng === "zhcn" ? property.simplifiedChineseAddress : lng === "en" ? property.englishAddress : property.traditionalChineseAddress;
    const content = lng === "zhcn" ? property.simplifiedChineseContent : lng === "en" ? property.englishContent : property.traditionalChineseContent;
    const [currentIndex, setIndex] = useState(0);
    function isVideoFile(url) {
        const videoExtensions = /\.(mp4|avi|webm)$/i;
        return videoExtensions.test(url);
    }
    property.otherImages.sort((a, b) => {
        if (isVideoFile(a.url) && !isVideoFile(b.url)) {
            return -1; // a 在 b 前面
        } else if (!isVideoFile(a.url) && isVideoFile(b.url)) {
            return 1; // b 在 a 前面
        } else {
            return 0; // 保持原有顺序
        }
    });
    const CarouselItem = ({ src }) => {
        return (
            <div className="h-72" >
                {
                    isVideoFile(src)
                        ?
                        <video className="h-full w-full" controls>
                            <source src={src} type="video/mp4" />
                        </video>
                        :
                        <img className="h-full w-full" src={src} alt="" />
                }
            </div>
        )
    };
    const SublItem = ({ src, index }) => {
        return (
            <div className={`w-24 h-12 cursor-pointer ${currentIndex === index ? 'border-2 border-black' : ''}`} onClick={() => { setIndex(index) }} >
                {
                    isVideoFile(src)
                        ?
                        <video className="h-full w-full">
                            <source src={src} type="video/mp4" />
                        </video>
                        :
                        <img className="h-full w-full" src={src} alt="" />
                }
            </div>
        )

    };
    return (
        <div className="w-full max-w-[1000px] mx-auto pb-12 px-4 md:px-0">
            {/* {JSON.stringify(property)} */}
            <div className="md:flex gap-12 justify-between">
                <div className="w-full md:w-3/5">
                    <Carousel
                        // showThumbs={true}
                        showIndicators={false}
                        showArrows={false}
                        autoPlay={false}
                        selectedItem={currentIndex}
                    >
                        {
                            property.otherImages.map((item, index) => {
                                return <CarouselItem src={item.url} key={index}></CarouselItem>
                                // return <div key={index}>11111</div>
                            })
                        }
                    </Carousel>
                    <div className="flex gap-2">
                        {
                            property.otherImages.map((item, index) => {
                                return <SublItem src={item.url} key={index} index={index}></SublItem>
                                // return <div key={index}>11111</div>
                            })
                        }
                    </div>
                    <div className="md:hidden mb-4">
                        <h1 className="text-2xl font-semibold text-[#253D59]">{title}</h1>
                        <h3 className="text-sm text-[#253D59]">{address}</h3>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">{t("propertyDes")}</h1>
                        <div>
                            <div>
                                {content.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between border-t mt-4 pt-4">
                            <div>{t("codeNumber")}：CIA762</div>
                            <div>{t("postDate")}：{dayjs(property.postDate).format("YYYY-MM-DD")}</div>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/5">
                    <Bid lng={lng} target={property} defaultIsOwner={defaultIsOwner} defaultMaxPrice={defaultMaxPrice}></Bid>
                    <PriceCard lng={lng} target={property}></PriceCard>
                    <AreaCard lng={lng} property={property}></AreaCard>
                    <ConcatCard lng={lng} target={property}></ConcatCard>
                    <FileCard lng={lng} target={property}></FileCard>
                </div>
            </div>
        </div>
    );
}
