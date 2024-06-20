import Policy from '@/models/policy';
import { useTranslation } from '@/app/i18n';
const Page = async ({ params }) => {
    const { t } = await useTranslation(params.lng);
    let policy = await Policy.findOne({});
    if (!policy) {
        policy = {}
    }
    const lng = params.lng;
    let content = policy.traditionalChinesContent;
    if (lng === "zhcn") {
        content = policy.simplifiedChinesContent;
    } else if (lng === "en") {
        content = policy.englishContent;
    }
    return (
        <div className="px-4 md:px-0 w-full max-w-[1000px] mx-auto">
            <h2 className="font-semibold text-xl mb-4">{t("disclaimer")}</h2>
            <div className="px-4 md:px-0 [&>ol>li]:list-[auto]" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div>
    )
}
export default Page;