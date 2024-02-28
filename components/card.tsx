"use client";

interface Props {
  title: string;
  description: string;
}

export default function Card({ title, description }: Props) {
  return (
    <div className="max-w-xs lg:max-w-sm text-center transition-all hover:scale-105 flex-1 flex flex-col h-full">
      <div className="bg-[#2A2D31] text-white rounded-t-xl p-6 text-4xl">
        {title}
      </div>
      <div className="bg-neutral-200 p-6 rounded-b-xl shadow-md text-sm lg:text-base h-full">
        {description}
      </div>
    </div>
  );
}
