import { useTranslation } from '@/app/i18n'
const Page = async ({ params: { lng } }) => {
    const { t } = await useTranslation(lng)
    return <div>{lng}<h1>{t('title')}</h1></div>
}
export default Page;