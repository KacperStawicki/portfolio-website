"use client";

import { Bars3Icon, HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`absolute flex top-0 bottom-0 left-0 right-0 bg-neutral-800 transition-all text-neutral-100 p-4 ${
          isOpen ? "z-10 opacity-100" : "-z-10 opacity-0"
        }`}
      >
        <nav
          className={`flex flex-1 flex-col items-end justify-end mb-24 transition-all duration-700 text-4xl space-y-8 ${
            isOpen ? "opacity-100" : "opacity-0 -translate-y-4"
          }`}
        >
          <Link
            href="/"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Home
          </Link>
          <Link
            href="/about-me"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            About Me
          </Link>
          <Link
            href="/my-skills"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            My Skills
          </Link>
          <Link
            href="/my-projects"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            My Projects
          </Link>
          <Link
            href="/contact-me"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Contact Me
          </Link>
        </nav>
      </div>
      <nav
        className={`z-20 fixed bottom-0 lg:bottom-auto lg:top-0 right-0 left-0 bg-neutral-800 p-4 grid grid-cols-2 lg:grid-cols-1`}
      >
        <div
          className={`flex items-center justify-start transition-all lg:hidden ${
            isOpen ? "opacity-0 -z-10" : "opacity-100"
          }`}
        >
          <Link href="/">
            <HomeIcon className="w-6 h-6 text-neutral-100" />
          </Link>
        </div>
        <div className="text-neutral-100 lg:flex space-x-8 justify-center items-center text-lg hidden">
          <Link href="/">Home</Link>
          <Link href="/about-me">About</Link>
          <Link href="/my-skills">Skills</Link>
          <Link href="/my-projects">Projects</Link>
          <Link href="/contact-me">Contact</Link>
        </div>
        <div className="flex justify-end items-center lg:hidden">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Bars3Icon className="w-6 h-6 text-neutral-100" />
          </button>
        </div>
      </nav>
    </>
  );
}
