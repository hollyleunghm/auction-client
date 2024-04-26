'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const activeRoute = (routeName) => {
        return pathname.includes(routeName);
    };
    const routes = [{
        path: "/home",
        name: "主页",
    }, {
        path: "/property",
        name: "楼盘",
    }];
    return (
        <div className='flex items-center justify-between w-[1600px] mx-auto'>
            <img src="/PropBid.png" alt="" />
            <div className='flex'>
                {routes.map(route => {
                    return <Link href={route.path}><button  className={"transition-all duration-300 ease-in-out px-4 py-1 text-sm text-[#444444] hover:bg-[#f3f1eb]"  + (activeRoute(route.path) ? " bg-[#ede9e1]" : "")}>{route.name}</button></Link>
                })}
            </div>
        </div>
    );
}