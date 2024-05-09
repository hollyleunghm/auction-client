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
                        <Link href={"/property/" + item._id} key={item._id}>
                            <CarouselItem key={item.id}>
                                <Image height={300} width={300} alt="" style={{ width:"350px", height:"350px", objectFit: "cover" }} src={item.mainImage}></Image>
                                <p className="text-white mt-6 text-lg">{item.title}</p>
                            </CarouselItem>
                        </Link>)
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}