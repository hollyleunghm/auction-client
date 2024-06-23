// "use client";
import Link from "next/link";
import Image from "next/image";
// import { useRouter } from 'next/router';
import { auth } from "@/auth";
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
import { useTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { headers } from 'next/headers'
import HeaderNavItem from "./headerNavItem";
export default async function Header({ lng }) {
    const { t } = await useTranslation(lng);
    const session = await auth();
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    console.log("pathname", pathname);

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
    ];

    return (
        <div className="md:flex items-center justify-between w-full max-w-[1600px] mx-auto">

            <Link href="/home" className="md:flex items-center">
                <Image src="/PropBid.png" alt="" width={115} height={115} className="mx-auto block" />
                <p className="text-blue-400 md:ml-6 text-center md:text-left">demo</p>
            </Link>
            <div className="flex justify-start flex-1 items-center gap-4 ml-6">
                {languages.filter((l) => lng !== l).map((l) => {
                    return (
                        <a href={`/${l}/home`} key={l} className="text-blue-400 cursor">
                            {t(l)}
                        </a>
                    )
                })}
            </div>
            <div className="md:flex items-center md:gap-4 gap-1 justify-between px-2 md:justify-start md:px-0 mb-4 md:mb-0">
                {routes.map((route) => {
                    return (
                        <Link href={route.path} key={route.path}>
                            <HeaderNavItem path={route.path} name={route.name} ></HeaderNavItem>
                        </Link>
                    );
                })}
                <div>
                    {session ? (
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
                    ) : (
                        <Link href="/login">
                            <button className="transition-all duration-300 ease-in-out md:px-4 px-3 py-1 md:text-sm text-[#444444] hover:bg-[#f0d300] hover:opacity-80 bg-[#f0d300]" >
                                {t("login")}/{t("register")}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div >
    );
}
