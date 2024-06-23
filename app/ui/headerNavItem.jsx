"use client";
import { usePathname } from 'next/navigation'
const HeaderNavItem = ({ path, name }) => {
    const pathname = usePathname();
    const activeRoute = (routeName) => {
        return pathname.includes(routeName);
    };
    return (
        <button
            className={
                "w-full md:w-auto text-left md:text-center transition-all duration-300 ease-in-out md:px-4 px-3 py-1 md:text-sm text-[#444444] hover:bg-[#f3f1eb]" +
                (activeRoute(path) ? " bg-[#ede9e1]" : "")
            }
        >
            {name}
        </button>
    )
}
export default HeaderNavItem;