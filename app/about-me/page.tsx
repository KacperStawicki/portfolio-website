"use client";

import { useEffect, useState } from "react";

export default function AboutMe() {
  const [pageLoad, setPageLoad] = useState<boolean>(true);

  useEffect(() => {
    setPageLoad(false);
  }, []);

  return (
    <main className="flex flex-col min-h-screen pt-12 pb-16 lg:pt-24 text-neutral-800">
      <section
        className={`px-4 transition-all duration-500 ${
          pageLoad ? "-translate-y-4 opacity-0" : ""
        }`}
      >
        <div className="flex justify-center items-center flex-col">
          <span className="text-5xl lg:text-7xl font-medium">About Me</span>
          <span className="text-xl lg:text-3xl mt-2 font-light">
            Get to know me better
          </span>
        </div>
      </section>
      <section
        className={`mt-12 px-8 space-y-8 transition-all duration-500 lg:max-w-lg mx-auto lg:text-xl ${
          pageLoad ? "opacity-0 translate-y-4" : ""
        }`}
      >
        <div className="text-center">
          Hi! I'm Kacper, a 21-year-old self-taught Front-End Developer. My
          journey with computers began at just 6 years old, and I was drawn to
          programming at 13. My web development journey started at 16 during my
          school years and has been progressing ever since. Currently, I work
          primarily with Next.js, TypeScript, and Tailwind CSS. My interests are
          wide-ranging within the technology sphere, from repairing hardware and
          writing software to simply enjoying various content.
        </div>
        <div className="text-center">
          I am a friendly individual who enjoys helping others and fostering an
          enjoyable atmosphere for everyone. I pride myself on my independence
          and am comfortable taking on leadership roles. I strive to remain
          conflict-free and believe that a positive environment leads to
          outstanding achievements.
        </div>
      </section>
    </main>
  );
}
