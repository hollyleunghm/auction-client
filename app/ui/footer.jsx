import Link from "next/link";
import Image from "next/image";
const Footer = () => {
    return (
        <div className="bg-[#253d59] py-12">
            <div className="w-[1000px] mx-auto text-white">
                <div className="flex items-end gap-4">
                    <div className="leading-8 w-2/3 text-sm">
                        <p>PropBid strives to ensure that the information provided on the website is up to date and accurate. We are not responsible for any inconvenience or loss caused by errors or omissions. </p>
                        <p>© 2024 PropBid Property Auction Platform</p>
                        <p>Disclaimer | Privacy Policy </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="https://www.youtube.com/@PropBid" target="_blank">
                            <Image height={30} width={30} src="/youtube.webp" alt="" />
                        </Link>
                        <Link href="https://wa.me/85262015450" target="_blank">
                            <Image height={30} width={30} src="/wsapp.webp" alt="" />
                        </Link>
                        <Link href="https://www.instagram.com/propbid_hk" target="_blank">
                            <Image height={30} width={30} src="/ins.webp" alt="" />
                        </Link>
                        <Link href="https://www.linkedin.com/company/propbid" target="_blank">
                            <Image height={30} width={30} src="/linkedin.webp" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;