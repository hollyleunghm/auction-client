// import { cookies } from "next/headers";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

export default function RegisterPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const { register, handleSubmit, formState, watch, reset } = useForm();
    const [codeId, setCodeId] = useState(null);
    const [seconds, setSeconds] = useState(61);
    const [timer, setTimer] = useState(null);
    const email = watch("email");
    // 重置密码
    const mutation = useMutation({
        mutationFn: (data) => {
            return fetch("/api/password/forget", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },
    });
    // 获取验证码
    const codeMutation = useMutation({
        mutationFn: (email) => {
            return fetch("/api/validate?email=" + email);
        },
    });
    const onSubmit = (data) => {
        const password = data.password;
        const password2 = data.password2;
        if (password !== password2) {
            toast.warn("password not equals");
            return;
        }
        mutation.mutate({
            password: password,
            codeId: codeId,
            code: data.code,
            email: data.email,
        });

    };
    const count = () => {
        let timer1 = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        setTimer(timer1);
    };
    const getCode = () => {
        if (!email) {
            toast.error(t("pleaseEnterYourEmail"));
            return;
        }
        codeMutation.mutate(email);
        setSeconds(60);
        count();
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

    useEffect(() => {
        if (mutation.isSuccess && mutation.data.ok) {
            mutation.data.json().then((res) => {
                if (!res.error) {
                    toast.success(res.msg);
                    setTimeout(() => {
                        location.replace("/login");
                    }, 2000);
                } else {
                    toast.error(res.error);
                }
            });
        }
        if (mutation.isError) {
            toast.error(mutation.data);
        }
    }, [mutation.isPending, mutation.isSuccess, mutation.isError, mutation.data]);
    useEffect(() => {
        if (seconds < 0) {
            clearInterval(timer);
            setSeconds(61);
        }
    }, [seconds]);
    return (
        <main className="flex items-center justify-center md:h-screen">
            <ToastContainer autoClose={2000} position="top-center" />
            <div className=" mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4 md:-mt-32">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                        <h1 className={`mb-3 text-2xl`}>
                            {t("forgetPassword")}
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
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder={t("pleaseEnterYourEmail")}
                                        required
                                        {...register("email")}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <Link href="/contactus" className="text-sm text-gray-500 mt-2"> {t("forgetEmail")}</Link>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    {t("verificationCode")}
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder={t("verificationCode")}
                                        required
                                        minLength={6}
                                        {...register("code")}
                                    />
                                    <div>
                                        {
                                            seconds <= 60 ? (
                                                <Button color="primary" disabled>{seconds} S</Button>

                                            ) : (
                                                <Button color="primary" onClick={getCode}>{t("getVerificationCode")}</Button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    {t("password")}
                                </label>
                                <div className="">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder={t("password")}
                                        required
                                        minLength={6}
                                        {...register("password")}
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
                                        id="password2"
                                        type="password"
                                        name="password2"
                                        placeholder={t("confirmPassword")}
                                        required
                                        minLength={6}
                                        {...register("password2")}

                                    />
                                </div>
                            </div>
                        </div>
                        <Button className="mt-4 w-full bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" disabled={mutation.isPending}>
                            {t("resetPassword")}
                        </Button>

                    </div>
                </form>
            </div>
        </main>
    );
}