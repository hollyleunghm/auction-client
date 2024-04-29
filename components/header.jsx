"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function Header() {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const pathname = usePathname();
    const activeRoute = (routeName) => {
        return pathname.includes(routeName);
    };
    const routes = [
        {
            path: "/home",
            name: "主頁",
        },
        {
            path: "/property",
            name: "楼盘拍賣",
        },
        {
            path: "/carPark",
            name: "車位拍賣",
        },
        {
            path: "/concatUs",
            name: "聯絡我們",
        },
        {
            path: "/faq",
            name: "FAQ",
        },
        {
            path: "/register",
            name: "注冊",
        },
    ];
    
    return (
        <div className="flex items-center justify-between w-[1600px] mx-auto">
            <Link href="/home">
                <Image src="/PropBid.png" alt="" width={115} height={115} />
            </Link>
            <div className="flex">
                {routes.map((route) => {
                    return (
                        <Link href={route.path} key={route.path}>
                            <button
                                className={
                                    "transition-all duration-300 ease-in-out px-4 py-1 text-sm text-[#444444] hover:bg-[#f3f1eb]" +
                                    (activeRoute(route.path) ? " bg-[#ede9e1]" : "")
                                }
                            >
                                {route.name}
                            </button>
                        </Link>
                    );
                })}
            </div>
            <div>
                {JSON.stringify(session)}--------
                {status}---------
                {isLoggedIn.toString()}
            </div>
        </div>
    );
}
