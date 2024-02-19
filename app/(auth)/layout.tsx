import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-slate-200 justify-center items-center min-h-screen">
      {children}
    </div>
  );
};

export default layout;
