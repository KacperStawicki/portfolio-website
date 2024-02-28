"use client";

import Card from "@/components/card";
import Project from "@/components/project";
import Link from "next/link";

type ProjectType = {
  link: string;
  title: string;
  imageSrc: string;
};

export default function Home() {
  return (
    <main className="text-[#2A2D31] overflow-auto">
      <div className="bg-[url('/hero_background.jpg')] bg-bottom">
        <section className="px-4 py-16 lg:px-8 lg:py-32 text-center">
          <div className="flex flex-col items-center">
            <span className="text-7xl lg:text-8xl">Kacper Stawicki</span>
            <span className="text-2xl lg:text-4xl">Front-End Developer</span>
            <div className="gap-8 flex justify-center mt-4">
              <Link
                href="https://www.linkedin.com/in/kacper-stawicki-0541512a9"
                target="_blank"
                className="bg-[#0077B5] rounded-xl shadow-md text-white lg:text-2xl px-4 py-2 w-fit transition-all hover:scale-105"
              >
                LinkedIn
              </Link>
              <Link
                href="mailto:stawicki.k02@gmail.com?subject=Collaboration&body=Hello! ..."
                className="bg-[#2A2D31] rounded-xl shadow-md text-white lg:text-2xl px-4 py-2 w-fit transition-all hover:scale-105"
              >
                E-Mail
              </Link>
            </div>
          </div>
        </section>
        <section className="flex flex-1 py-16 lg:py-32 mx-auto">
          <div className="flex flex-1 items-center justify-center lg:space-x-24 flex-col lg:flex-row space-y-8 lg:space-y-0">
            <Card
              title="Who I Am"
              description="Hi! I'm Kacper, a 21-year-old self-taught Front-End Developer skilled in Next.js, TypeScript, and TailwindCSS. I'm passionate about crafting seamless web experiences and constantly expanding my tech horizons. As a part-time Computer Science student, I blend academic insights with practical development work. Outside coding, I explore retro-tech and enjoy the outdoors. Approachable and eager to learn, I'm always open to connect and dive into new projects!"
            />
            <Card
              title="My Skills"
              description="I'm currently diving deep into Next.js, TypeScript, and Tailwind CSS, and have reached an advanced level in HTML, CSS, React, and JavaScript. For my personal and university projects, I also work with C#, C++, SQL, PHP, and Python, though I'm still building my expertise in these areas. My go-to operating systems are Windows and MacOS, but I've also spent considerable time exploring various Linux distributions, enhancing my versatility. I hold EE.08 and EE.09 certifications, which have equipped me with a solid foundation in networking, hardware, server management, and databases, further broadening my technical skill set."
            />
            <Card
              title="Backstory"
              description="I started getting into computers when I was just 6, mainly by playing simple games. But I was always curious and wanted to know how things worked inside the computer. By the time I was 12, I got into programming, starting with C++. It was pretty hard, but it really helped me understand a lot more later on. When I was 16 and in high school, I began to learn about front-end development. I liked it so much that I kept learning more on my own. By the time I was 20, all that learning paid off and I got my first job in the field."
            />
          </div>
        </section>
      </div>
      <section className="flex lg:flex-1 py-16 mx-auto">
        <div className="flex flex-col lg:flex-1 space-y-32">
          <Project
            title="Portfolio"
            description="The website you are currently on. A simplistic portfolio to learn more about me & contact me to collaborate."
            imageSrc="/portfolio.jpg"
            tech={["Next.js", "TypeScript", "TailwindCSS"]}
            link="https://github.com/Renjirox/portfolio-website"
          />

          <Project
            title="Dashboard"
            description="A barebone website used for managing a business. Written with Next.js, more functions incoming soon."
            imageSrc="/dashboard.jpg"
            tech={["Next.js", "TypeScript", "TailwindCSS"]}
            link="https://github.com/Renjirox/dashboard"
            flip
          />
          <Project
            title="Syndicate of Souls"
            description="A website for an upcoming indie MOBA game Syndicate of Souls. Currently written in Next.js, ongoing conversion to Angular."
            imageSrc="/sos.jpg"
            tech={["Next.js", "TypeScript", "TailwindCSS"]}
            link="https://www.syndicateofsouls.com"
          />
        </div>
      </section>
    </main>
  );
}
