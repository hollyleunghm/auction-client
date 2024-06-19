// import { cookies } from "next/headers";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import codeList from "@/lib/code";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CountDown from "@/components/countDown";
export default function RegisterPage() {
    const router = useRouter();
    const { register, formState, watch, reset, handleSubmit } = useForm();
    const [registerStatus, setRegisterStatus] = useState({ success: false, error: null, loading: false });
    const [codeId, setCodeId] = useState(null);
    const email = watch("email");

    // 获取验证码
    const codeMutation = useMutation({
        mutationFn: (email) => {
            return fetch("/api/validate?email=" + email);
        },
    });
    const mutation = useMutation({
        mutationFn: async (data) => {
            data.codeId = codeId;
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(data),
            });
            return await res.json();
        },
    });
    const getCode = () => {
        if (!email) {
            toast.error("請輸入電郵");
            return;
        }
        codeMutation.mutate(email);
    }
    useEffect(() => {
        if (codeMutation.isSuccess && codeMutation.data.ok) {
            codeMutation.data.json().then((res) => {
                if (!res.error) {
                    setCodeId(res.codeId);
                } else {
                    toast.error(res.error);
                }
            });
        }
        if (codeMutation.isError) {
            toast.error(codeMutation.data);
        }
    }, [codeMutation.isPending, codeMutation.isSuccess, codeMutation.isError, codeMutation.data]);
    const onSubmit = (data) => {

        const password = data.password;
        const password2 = data.password2;
        if (password !== password2) {
            toast.warn("密碼不一致");
            return;
        }
        data.promotion = !data.noPromotion;
        data.codeId = codeId;
        mutation.mutate(data);
    };
    useEffect(() => {
        if (mutation.data) {
            if (!mutation.data.error) {
                toast.success("注冊成功，前往登錄");
                setTimeout(() => {
                    router.replace("/login")
                }, 2000);
            }

        }
    }, [mutation.data]);
    return (
        <main className="">
            <ToastContainer autoClose={2000} position="top-center" />
            <div className="mx-auto flex w-full max-w-[700px] p-4 justify-end mt-4">
                <span className="cursor-pointer" onClick={() => router.back()}>返回</span>
            </div>
            <div className=" mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                                        placeholder="請輸入電郵"
                                        required
                                        {...register("email")}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-5">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                    placeholder="請輸入驗證碼"
                                    required
                                    minLength={6}
                                    {...register("validateCode")}
                                />
                                <div>
                                    <CountDown max={30} onClick={getCode} isStart={codeMutation.isPending}></CountDown>
                                </div>
                            </div>
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="phone"
                                >
                                    電話
                                </label>
                                <div className="flex items-start gap-4">
                                    <select name="code" id="code" {...register("code")} className="indent-2 rounded-md border py-[9px] w-36  text-sm" required>
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
                                        {...register("phone")}
                                        placeholder="請輸入電話"
                                        required
                                        pattern="[0-9]*"
                                        title="衹能輸入數字"
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
                                        {...register("firstName")}
                                        placeholder="請輸入First Name"
                                        required
                                        pattern="^[a-zA-Z\s]*$"
                                        title="衹能輸入英文和空格"
                                    />
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("lastName")}
                                        placeholder="請輸入Last Name"
                                        required
                                        pattern="^[a-zA-Z\s]*$"
                                        title="衹能輸入英文和空格"
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
                                        {...register("firstChineseName")}
                                        placeholder="請輸入中文姓"
                                    />
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("lastChineseName")}
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
                                        {...register("password")}
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
                                        {...register("password2")}
                                        placeholder="請確認密碼"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                            <div className="mt-1 flex items-center gap-1">
                                <label
                                    className="text-sm font-medium text-gray-900"
                                    htmlFor="policy"
                                >
                                    註冊即代表你同意我們的條款及細則和私隱政策及已年滿18歲
                                </label>
                            </div>
                            <div className="mt-1 flex items-center gap-1">
                                <input
                                    className="peer rounded-md border border-gray-200 text-sm "
                                    type="checkbox"
                                    {...register("noPromotion")}
                                />
                                <label
                                    className="text-sm font-medium text-gray-900"
                                    htmlFor="noPromotion"
                                >
                                    不同意接收推廣資訊
                                </label>
                            </div>
                        </div>
                        <Button className="mt-4 w-full  bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" disabled={mutation.isPending}>
                            你的物業拍賣之旅由此開始
                        </Button>
                        <div
                            className="flex h-8 items-end space-x-1 justify-between"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <p className="text-sm text-red-500">{mutation.data?.error}</p>
                            <Link href="/login" className="text-sm text-gray-500">按此登入</Link>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}