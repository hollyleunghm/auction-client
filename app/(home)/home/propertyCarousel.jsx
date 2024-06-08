"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
export default function PropertyCarousel({ properties }) {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }}>
            <CarouselContent className="gap-4" >
                {properties.map(item => {
                    return (
                        // <Link href={"/property/" + item._id} key={item._id}>
                        <CarouselItem key={item.id} className="lg:basis-1/4">
                            <Link href={"/property/" + item._id} key={item._id} className="text-white">
                                <img src={item.mainImage} className="w-[300px] h-[300px] object-cover" />
                                <p className="text-white mt-6 text-lg">{item.title}</p>
                                {/* <p>HK${item.startingPrice.toLocaleString()}</p> */}
                                {/* <p>{item.constructionArea.toLocaleString()}呎</p> */}
                                {/* <p>＄{item.constructionUnitPrice.toLocaleString()}/呎</p> */}
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