import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useTranslation } from "@/app/i18n";

const Change = async ({ lng }) => {

    const { t } = await useTranslation(lng)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mx-4 md:mx-12">
            <div>
                <img className="w-full" src="https://static.wixstatic.com/media/34aef00a568e4c7db32033c39660ed8d.jpg/v1/fill/w_403,h_274,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Market%20Analysis.jpg" alt="" />
                <div className="bg-[#7a8798] pt-20 pb-8 px-8 text-white" >
                    <div className="h-[240px]">
                        <h1 className="text-2xl font-semibold">{t("dataAnalysis")}</h1>
                        <h2 className="text-4xl font-semibold leading-loose">{t("comprehensiveInformation")}</h2>
                        <p className="leading-relaxed">
                            {t("des1")}
                        </p>
                    </div>
                    <div className="text-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="rounded-none bg-white text-black transition-all hover:bg-white hover:opacity-80 mt-16 mx-auto">{t("getMore")}</Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90vw] md:w-[800px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl p-4">{t("moreInfo")}</DialogTitle>
                                    <DialogDescription className="text-xl md:px-4  max-h-[70vh] overflow-auto">
                                        <p className="mb-4">{t("moreInfoDes1-1")}</p>
                                        <p className="mb-4">{t("moreInfoDes1-2")}</p>
                                        <p className="mb-4">{t("moreInfoDes1-3")}</p>

                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div>
                <img className="w-full" src="https://static.wixstatic.com/media/11062b_ec10469e0be144949dda8dbb0f943e7d~mv2.jpg/v1/fill/w_403,h_274,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Person%20checking%20their%20laptop.jpg" alt="" />
                <div className="bg-[#7a8798] pt-20 pb-8 px-8 text-white" >
                    <div className="h-[240px]">
                        <h1 className="text-2xl font-semibold">{t("processSimplification")}</h1>
                        <h2 className="text-4xl font-semibold leading-loose">{t("automatedTrading")}</h2>
                        <p className="leading-relaxed">
                            {t("des2")}
                        </p>
                    </div>
                    <div className="text-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="rounded-none bg-white text-black transition-all hover:bg-white hover:opacity-80 mt-16 mx-auto">{t("getMore")}</Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90vw] max-w-[800px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl p-4">{t("moreInfo")}</DialogTitle>
                                    <DialogDescription className="text-xl md:px-4 max-h-[70vh] overflow-auto">
                                        <p className="mb-4">{t("moreInfoDes2-1")}</p>
                                        <ul className="list-disc">
                                            <li className="mb-4">
                                                <span className="font-semibold">{t("moreInfoDes2-2")}</span>
                                                {t("moreInfoDes2-3")}
                                            </li>
                                            <li className="mb-4">
                                                <span className="font-semibold">{t("moreInfoDes2-4")} </span>
                                                {t("moreInfoDes2-5")}
                                            </li>
                                            <li>
                                                <span className="font-semibold">{t("moreInfoDes2-6")} </span>
                                                {t("moreInfoDes2-7")}
                                            </li>
                                        </ul>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div>
                <img className="w-full" src="https://static.wixstatic.com/media/11062b_50a3aecd4105499abc0ec503381fa5d9~mv2.jpg/v1/fill/w_403,h_274,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Money.jpg" alt="" />
                <div className="bg-[#7a8798] pt-20 pb-8 px-8 text-white" >
                    <div className="h-[240px]">
                        <h1 className="text-2xl font-semibold">{t("lowerCosts")}</h1>
                        <h2 className="text-4xl font-semibold leading-loose">{t("halfPrice")}</h2>
                        <p className="leading-relaxed">
                            {t("des3")}
                        </p>
                    </div>
                    <div className="text-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="rounded-none bg-white text-black transition-all hover:bg-white hover:opacity-80 mt-16 mx-auto">{t("getMore")}</Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90vw] max-w-[800px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl p-4">{t("moreInfo")}</DialogTitle>
                                    <DialogDescription className="text-xl md:px-4  max-h-[70vh] overflow-auto">
                                        <p className="mb-4">普比德的收費結構包含以下幾個部分：</p>
                                        <ul className="list-disc">
                                            <li className="mb-4 text-left "><span>0.8% 佣金費</span> </li>
                                            <li className="mb-4 text-left "><span>10% 定金</span></li>
                                            <li className="text-left"> <span>4000 港幣拍賣費</span></li>
                                        </ul>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Change;