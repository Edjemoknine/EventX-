import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="wrapper flex flex-col md:flex-row justify-between items-center gap-3">
        <Link className="flex gap-1 items-center" href={"/"}>
          <Image src={"logo.svg"} width={40} height={24} alt="logo" />
          <span className="font-semibold text-xl">EventX</span>
        </Link>
        <p>2024 EventX. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
