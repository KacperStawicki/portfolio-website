"use client";

import Icons from "@/components/icons";
import { useEffect, useState } from "react";

export default function Home() {
  const [pageLoad, setPageLoad] = useState<boolean>(true);

  useEffect(() => {
    setPageLoad(false);
  }, []);

  return (
    <main className="flex flex-col min-h-screen pt-4 text-neutral-800 lg:pt-24">
      <section
        className={`px-4 transition-all duration-500 flex-grow flex flex-col ${
          pageLoad ? "-translate-y-4 opacity-0" : ""
        }`}
      >
        <div className="flex">
          <span className="text-7xl font-medium lg:text-8xl">
            Kacper Stawicki
          </span>
        </div>
        <div className="flex flex-grow flex-1 mb-20 lg:mb-4 justify-between">
          <div className="w-2 text-xl space-y-4 flex-col flex lg:text-4xl">
            <span>F R O N T</span>
            <span>E N D</span>
            <span>D E V E L O P E R</span>
          </div>
          <Icons />
        </div>
      </section>
    </main>
  );
}
