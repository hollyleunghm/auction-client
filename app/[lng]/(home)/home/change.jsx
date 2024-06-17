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
                                        <p className="mb-4">普比德為賣家提供先進的數據分析和報告工具，讓他們深入了解市場趨勢、投標者偏好以及價格動態的複雜性。這使賣家能夠依據全面的市場情報做出明智的決策。</p>
                                        <p className="mb-4">普比德為投標者提供了透明的財產歷史和細節報告，讓參與者能夠精確追蹤拍賣進度，審視過往的競投歷史，並通過實時通知保持信息的更新，確保他們在整個拍賣過程中保持參與和了解。</p>
                                        <p className="mb-4">此外，普比德通過提供 VR 演示，增強了虛擬體驗，允許潛在買家接近實地遙距參觀物業。</p>

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
                                        <p className="mb-4">普比德提供多種競標選項，旨在提升用戶體驗並提供彈性選擇：</p>
                                        <ul className="list-disc">
                                            <li className="mb-4">
                                                <span className="font-semibold">代理競標： </span>
                                                此功能允許競標者事先為拍賣品設置一個最高出價。系統隨後會自動代表競標者出價，直到達到其指定的限額，確保他們在競拍過程中保持競爭力，而無需不斷監控競標過程。
                                            </li>
                                            <li className="mb-4">
                                                <span className="font-semibold">自動競標： </span>
                                                類似於代理競標，自動競標提供了一種無憂的拍賣體驗。一旦設定，系統將代表參與者逐步出價，保持他們作為最高出價者的位置，直到達到其最大出價為止，讓參與者可以在不需要全程在場的情況下參與拍賣。
                                            </li>
                                            <li>
                                                <span className="font-semibold">定時在線拍賣： </span>
                                                這種拍賣形式在預定的時間內進行，提供了一個透明競標環境。參與者可以在拍賣計時器到時之前的任何時候出價，提供了從任何地方、在任何時候參與拍賣的便利。
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