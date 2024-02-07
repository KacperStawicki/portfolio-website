"use client";

import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContactMe() {
  const [pageLoad, setPageLoad] = useState<boolean>(true);

  useEffect(() => {
    setPageLoad(false);
  }, []);

  return (
    <main className="flex flex-col min-h-screen pt-12 lg:pt-24 pb-16 text-neutral-800">
      <section
        className={`px-4 transition-all duration-500 ${
          pageLoad ? "-translate-y-4 opacity-0" : ""
        }`}
      >
        <div className="flex justify-center items-center flex-col">
          <span className="text-5xl lg:text-7xl font-medium">Contact Me</span>
          <span className="text-xl lg:text-3xl mt-2 font-light">
            Contact me and collaborate!
          </span>
        </div>
      </section>
      <section
        className={`flex flex-col items-center justify-center flex-grow space-y-4 transition-all duration-500 ${
          pageLoad ? "opacity-0" : ""
        }`}
      >
        <Link
          href="https://www.linkedin.com/in/kacper-stawicki-0541512a9"
          className="w-full bg-[#126491] p-4 flex justify-center"
          target="_blank"
        >
          <svg viewBox="0 0 128 128" className="w-48 h-48 lg:w-64 lg:h-64 ">
            <path
              fill="#0076b2"
              d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"
            ></path>
            <path
              fill="#fff"
              d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
            ></path>
          </svg>
        </Link>
        <Link
          href="mailto:stawicki.k02@gmail.com?subject=Collaboration&body=Hello! ..."
          className="w-full bg-neutral-800 text-neutral-100 p-4 flex justify-center"
        >
          <EnvelopeIcon className="w-48 h-48 lg:w-64 lg:h-64" />
        </Link>
      </section>
    </main>
  );
}
