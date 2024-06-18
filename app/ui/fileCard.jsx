import Link from "next/link";
import Divider from "@/app/ui/divider";
import { useTranslation } from "@/app/i18n/client";
const FileCard = ({ target,lng }) => {
    const { t } = useTranslation(lng);
    return (
        <div className="border border-[#253D59] p-3 mt-8 bg-[#f3f3f3]">
            <Divider className="mb-2">
                <span className="font-semibold text-lg text-[#253D59]">{t("downFile")}</span>
            </Divider>
            <div className="p-4 border bg-white mt-2">
                {
                    target.files.map((item, index) => {
                        return (
                            <Link key={index} href={item.url} className="underline">{item.name}</Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default FileCard;