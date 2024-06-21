import Policy from '@/models/policy';
import { useTranslation } from '@/app/i18n';
import connectMongo from '@/lib/connect-mongo';
import UI from "./ui";
const Page = async ({ params }) => {
    const { t } = await useTranslation(params.lng);
    await connectMongo();
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
        <UI content={content} disclaimer={t("disclaimer")}></UI>
    )
}
export default Page;