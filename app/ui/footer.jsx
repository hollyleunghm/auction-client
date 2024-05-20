import Link from "next/link";
import Image from "next/image";
const Footer = () => {
    return (
        <div className="bg-[#253d59] py-12 w-full">
            <div className="md:w-[1000px] mx-auto text-white">
                <div className="md:flex px-4 md:px-0 items-end gap-4">
                    <div className="leading-8 md:w-2/3 text-sm">
                        <p>普比德 致力於確保網站所提供的資訊是最新及最準確。 若因錯漏而引致任何不便或損失，概不負責。 </p>
                        <p>© 2024 普比德有限公司</p>
                        <div>
                            <Link href="https://www.普比德.com/privacy-policy" target="_blank">使用條款</Link>
                            <span className="mx-2">|</span>
                            <Link href="https://www.普比德.com/privacy-policy" target="_blank">隱私權政策</Link>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="https://www.youtube.com/@propbid" target="_blank">
                            <Image height={30} width={30} src="/youtube.webp" alt="" />
                        </Link>
                        <Link href="https://wa.me/85262015450" target="_blank">
                            <Image height={30} width={30} src="/wsapp.webp" alt="" />
                        </Link>
                        <Link href="https://www.instagram.com/普比德_hk" target="_blank">
                            <Image height={30} width={30} src="/ins.webp" alt="" />
                        </Link>
                        <Link href="https://www.linkedin.com/company/普比德" target="_blank">
                            <Image height={30} width={30} src="/linkedin.webp" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;