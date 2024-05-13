
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
            <div className="bg-[url('/bg.webp')] bg-cover h-[688px] py-36 flex justify-center items-stretch">
                <div className="bg-[#253d59] py-12 px-36 max-w-[900px] text-white text-center">
                    <h1 className="text-4xl font-bold leading-normal" >普比德物業拍賣平台</h1>
                    <h2 className="text-2xl leading-normal mt-4">普比德為香港首創網上樓盤拍賣平台，提供住宅、車位、銀主盤、上車盤、二手樓盤等筍盤拍賣。物業遍佈香港島、九龍及新界。</h2>
                    <Link href="/register">
                        <Button className="text-xl mt-16 rounded-none bg-[#f0d300] text-black  px-20 py-4 transition-all hover:bg-[#f0d300] hover:opacity-80">注册</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-12">
                <h1 className="text-3xl text-[#253D59] font-semibold mt-12 mb-8 text-center">樓盤拍賣</h1>
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
