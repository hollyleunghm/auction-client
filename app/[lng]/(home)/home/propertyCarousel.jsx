"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
export default function PropertyCarousel({ properties, lng }) {
    const { t } = useTranslation(lng);
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }}>
            <CarouselContent className="gap-4" >
                {properties.map(item => {
                    return (
                        // <Link href={"/property/" + item._id} key={item._id}>
                        <CarouselItem key={item._id} className="lg:basis-1/4">
                            <Link href={"/property/" + item._id} key={item._id} className="text-white">
                                <img src={item.coverImage.url} className="w-[300px] h-[300px] object-cover" />
                                <p className="text-white mt-6 text-lg">{lng === "zhcn" ? item.simplifiedChineseTitle : lng === "en" ? item.englishTitle : item.traditionalChineseTitle}</p>
                                <p>HK${item.startingPrice?.toLocaleString()}</p>
                                <p>{item.constructionArea?.toLocaleString()}{t("feet")}</p>
                                <p>＄{(item.startingPrice / item.constructionArea).toFixed(2)}/{t("feet")}</p>
                            </Link>
                        </CarouselItem>
                        // 
                    )
                })}
            </CarouselContent>
            <CarouselPrevious className="-mt-12" />
            <CarouselNext className="-mt-12" />
        </Carousel >

    )
}