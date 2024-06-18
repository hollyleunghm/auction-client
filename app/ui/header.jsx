"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuItem,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";
import { useTranslation } from "@/app/i18n/client";
export default function Header({ lng }) {
    const { t } = useTranslation(lng);
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
            name: t("home"),
        },
        {
            path: "/property",
            name: t("propertyAuction"),
        },
        {
            path: "/carpark",
            name: t("carParkAuction"),
        },
        {
            path: "/contactus",
            name: t("contactUs"),
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
            <Link href="/home" className="md:flex items-end">
                <Image src="/PropBid.png" alt="" width={115} height={115} className="mx-auto block" />
                <p className="text-blue-400 md:-translate-y-9 md:ml-6 text-center md:text-left">demo</p>
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
                    {status === "authenticated" ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarFallback>{session.user.email.substring(0, 1).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <DropdownMenuLabel>
                                        {t("personalInformation")}
                                        </DropdownMenuLabel>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <Link href="/profile">
                                                <DropdownMenuLabel>{t("personalInformationDisplay")}</DropdownMenuLabel>
                                            </Link>
                                            <Link href="/profile/edit">
                                                <DropdownMenuLabel>{t("editPersonalInformation")}</DropdownMenuLabel>
                                            </Link>
                                            <Link href="/profile/password">
                                                <DropdownMenuLabel>{t("editPassword")}</DropdownMenuLabel>
                                            </Link>
                                            <Link href="/profile/bids">
                                                <DropdownMenuLabel>{t("myBid")}</DropdownMenuLabel>
                                            </Link>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <Link href="/logout">
                                    <DropdownMenuLabel>{t("logout")}</DropdownMenuLabel>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : status === "unauthenticated" ? (
                        <button className="transition-all duration-300 ease-in-out md:px-4 px-3 py-1 md:text-sm text-[#444444] hover:bg-[#f0d300] hover:opacity-80 bg-[#f0d300]" onClick={login}>
                            {t("login")}/{t("register")}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
