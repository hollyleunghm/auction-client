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
import { useTranslation } from "@/app/i18n/client";
export default function RegisterPage({ params }) {
    const { t } = useTranslation(params.lng);
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
            toast.error(t("pleaseEnterYourEmail"));
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
        // 檢查+852 +853 的電話是否為8個位數字，+86 的是否10or 11位， 886 的是否9個位
        if (data.code === "+852" || data.code === "+853") {
            if (data.phone.length !== 8) {
                toast.warn(t("phone8"));
                return;
            }
        } else if (data.code === "+86") {
            if (data.phone.length !== 10 || data.phone.length !== 11) {
                toast.warn(t("phone10"));
                return;
            }
        } else if (data.code === "886") {
            if (data.phone.length !== 9) {
                toast.warn(t("phone9"));
                return;
            }
        }
        const password = data.password;
        const password2 = data.password2;
        if (password !== password2) {
            toast.warn(t("PasswordsAreInconsistent"));
            return;
        }
        data.promotion = !data.noPromotion;
        data.codeId = codeId;
        mutation.mutate(data);
    };
    useEffect(() => {
        if (mutation.data) {
            if (!mutation.data.error) {
                toast.success(t("registerSuccessGoLogins"));
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
                <span className="cursor-pointer" onClick={() => router.back()}>{t("back")}</span>
            </div>
            <div className=" mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                        <h1 className={`mb-3 text-2xl`}>
                            {t("register")}
                        </h1>
                        <div className="w-full">
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="email"
                                >
                                    {t("email")}
                                </label>
                                <div className="">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        placeholder={t("email")}
                                        required
                                        {...register("email")}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-5">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                    placeholder={t("verificationCode")}
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
                                    {t("phone")}
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
                                        placeholder={t("email")}
                                        required
                                        pattern="[0-9]*"
                                        title={t("onlyNumber")}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="firstName"
                                >
                                    {t("englishName")}
                                </label>
                                <div className="flex gap-4">

                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("englishName")}
                                        placeholder={t("pleaseInput") + t("englishName")}
                                        required
                                        pattern="^[a-zA-Z\s]*$"
                                        title={t("onlyEnglishAndSpace")}
                                    />
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("englishSurname")}
                                        placeholder={t("pleaseInput") + t("englishSurname")}
                                        required
                                        pattern="^[a-zA-Z\s]*$"
                                        title={t("onlyEnglishAndSpace")}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="firstChineseName"
                                >
                                    {t("chineseName")}
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("chineseSurname")}
                                        placeholder={t("pleaseInput") + t("chineseSurname")}
                                    />
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("chineseName")}
                                        placeholder={t("pleaseInput") + t("chineseName")}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    {t("passwordNeed")}
                                </label>
                                <div className="">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("password")}
                                        placeholder={t("pleaseInput") + t("password")}
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
                                    {t("confirmPassword")}
                                </label>
                                <div className="">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        {...register("password2")}
                                        placeholder={t("confirmPassword")}
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
                                    {t("agreePolicy")}
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
                                    {t("noPromotion")}
                                </label>
                            </div>
                        </div>
                        <Button className="mt-4 w-full  bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" disabled={mutation.isPending}>
                            {t("goStart")}
                        </Button>
                        <div
                            className="flex h-8 items-end space-x-1 justify-between"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <p className="text-sm text-red-500">{mutation.data?.error}</p>
                            <Link href="/login" className="text-sm text-gray-500">{t("clickLogin")}</Link>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}