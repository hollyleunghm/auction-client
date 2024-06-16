"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import Upload from "@/components/upload";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { IoPersonSharp, IoBusiness, IoMailSharp, IoPhonePortrait } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";


const Step = ({ onClick, staticStep, currentStep, text }) => {
    return <div onClick={onClick} className={`cursor-pointer transition-all flex-1 text-center border-b-4 py-2 ${currentStep >= staticStep ? "border-blue-500  font-semibold" : ""}`} >{text}</div>
}
const UI = ({ user }) => {
    let index = 0;
    if (user.status === "1") {
        index = 2;
    } else if (user.idCard || user.financialProof) {
        index = 1;
    }
    const [step, setStep] = useState(index);
    const [idCard, setIdCard] = useState(user.idCard);
    const [financialProof, setFinancialProof] = useState(user.financialProof);
    const mutation = useMutation({
        mutationFn: async () => {
            if (!idCard && !financialProof) {
                toast.error("請至少上傳一個證明");
                return;
            }
            const res = await fetch("/api/profile/proof", {
                method: "POST",
                body: JSON.stringify({
                    idCard: idCard,
                    financialProof: financialProof
                })
            });
            const data = await res.json();
            return data;
        }
    });
    const go0 = () => {
        if (user.status === "1") {
            return;
        }
        setStep(0);
    }
    const go1 = () => {
        if (user.status === "1") {
            return;
        }
        if (!idCard && !financialProof) {
            toast.error("請至少上傳一個證明");
            return;
        }
        setStep(1);
    }

    useEffect(() => {
        if (!mutation.data) {
            return;
        }
        if (!mutation.data.error) {
            toast.success(mutation.data.msg);
            setStep(1);
        } else {
            toast.error(mutation.data.error);
        }
    }, [mutation.data])
    return (
        <div className="w-[1000px] mx-auto">
            <ToastContainer autoClose={2000} position="top-center" />
            <div className="flex w-full justify-center">
                <Step onClick={go0} staticStep={0} currentStep={step} text="1.提交證明"></Step>
                <Step onClick={go1} staticStep={1} currentStep={step} text="1.等待審核"></Step>
                <Step staticStep={2} currentStep={step} text="1.開始拍賣"></Step>
            </div>
            <div className="border min-h-[700px]">
                <div className={`p-6 ${step === 0 ? "block" : "hidden"}`}>
                    <div className="text-sm mb-4">
                        備注：現時我們只接受最近三個月發出的銀行月結單為證明文件。月結單上需要清晰注明地址。
                        如果你現時未有相應文件可以提供，請於稍後聯絡<a href="mailto:cs@propbidhk.com" className="text-blue-500">cs@propbidhk.com</a> 補充文件完成注冊。
                    </div>
                    <div className="w-full flex gap-6">
                        <div className="w-3/5">
                            <div className="mb-2">
                                <label htmlFor="" className="text-lg">身份證/護照</label>
                                <Upload
                                    maxFiles={1}
                                    defaultValue={idCard ? [idCard] : null}
                                    onChange={arr => {
                                        arr && arr.length > 0 ? setIdCard(arr[0]) : setIdCard(null)
                                    }}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className="text-lg">財務證明</label>
                                <Upload
                                    maxFiles={1}
                                    defaultValue={financialProof ? [financialProof] : null}
                                    onChange={arr => {
                                        arr && arr.length > 0 ? setFinancialProof(arr[0]) : setFinancialProof(null)
                                    }} />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <Button variant="outline" className="w-1/2" asChild>
                                    <Link href="/profile/edit">
                                        更改資料
                                    </Link>
                                </Button>
                                <Button className="w-1/2" onClick={mutation.mutate} disabled={mutation.isPending}>提交</Button>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-lg">個人資訊</label>
                            <div className="border rounded-md bg-white p-6 text-lg">
                                <div className="mb-2 flex gap-2 items-center">
                                    <IoPersonSharp />{user.chineseName}
                                </div>
                                <div className="mb-2 flex gap-2 items-center">
                                    <IoBusiness />{user.address}
                                </div>
                                <div className="mb-2 flex gap-2 items-center">
                                    <IoMailSharp />{user.email}
                                </div>
                                <div className="mb-2 flex gap-2 items-center">
                                    <IoPhonePortrait />{user.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`p-6 text-center ${step === 1 ? "block" : "hidden"}`}>

                    <FaCheckCircle className="text-green-500 text-8xl font-semibold mx-auto mt-12 mb-6"></FaCheckCircle>
                    <div className="text-xl font-semibold mb-4">
                        感謝你的註冊！我們將盡快審批你的申請，並於審核成功後寄出電郵通知。
                    </div>
                    {
                        idCard && financialProof ?
                            <div>
                                如有任何資料需要更新，請聯絡<a href="mailto:cs@propbidhk.com" className="text-blue-500">cs@propbidhk.com</a> 。
                            </div> :
                            <div>
                                如要你的注冊獲得批准，請聯絡<a href="mailto:cs@propbidhk.com" className="text-blue-500">cs@propbidhk.com</a>補充剩餘的文件。
                            </div>
                    }
                    <div className="flex gap-4 mt-6">
                        <Button variant="outline" className="w-1/2" onClick={() => { setStep(0) }}>
                            返回提交
                        </Button>
                        <Button className="w-1/2" asChild>
                            <Link href="/property">前往樓盤</Link>
                        </Button>
                    </div>
                </div>
                <div className={`p-6 text-center ${step === 2 ? "block" : "hidden"}`}>
                    <FaCheckCircle className="text-green-500 text-8xl font-semibold mx-auto mt-12 mb-6"></FaCheckCircle>
                    <div className="text-xl font-semibold mb-4">
                        恭喜您審批通過，前往樓盤頁面查看樓盤。
                    </div>
                    <div className="flex gap-4 mt-6">
                        <Button className="w-full" asChild>
                            <Link href="/property">前往樓盤</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default UI;