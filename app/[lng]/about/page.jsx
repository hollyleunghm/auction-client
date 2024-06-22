import About from '@/models/about';
import { useTranslation } from '@/app/i18n';
import connectMongo from '@/lib/connect-mongo';
import UI from "./ui";
const Page = async ({ params }) => {
    const { t } = await useTranslation(params.lng);
    await connectMongo();
    let about = await About.findOne({});
    if (!about) {
        about = {}
    }
    const lng = params.lng;
    let content = about.traditionalChineseContent;
    if (lng === "zhcn") {
        content = about.simplifiedChineseContent;
    } else if (lng === "en") {
        content = about.englishContent;
    }
    return (
        <UI content={content} disclaimer={t("aboutUs")}></UI>
    )
}
export default Page;