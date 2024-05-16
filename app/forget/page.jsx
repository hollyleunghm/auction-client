// import { cookies } from "next/headers";
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Button } from 'rsuite';
import { RiLockPasswordLine } from "react-icons/ri";
import Link from 'next/link';

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
        <main className="flex items-center justify-center md:h-screen">
            <ToastContainer autoClose={2000} position="top-center" />
            <div className=" mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4 md:-mt-32">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                        <h1 className={`mb-3 text-2xl`}>
                            忘記密碼
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
                                <div className="flex justify-between">
                                    <Link href="/contactus" className="text-sm text-gray-500 mt-2">忘記電郵</Link>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    驗證碼
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] indent-2 text-sm outline-2 placeholder:text-gray-500"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="請輸入密碼"
                                        required
                                        minLength={6}
                                    />
                                    <Button appearance="primary">{"獲取驗證碼"}</Button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    密碼
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
                        </div>
                        <Button appearance="primary" className="mt-4 w-full" type="submit" loading={registerStatus.loading}>
                            重置密碼
                        </Button>
                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {registerStatus.error && (
                                <>
                                    {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                                    <p className="text-sm text-red-500">{registerStatus.error}</p>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}