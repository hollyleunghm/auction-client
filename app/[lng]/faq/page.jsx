import FAQ from '@/models/faq';
import { useTranslation } from '@/app/i18n';
import connectMongo from '@/lib/connect-mongo';
import UI from "./ui";
const Page = async ({ params }) => {
    const { t } = await useTranslation(params.lng);
    await connectMongo();
    let faq = await FAQ.findOne({});
    if (!faq) {
        faq = {}
    }
    const lng = params.lng;
    let content = faq.traditionalChineseContent;
    if (lng === "zhcn") {
        content = faq.simplifiedChineseContent;
    } else if (lng === "en") {
        content = faq.englishContent;
    }
    return (
        <UI content={content}></UI>
    )
}
export default Page;