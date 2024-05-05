
// import { auth } from '../../../auth';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "./propertyCarousel";
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
export default async function Home() {
    // const session = await auth();
    
    await connectMongo();
    const properties = await Property.find();
    return (
        <main className="">
            {/* Welcome to the home page!<p>Welcome {JSON.stringify(session)}</p> */}
            <div className="bg-[url('/bg.webp')] bg-cover h-[688px] py-24 flex justify-center items-stretch">
                <div className="bg-[#253d59] py-12 px-36 max-w-[900px] text-white text-center">
                    <h1 className="text-4xl font-bold leading-normal" >普比德</h1>
                    <h1 className="text-4xl font-bold leading-normal">物業拍賣平台</h1>
                    <h2 className="text-xl leading-normal mt-4">普比德將透過其創新的線上拍賣平台徹底改變香港的房地產市場</h2>
                    <h2 className="text-xl leading-normal mt-8">這種 C2C + B2B 混合模式專注於止贖和停車位，為賣家、買家和拍賣師提供數位網關</h2>
                    <Link href="/register">
                        <Button className="mt-8 rounded-none bg-[#f0d300] text-black font-light px-20 py-4 transition-all hover:bg-[#f0d300] hover:opacity-80">注册</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-12">
                <h1 className="text-3xl text-[#253D59] font-semibold mt-12 mb-8 text-center">选择楼盘</h1>
                <div className="mx-12 p-10 bg-[#253D59]">
                    <div className="px-20">
                        <PropertyCarousel properties={JSON.parse(JSON.stringify(properties))}></PropertyCarousel>
                    </div>
                    <div className="text-center  mt-4">
                        <Link href="/property">
                            <Button className="rounded-none bg-white text-black transition-all hover:bg-white hover:opacity-80">查看更多</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
