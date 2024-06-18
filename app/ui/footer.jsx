import Link from "next/link";
import Image from "next/image";

import { useTranslation } from "@/app/i18n";
const Footer = async ({ lng }) => {
    const { t } = await useTranslation(lng);

    return (
        <div className="bg-[#253d59] py-12 w-full">
            <div className="md:w-[1000px] mx-auto text-white">
                <div className="md:flex px-4 md:px-0 items-end gap-4">
                    <div className="leading-8 md:w-2/3 text-sm">
                        <p>{t("footerReminder")} </p>
                        <p>{t("copyRight")} </p>
                        <div>
                            <Link href="https://www.propbid.com/privacy-policy" target="_blank">{t("terms")} </Link>
                            <span className="mx-2">|</span>
                            <Link href="https://www.propbid.com/privacy-policy" target="_blank">{t("privacyPolicy")} </Link>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="https://www.youtube.com/@propbid" target="_blank">
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