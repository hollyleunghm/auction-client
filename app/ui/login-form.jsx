'use client';

import { authenticate } from '@/lib/actions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from 'next/link';
import { Button } from 'rsuite';

export default function LoginForm() {
    const router = useRouter();

    const [loginStatus, setLoginStatus] = useState({ success: false, error: null, loading: false });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setLoginStatus({ success: false, error: null, loading: true })
        const result = await authenticate(null, formData);
        if (!result) {
            setLoginStatus({ success: true, error: null, loading: false });
        } else {
            setLoginStatus({ success: false, error: result, loading: false });
        }
    };
    useEffect(() => {
        if (loginStatus.success) {
            router.push('/home');
        }
    }, [loginStatus, router]);

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`mb-3 text-2xl`}>
                    登錄
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            電郵
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <MdOutlineMailOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            密碼
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                            <RiLockPasswordLine className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Link href="/register" className="text-sm text-gray-500 mt-2">前往注冊</Link>
                    <Link href="/forget" className="text-sm text-gray-500 mt-2">忘記密碼</Link>
                </div>

                <Button appearance="primary" className="mt-4 w-full" type="submit" loading={loginStatus.loading}>
                    登錄
                    {/* <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
                </Button>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {loginStatus.error && (
                        <>
                            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                            <p className="text-sm text-red-500">{loginStatus.error}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
