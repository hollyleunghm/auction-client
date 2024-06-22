import { Avatar } from 'rsuite';
import Divider from "@/app/ui/divider";
import { useTranslation } from "@/app/i18n/client";
const ConcatCard = ({ target, lng }) => {
    const { t } = useTranslation(lng);
    const name = lng === "zhcn" ? target.brokerSimplifiedChineseName : lng === "en" ? target.brokerTraditionalChineseName : target.brokerEnglishName;

    return (
        <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
            <Divider >
                <span className="font-semibold text-lg text-[#253D59]">{t("contactInformation")}</span>
            </Divider>
            <div className="flex gap-4 p-4 border bg-white mt-2">
                <div><Avatar circle className=" text-xl" /></div>
                <div>
                    <p className="font-semibold text-lg mb-1">{name}</p>
                    <p className="mb-1">{t("phone")}：{target.brokerPhoneNumber}</p>
                    <p className="mb-1">{t("weChat")}：{target.brokerWeChat}</p>
                    <p className="mb-1">{t("email")}：{target.brokerEmail}</p>
                </div>
            </div>
        </div>
    )
}
export default ConcatCard;