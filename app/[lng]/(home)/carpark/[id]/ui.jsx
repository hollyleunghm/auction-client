"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Bid from "@/app/ui/bid";
import dayjs from "dayjs";
import ConcatCard from "@/app/ui/concatCard";
import FileCard from "@/app/ui/fileCard";
import PriceCard from "@/app/ui/priceCard";
import { useTranslation } from "@/app/i18n/client";
import { useState } from "react";

export default function Client({ carPark, defaultMaxPrice, defaultIsOwner, lng }) {
    const { t } = useTranslation(lng);
    const title = lng === "zhcn" ? carPark.simplifiedChineseTitle : lng === "en" ? carPark.englishTitle : carPark.traditionalChineseTitle;
    const address = lng === "zhcn" ? carPark.simplifiedChineseAddress : lng === "en" ? carPark.englishAddress : carPark.traditionalChineseAddress;
    const content = lng === "zhcn" ? carPark.simplifiedChineseContent : lng === "en" ? carPark.englishContent : carPark.traditionalChineseContent;
    const [currentIndex, setIndex] = useState(0);
    function isVideoFile(url) {
        const videoExtensions = /\.(mp4|avi|webm)$/i;
        return videoExtensions.test(url);
    }
    carPark.otherImages.sort((a, b) => {
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
            {/* {JSON.stringify(bid)} */}
            <div className="md:flex gap-12 justify-between">
                <div className="w-full md:w-[600px]">
                    <Carousel
                        // showThumbs={true}
                        showIndicators={false}
                        showArrows={false}
                        autoPlay={false}
                        selectedItem={currentIndex}
                    >
                        {
                            carPark.otherImages.map((item, index) => {
                                return <CarouselItem src={item.url} key={index}></CarouselItem>
                                // return <div key={index}>11111</div>
                            })
                        }
                    </Carousel>
                    <div className="flex gap-2">
                        {
                            carPark.otherImages.map((item, index) => {
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
                        <h1 className="text-xl font-semibold">{t("desInfo")}</h1>
                        <div>
                            {/* <div>起拍價：{carPark.startingPrice.toLocaleString()} </div>
                            <div>每口價：{carPark.bidIncrement.toLocaleString()}</div> */}
                            <div>
                                {content.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between border-t mt-4 pt-4">
                            <div>{t("codeNumber")}：CIA762</div>
                            <div>{t("postDate")}：{dayjs(carPark.postDate).format("YYYY-MM-DD")}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <Bid lng={lng} target={carPark} defaultIsOwner={defaultIsOwner} defaultMaxPrice={defaultMaxPrice} targetType={1}></Bid>
                    {/* monthlyPayment, downPayment, mortgageAmount, interestRate, years */}
                    <PriceCard lng={lng} target={carPark} monthlyPayment={"1,795"} downPayment={26} mortgageAmount={70} interestRate={3} years={15}></PriceCard>
                    <ConcatCard lng={lng} target={carPark}></ConcatCard>
                    <FileCard lng={lng} target={carPark}></FileCard>
                </div>
            </div>
        </div>
    );
}
