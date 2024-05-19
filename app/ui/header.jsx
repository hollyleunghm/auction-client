"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import { Avatar, Whisper, Popover, Dropdown } from "rsuite";
import { useEffect } from "react";
export default function Header() {
    const login = () => {
        location.href = "/login?redirect=" + location.href;
    }
    const { data: session, status } = useSession();
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
            name: "樓盤拍賣",
        },
        {
            path: "/carpark",
            name: "車位拍賣",
        },
        {
            path: "/contactus",
            name: "聯絡我們",
        },
        {
            path: "/faq",
            name: "FAQ",
        },
        // {
        //     path: "/register",
        //     name: "注冊",
        // },
    ];
    useEffect(() => {
    }, [status]);
    useEffect(() => {
        async function fetchSession() {
            await getSession();
        }
        fetchSession();
    }, []);
    return (
        <div className="md:flex items-center justify-between w-full max-w-[1600px] mx-auto">
            <Link href="/home">
                <Image src="/PropBid.png" alt="" width={115} height={115} className="mx-auto block" />
            </Link>
            <div className="md:flex items-center md:gap-4 gap-1 justify-between px-2 md:justify-start md:px-0 mb-4 md:mb-0">
                {routes.map((route) => {
                    return (                         
                        <Link href={route.path} key={route.path}>
                            <button
                                className={
                                    "w-full md:w-auto text-left md:text-center transition-all duration-300 ease-in-out md:px-4 px-3 py-1 md:text-sm text-[#444444] hover:bg-[#f3f1eb]" +
                                    (activeRoute(route.path) ? " bg-[#ede9e1]" : "")
                                }
                            >
                                {route.name}
                            </button>
                        </Link>
                    );
                })}
                <div>

                    {/* {JSON.stringify(session)}-------- */}
                    {status === "authenticated" ? (
                        <Whisper className="cursor-pointer" placement="bottomEnd" trigger="click" speaker={<Popover>
                            <Dropdown.Menu>
                                <Dropdown.Item>個人資料</Dropdown.Item>
                                <Link href="/logout">
                                    <Dropdown.Item>
                                        登出
                                    </Dropdown.Item>
                                </Link>
                            </Dropdown.Menu>
                        </Popover>}><Avatar circle className="cursor-pointer md:text-base text-xs">{session.user.email.substring(0, 1).toUpperCase()}</Avatar></Whisper>
                    ) : status === "unauthenticated" ? (
                        <button className="transition-all duration-300 ease-in-out md:px-4 px-3 py-1 md:text-sm text-[#444444] hover:bg-[#f0d300] hover:opacity-80 bg-[#f0d300]" onClick={login}>
                            登入/注冊
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
