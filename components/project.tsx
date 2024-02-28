import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  tech: string[];
  imageSrc: string;
  flip?: boolean;
  link: string;
}

export default function Project({
  title,
  description,
  tech,
  imageSrc,
  flip,
  link,
}: Props) {
  return (
    <Link
      href={link}
      className="flex flex-col lg:flex-row lg:justify-center lg:items-center mx-auto xl:gap-32 transition-all hover:scale-105 max-w-[100vw]"
    >
      <div className="lg:hidden text-center mb-8 px-6">
        <div className="flex flex-col">
          <span className="text-4xl">{title}</span>
          <span>{description}</span>
        </div>
      </div>
      {!flip && (
        <div className="px-4 lg:px-0">
          <div className="hidden lg:flex justify-around lg:space-x-16 px-4 lg:justify-normal">
            {tech.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>

          <div className="relative w-full h-48 lg:w-[44rem] lg:h-96 bg-neutral-100 rounded-xl shadow-md">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="rounded-3xl p-4"
            />
          </div>
          <div className="flex justify-around lg:space-x-16 px-4 lg:justify-normal lg:hidden mt-2">
            {tech.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        </div>
      )}
      <div className="lg:flex items-center justify-center flex-1 h-full text-center py-16 lg:max-w-md mx-auto hidden">
        <div className="flex flex-col">
          <span className="text-4xl">{title}</span>
          <span>{description}</span>
        </div>
      </div>
      {flip && (
        <div className="px-4 lg:px-0">
          <div className="hidden lg:flex justify-around lg:space-x-16 px-4 lg:justify-end">
            {tech.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
          <div className="relative w-full h-48 lg:w-[44rem] lg:h-96 bg-neutral-100 rounded-xl shadow-md">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="rounded-3xl p-4"
            />
          </div>
          <div className="flex justify-around lg:space-x-16 px-4 lg:justify-normal lg:hidden mt-2">
            {tech.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
}
