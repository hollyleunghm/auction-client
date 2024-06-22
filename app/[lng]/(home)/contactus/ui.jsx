"use client";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
export default function Page({ contact, lng }) {
    const { t } = useTranslation(lng);
    const handleSubmit = async (event) => {
        event.preventDefault();
        toast.success(t("sendMessageSuccess"));
    };
    return (
        <div className="bg-[#253d59] ">
            <ToastContainer autoClose={2000} position="top-center" />
            <div className="md:w-[1000px] mx-auto border-b p-16">
                <div className="form text-white">
                    <h1 className="text-4xl">{t("contactUs")}</h1>
                    <div className="md:flex justify-between mt-12 gap-12">
                        <div className="flex-1">
                            <div className="mb-12 flex  gap-8">
                                <FiMapPin className="text-2xl flex-shrink-0"></FiMapPin>
                                <span>
                                    {
                                        lng === "zhcn" ? contact.simplifiedChineseAddress : lng === "en" ? contact.englishAddress : contact.traditionalChineseAddress
                                    }
                                </span>
                            </div>

                            <div className="mb-12 flex gap-8">
                                <FiPhone className="text-2xl flex-shrink-0"></FiPhone>
                                <Link target="_blank" href="https://api.whatsapp.com/send/?phone=85262015450 ">
                                    <span>{contact.phone}</span>
                                </Link>
                            </div>
                            <div className="mb-12 flex gap-8">
                                <FiMail className="text-2xl flex-shrink-0"></FiMail>
                                <a href="mailto:propbid.hk@gmail.com">{contact.email}</a>
                            </div>
                        </div>
                        <div className="flex-1 max-w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between gap-4 mb-4">
                                    <div className="">
                                        <label htmlFor="firstName" className="font-thin">{t("surname")}</label>
                                        <input id="firstName" type="text" className="w-full mt-2 bg-transparent border p-1" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="lastName" className="font-thin">{t("name")}</label>
                                        <input id="lastName" type="text" className="w-full mt-2 bg-transparent border p-1" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="font-thin">{t("email")}*</label>
                                    <input id="email" type="email" className="w-full mt-2 bg-transparent border p-1" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="font-thin">{t("content")}</label>
                                    <textarea id="content" className=" w-full mt-2 bg-transparent border p-1" rows={5} />
                                </div>
                                <div className="text-right">
                                    <Button type="submit" className="rounded-none bg-[#f0d300] text-black font-light px-20 py-4 transition-all hover:bg-[#f0d300] hover:opacity-80">{t("send")}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
