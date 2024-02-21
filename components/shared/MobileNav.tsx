import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
const MobileNav = () => {
  return (
    <nav className="md:hidden flex">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex flex-col gap-6">
              <Link className="flex gap-1 items-center" href={"/"}>
                <Image src={"logo.svg"} width={40} height={24} alt="logo" />
                <span className="font-semibold text-xl">EventX</span>
              </Link>
              <Separator />
              <NavItems />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
