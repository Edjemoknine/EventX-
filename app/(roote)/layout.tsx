import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

const layoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default layoute;
