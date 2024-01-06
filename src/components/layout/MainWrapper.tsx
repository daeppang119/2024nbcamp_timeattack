import React, { ReactNode } from "react";

type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <main className="bg-[#f4f4f4] h-[100vh] flex flex-col items-center justify-center">
      <div
        className="flex justify-center bg-white p-[5rem]
      w-full max-w-[600px] rounded-2xl"
      >
        {children}
      </div>
    </main>
  );
}
