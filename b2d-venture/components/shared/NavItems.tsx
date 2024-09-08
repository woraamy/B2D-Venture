'use client';

import { headerLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItems = () => {
    const pathname = usePathname();

    return (
        <ul className="flex flex-col md:flex-row gap-6 md:gap-20 items-start md:items-center">
            {headerLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <li 
                        key={link.route} 
                        className={`p-medium-20 whitespace-nowrap ${isActive ? 'text-[#FF553E]' : 'text-inherit'}`}
                    >
                        <Link href={link.route}>{link.label}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavItems;
