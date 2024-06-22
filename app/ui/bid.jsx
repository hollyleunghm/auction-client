import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import dayjs from "dayjs";
import UseCountdownTimer from "@/hooks/UseCountdownTimer";
import { ToastContainer, toast } from "react-toastify";
import BidList from "@/app/ui/bidList";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "@/app/i18n/client";
const Bid = ({ target, defaultIsOwner, defaultMaxPrice, targetType = 0, lng }) => {
    const { t } = useTranslation(lng);
    const title = lng === "zhcn" ? target.simplifiedChineseTitle : lng === "en" ? target.englishTitle : target.traditionalChineseTitle;
    const address = lng === "zhcn" ? target.simplifiedChineseAddress : lng === "en" ? target.englishAddress : target.traditionalChineseAddress;
    const [isOwner, setIsOwner] = useState(defaultIsOwner);
    const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
    const deadline = new Date(target.completionDateTime).getTime();
    const timeRemaining = UseCountdownTimer(deadline);
    const [request, setRequest] = useState({
        loading: false,
        error: false,
        success: false,
        data: {},
    });
    const [bidPrice, setBidPrice] = useState();
    const id = useRef(null);
    const refreshBid = async () => {
        fetch("/api/bid/" + target._id + "?targetType=" + targetType).then(async (res) => {
            const data = await res.json();
            if (!data.error) {
                setMaxPrice(data.maxPrice);
                setIsOwner(data.isOwner);
            } else {
                // toast.error("更新數據失敗，請稍後重試");
            }
        });
    }
    const notify = async () => {
        if (id.current) {
            return;
        }
        id.current = toast.info(t("bidIng"));
        fetch("/api/bid/" + target._id, {
            method: "POST",
            body: JSON.stringify({
                bidPrice: bidPrice,
                targetType: targetType,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!data.error) {
                    setRequest({ ...request, error: true, data: data });
                    toast.update(id.current, {
                        render: data.msg,
                        type: "success",
                        isLoading: false,
                    });
                } else {
                    setRequest({ ...request, success: false, data: data });
                    toast.update(id.current, {
                        render: t("bidFailed") + "：" + data.error,
                        type: "error",
                        isLoading: false,
                    });
                }
                refreshBid();
            })
            .catch((err) => {
                toast.update(id.current, {
                    render: t("fetchError"),
                    type: "error",
                    isLoading: false,
                });
            })
            .finally(() => {
                id.current = null;
            });
    };
    return (
        <div>
            <ToastContainer position="top-center" autoClose={false} />
            <h1 className="hidden md:block text-2xl font-semibold text-[#253D59]">{title}</h1>
            <h3 className="hidden md:block text-sm text-[#253D59]">{address}</h3>
            <div className="mt-8 text-md  text-[#253D59] ">
                <div>
                    <p>{t("completeDateTime")}:</p>
                    <p className="font-semibold"> {dayjs(target.completionDateTime).format("YYYY-MM-DD HH:mm:ss") + "(UTC+8)"} </p>
                </div>
                {
                    target.status === "InProgress" ? (
                        <div className="py-2 border-b border-[#253D59]">
                            <div>{t("countDown")}</div>
                            {/* {timeRemaining.days}天 {timeRemaining.hours}時 {timeRemaining.minutes}分 {timeRemaining.seconds}秒 */}
                            <div className="flex text-center gap-2">
                                <div>
                                    <Button size="sm" className="w-12 cursor-default">
                                        {timeRemaining.days}
                                    </Button>
                                    <p>{t("day")}</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12 cursor-default">
                                        {timeRemaining.hours}
                                    </Button>
                                    <p>{t("hour")}</p>
                                </div>
                                <div>
                                    <Button size="sm" className="w-12 cursor-default">
                                        {timeRemaining.minutes}
                                    </Button>
                                    <p>{t("minute")}</p>
                                </div>
                                <div>
                                    <Button
                                        size="sm"
                                        className="w-12 cursor-default"
                                        suppressHydrationWarning={true}
                                    >
                                        {timeRemaining.seconds}
                                    </Button>
                                    <p>{t("second")}</p>
                                </div>
                            </div>
                        </div>
                    ) : target.status === "AboutToStart" ? `${t("bidNoStart")}（ ${dayjs(target.startDateTime).format('YYYY-MM-DD HH:mm:ss')}）` : target.status === "Completed" ? t("bidHasEnd") : null
                }
                <div className="flex justify-between py-2 border-b border-[#253D59]">
                    <div>
                        <p>{t("currentPrice")}{isOwner ? `（${t("youTop")}）` : ""}</p>
                        <p>HKD {maxPrice.toLocaleString()}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <div className=" underline cursor-pointer">{t("bidHistory")}</div>
                        </DialogTrigger>
                        <DialogContent className="overflow-y-auto md:max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>{title}{t("bidHistory")}</DialogTitle>
                                <DialogDescription className="max-h-[70vh] max-w-[80vw] mx-auto md:mx-0 overflow-y-auto" >
                                    <BidList lng={lng} id={target._id}></BidList>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex justify-between py-2 gap-2">
                    <Input type="text" onChange={(e) => setBidPrice(e.target.value)} />

                    <Button onClick={notify}>
                        {t("bid")}
                    </Button>
                </div>
                <div className="py-2">
                    <p>{t("bidIncrement")}</p>
                    <p>HKD {target.bidIncrement.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="text-left">
                                <span className="text-sm">{t("margin")}：{(maxPrice * 0.1).toLocaleString()}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span className="text-sm">{t("marginDes")}</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="text-left">
                                <span className="text-sm text-left">{t("evaluationPrice")}：{target.startingPrice.toLocaleString()}</span>
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}
export default Bid;