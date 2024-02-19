import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <div className="w-full border-b">
      <div className="wrapper flex justify-between items-center">
        <Link className="flex gap-1 items-center" href={"/"}>
          <Image src={"/logo.svg"} width={40} height={24} alt="logo" />
          <span className="font-semibold text-xl">EventX</span>
        </Link>
        <SignedIn>
          <nav className="md:flex justify-between items-center hidden max-w-xs w-full">
            <NavItems />
          </nav>
        </SignedIn>
        <div className="flex justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild size={"lg"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;
