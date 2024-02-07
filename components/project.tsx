import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

export default function Project({ title, description, imageSrc, link }: Props) {
  return (
    <div className="max-w-4xl mx-auto my-8 lg:min-w-[768px] xl:min-w-[1024px] 2xl:min-w-[1280px]">
      <div className="flex flex-col items-center text-center rounded-xl bg-white shadow-md overflow-hidden">
        <div className="p-5">
          <h2 className="text-3xl lg:text-5xl font-medium tracking-tight text-neutral-800 md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-lg lg:text-2xl text-neutral-600 font-light">
            {description}
          </p>
        </div>
        <div className="p-4 lg:p-8 pt-0 w-full block">
          <Link href={link} passHref className="block w-full">
            <div className="relative h-64 md:h-96 lg:h-[448px] 2xl:h-[576px] transition-all">
              <Image
                src={imageSrc}
                alt={title}
                layout="fill"
                className="transition-transform duration-500 object-fill hover:scale-105 lg:hover:scale-100 rounded-xl shadow-md border-2 border-neutral-500"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
