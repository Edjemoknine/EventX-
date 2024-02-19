import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="w-full border-b">
      <div className="wrapper flex justify-between items-center">
        <Link href={"/"}>EventX</Link>
        <div className="flex justify-end gap-3">
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
