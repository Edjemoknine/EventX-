"use client";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="w-full flex flex-col md:flex-row items-start gap-4">
      {headerLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            className={`${isActive && "text-blue-600 "} hover:text-blue-600`}
            href={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </ul>
  );
};

export default NavItems;
