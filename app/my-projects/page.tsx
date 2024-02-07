"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Project from "@/components/project";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type ProjectType = {
  link: string;
  title: string;
  description: string;
  imageSrc: string;
};

export default function MyProjects() {
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setPageLoad(false);
  }, []);

  const projects: ProjectType[] = [
    {
      link: "https://github.com/Renjirox/dashboard",
      title: "Dashboard",
      description: "A dashboard used for managing your business.",
      imageSrc: "/dashboard.jpg",
    },
    {
      link: "https://syndicateofsouls.com",
      title: "Syndicate of Souls",
      description:
        "A website for an upcoming indie game called Syndicate of Souls.",
      imageSrc: "/sos.jpg",
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : projects.length - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < projects.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <main className="flex flex-col min-h-screen pt-12 lg:pt-24 text-neutral-800 overflow-hidden">
      <section
        className={`px-4 transition-all duration-500 ${
          pageLoad ? "-translate-y-4 opacity-0" : ""
        }`}
      >
        <div className="flex justify-center items-center flex-col">
          <span className="text-5xl lg:text-7xl font-medium">My Projects</span>
          <span className="text-xl lg:text-3xl mt-2 font-light">
            My skills in practice & various scenarios
          </span>
        </div>
      </section>
      <section
        className={`transition-all duration-500 ${
          pageLoad ? "translate-y-4 opacity-0" : ""
        }`}
      >
        <div className="flex flex-1 flex-col items-center mt-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center relative overflow-hidden">
              <div
                className="transition-transform ease-in-out duration-700"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  display: "flex",
                  width: `${projects.length * 100}%`,
                  maxWidth: "100vw",
                }}
              >
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex w-full px-4"
                    style={{ width: "100vw" }}
                  >
                    <Project
                      link={project.link}
                      title={project.title}
                      description={project.description}
                      imageSrc={project.imageSrc}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex justify-around lg:justify-center gap-12">
              <button onClick={goToPrevious}>
                <ChevronLeftIcon className="w-8 h-8" />
              </button>
              <div className="flex justify-center items-center space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`rounded-full transition-all ${
                      currentIndex === index
                        ? "h-3 w-3 bg-neutral-100 border-neutral-400 border"
                        : "h-2 w-2 bg-gray-400 border-neutral-400 border"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
              <button onClick={goToNext}>
                <ChevronRightIcon className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
