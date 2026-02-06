"use client";

import Link from "next/link";
import ProjectForm from '@/modules/home/components/project-form'

const Root = () => {
  return (
    <div className="flex items-center justify-center w-full px-4 py-8 mt-32">
      <div className="max-w-5xl w-full">
        <section className="space-y-8 flex flex-col items-center">
          <div className="flex flex-col items-center">
            
            <Link
              href="/"
              className="text-amber-500 text-7xl font-black hover:scale-110 transition-transform duration-300"
              aria-label="Home"
            >
              **
            </Link>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-center">
            Build Something with fun.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-center">
            Create apps and websites by chatting with AI
          </p>
          <div className="max-w-3xl w-full">
            <ProjectForm/>
          </div>
          {/* <ProjectList /> */}
        </section>
      </div>
    </div>
  );
};

export default Root;
