
// import { auth } from '../../../auth';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "./propertyCarousel";
import connectMongo from "@/lib/connect-mongo";
import Property from "@/models/property";
import Change from "./change";
import { useTranslation } from "@/app/i18n";

export default async function Home({ params: { lng } }) {
    // const session = await auth();
    const { t } = await useTranslation(lng)
    await connectMongo();
    const properties = await Property.find({ deleted: false });
    return (
        <main className="">
            {/* Welcome to the home page!<p>Welcome {JSON.stringify(session)}</p> */}
            <div className="bg-[url('/bg.webp')] bg-cover h-[50vh] md:h-[688px] md:py-36 flex justify-center items-center">
                <div className="flex flex-col bg-[#253d59] py-8 md:py-12 px-12 md:px-36 w-full md:max-w-[900px] text-white text-center">
                    <h1 className="md:text-4xl text-xl font-bold leading-normal" >PropBid普比德物業拍賣平台</h1>
                    <h2 className="md:text-2xl text-md leading-normal mt-4">普比德為香港首創網上樓盤拍賣平台，提供住宅、車位、銀主盤、上車盤、二手樓盤等筍盤拍賣。物業遍佈香港島、九龍及新界。</h2>
                    <Link href="/property">
                        <Button className="md:text-xl text-sm md:mt-16 mt-8 rounded-none bg-[#f0d300] text-black  px-20 py-4 transition-all hover:bg-[#f0d300] hover:opacity-80">開始拍賣</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-12">
                <h1 className="text-3xl text-[#253D59] font-semibold mt-12 mb-8 text-center">{t("propertyAuction")}</h1>
                <div className="mx-4 md:mx-12 md:px-10 md:py-10 py-2 px-12 bg-[#253D59]">
                    <div className="md:px-20">
                        <PropertyCarousel properties={JSON.parse(JSON.stringify(properties))}></PropertyCarousel>
                    </div>
                    <div className="text-center  mt-4">
                        <Link href="/property">
                            <Button className="rounded-none bg-white text-black transition-all hover:bg-white hover:opacity-80">{t("getMore")}</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mb-12">
                <h1 className="text-3xl text-[#253D59] font-semibold mt-12 mb-8 text-center">{t("changeForYou")}</h1>
                <Change lng={lng} />
            </div>
        </main>
    );
}
