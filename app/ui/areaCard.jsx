import Divider from "@/app/ui/divider";
import { useTranslation } from "@/app/i18n/client";

const AreaCard = ({ property, lng }) => {
    // "area": "Area",
    // "salableArea": "Salable area",
    // "grossFloorArea": "Gross floor area",
    // "squareFeet": "Square feet",
    // "yuan": "Yuan"
    const { t } = useTranslation(lng);

    return (
        <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
            <Divider >
                <span className="font-semibold text-lg text-[#253D59]">{t("area")}</span>
            </Divider>
            <div className="flex gap-4 p-4 border bg-white mt-2">
                <div>
                    <p className="mb-1">{t("grossFloorArea")}：{property.constructionArea} {t("squareFeet")}</p>

                    <p className="mb-1">{t("perPrice")}：{(property.startingPrice / property.constructionArea).toFixed(2).toLocaleString()} {t("yuan")}/{t("feet")}</p>
                    <p className="mb-1">{t("salableArea")}：{property.practicalArea} {t("squareFeet")}</p>
                    <p className="mb-1">{t("perPrice")}：{(property.startingPrice / property.practicalArea).toFixed(2).toLocaleString()} {t("yuan")}/{t("feet")}</p>
                </div>
            </div>
        </div>
    )
}
export default AreaCard;