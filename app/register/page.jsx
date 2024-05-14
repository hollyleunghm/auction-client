// import { cookies } from "next/headers";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Button } from 'rsuite';
import codeList from "./code";
import Link from "next/link";
export default function RegisterPage() {
    const router = useRouter();
    const [registerStatus, setRegisterStatus] = useState({ success: false, error: null, loading: false });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const password = formData.get("password");
        const password2 = formData.get("password2");
        if (password !== password2) {
            toast.warn("密碼不一致");
            return;
        }
        const policy = formData.get("policy");
        if (!policy) {
            toast.warn("請勾選同意使用條款");
            return;
        }
        const noPromotion = formData.get("noPromotion");
        if (!noPromotion) {
            formData.append("promotion", false);
        }
        setRegisterStatus({ success: false, error: null, loading: true });
        const res = await fetch("/api/register", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if (data.error) {
            setRegisterStatus({ success: false, error: data.error, loading: false });
            return;
        } else {
            setRegisterStatus({ success: true, error: null, loading: false });
        }
    };
    useEffect(() => {
        if (registerStatus.success) {
            toast.success("注冊成功，前往登錄");
            setTimeout(() => {
                router.replace("/login")
            }, 2000);
        }
    }, [registerStatus]);
    return (
        <main className=" md:h-screen">
            <ToastContainer autoClose={2000} position="top-center" />
            <div className="mx-auto flex w-full max-w-[700px] p-4 justify-end mt-4">
                <span className="cursor-pointer" onClick={() => router.back()}>返回</span>
            </div>
            <div className=" mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                        <h1 className={`mb-3 text-2xl`}>
                            注冊
                        </h1>
                        <div className="w-full">
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="email"
                                >
                                    電郵
                                </label>
                                <div className="">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="請輸入電郵"
                                        required
                                    />
                                </div>
                            </div>
                            {/* <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="countryAndRegion"
                                >
                                    國家或地區
                                </label>
                                <div className="flex items-start">
                                    <select name="countryAndRegion" id="countryAndRegion" className="w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2">
                                        <option value="Hongkong">
                                            中國香港
                                        </option>
                                        <option value="China">
                                            中國大陸
                                        </option>
                                        <option value="Macao">
                                            中國澳門
                                        </option>
                                        <option value="Taiwan">
                                            中國台灣
                                        </option>
                                        <option value="Singapore">
                                            新加坡
                                        </option>
                                        <option value="Malaysia">
                                            馬來西亞
                                        </option>
                                        <option value="other">
                                            其他
                                        </option>
                                    </select>
                                </div>
                            </div> */}
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="phone"
                                >
                                    電話
                                </label>
                                <div className="flex items-start gap-4">
                                    <select name="code" id="code" className="indent-2 rounded-md border py-[9px] w-36  text-sm" required>
                                        {
                                            codeList.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.code}>
                                                        {item.cn}{item.code}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="phone"
                                        type="phone"
                                        name="phone"
                                        placeholder="請輸入電話"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="firstName"
                                >
                                    英文名
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="請輸入First Name"
                                        required
                                    />
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="請輸入Last Name"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="firstChineseName"
                                >
                                    中文名
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="firsTChineseName"
                                        name="firstChineseName"
                                        placeholder="請輸入中文姓"
                                    />
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="lastChineseName"
                                        name="lastChineseName"
                                        placeholder="請輸入中文名"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    密碼（需要為6-20位數）
                                </label>
                                <div className="">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="請輸入密碼"
                                        required
                                        minLength={6}
                                        maxLength={20}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password2"
                                >
                                    確認密碼
                                </label>
                                <div className="">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="password2"
                                        type="password"
                                        name="password2"
                                        placeholder="請確認密碼"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                            <div className="mt-1 flex items-center gap-1">
                                <input
                                    className="peer rounded-md border border-gray-200 text-sm "
                                    id="policy"
                                    type="checkbox"
                                    name="policy"
                                />
                                <label
                                    className="text-sm font-medium text-gray-900"
                                    htmlFor="policy"
                                >
                                    同意條款及細則和私隱政策
                                </label>
                            </div>
                            <div className="mt-1 flex items-center gap-1">
                                <input
                                    className="peer rounded-md border border-gray-200 text-sm "
                                    id="noPromotion"
                                    type="checkbox"
                                    name="noPromotion"
                                />
                                <label
                                    className="text-sm font-medium text-gray-900"
                                    htmlFor="noPromotion"
                                >
                                    不同意接收推廣資訊
                                </label>
                            </div>
                        </div>
                        <Button appearance="primary" className="mt-4 w-full" type="submit" loading={registerStatus.loading}>
                            你的物業拍賣之旅由此開始
                        </Button>
                        <div
                            className="flex h-8 items-end space-x-1 justify-between"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <p className="text-sm text-red-500">{registerStatus.error}</p>
                            <Link href="/login" className="text-sm text-gray-500">按此登入</Link>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}