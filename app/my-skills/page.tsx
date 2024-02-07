"use client";

import { useEffect, useState } from "react";
import { TagCloud, TagCloudOptions } from "@frank-mayer/react-tag-cloud";

export default function MySkills() {
  const [pageLoad, setPageLoad] = useState<boolean>(true);
  const [skills, setSkills] = useState<"hard" | "soft">("hard");
  const [orbWidth, setOrbWidth] = useState<number>(1.5);

  useEffect(() => {
    setPageLoad(false);
  }, []);

  useEffect(() => {
    if (innerWidth > 1024) {
      setOrbWidth(1.5);
    } else {
      setOrbWidth(8);
    }
  });

  return (
    <main className="flex flex-col min-h-screen pt-12 pb-16 lg:pt-24 text-neutral-800">
      <section
        className={`px-4 transition-all duration-500 ${
          pageLoad ? "-translate-y-4 opacity-0" : ""
        }`}
      >
        <div className="flex justify-center items-center flex-col">
          <span className="text-5xl lg:text-7xl font-medium">My Skills</span>
          <span className="text-xl lg:text-3xl mt-2 font-light">
            Communicating with the computer
          </span>
        </div>
      </section>
      <section
        className={`mt-12 transition-all duration-500 lg:max-w-5xl lg:min-w-[512px] mx-auto ${
          pageLoad ? "translate-y-4 opacity-0" : ""
        }`}
      >
        <div className="flex justify-around text-lg lg:text-2xl mb-12">
          <button
            className={`rounded-full bg-blue-500 py-2 px-4 text-neutral-100 ${
              skills === "hard" ? "" : "opacity-50"
            }`}
            onClick={() => {
              setSkills("hard");
            }}
          >
            Hard Skills
          </button>
          <button
            className={`rounded-full bg-blue-500 py-2 px-4 text-neutral-100 ${
              skills === "soft" ? "" : "opacity-50"
            }`}
            onClick={() => {
              setSkills("soft");
            }}
          >
            Soft Skills
          </button>
        </div>
        {skills === "hard" ? (
          <TagCloud
            options={(w: Window & typeof globalThis): TagCloudOptions => ({
              radius:
                Math.min(
                  w.innerWidth - w.innerWidth / orbWidth,
                  w.innerWidth,
                  w.innerHeight
                ) / 2,
              maxSpeed: "normal",
            })}
            onClickOptions={{ passive: true }}
            className="flex justify-center text-neutral-800"
          >
            {[
              "Next.JS",
              "TypeScript",
              "Tailwind CSS",
              "GitHub",
              "JavaScript",
              "HTML5",
              "CSS3",
              "React",
              "MS Office",
              "Slack",
              "Asana",
              "Jira",
            ]}
          </TagCloud>
        ) : (
          <TagCloud
            options={(w: Window & typeof globalThis): TagCloudOptions => ({
              radius:
                Math.min(
                  w.innerWidth - w.innerWidth / orbWidth,
                  w.innerWidth,
                  w.innerHeight
                ) / 2,
              maxSpeed: "normal",
            })}
            onClickOptions={{ passive: true }}
            className="flex justify-center text-neutral-800 text-center capitalize"
          >
            {[
              "Team Player",
              "Friendly",
              "Communicative",
              "Working Under Pressure",
              "Conflict-Free",
              "Good Manners",
              "Team Leader",
              "Enthusiastic",
              "Eager to learn",
            ]}
          </TagCloud>
        )}
      </section>
    </main>
  );
}
