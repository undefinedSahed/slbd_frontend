import React from "react";
import Image from "next/image";
import { projects } from "@/lib/constants";
const Projects = () => {
  return (
    <section className="py-8 lg:py-20 bg-gray-100">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">Our Projects</h2>
          <p className="text-lg text-gray-600">
            Explore our recent projects and see how we can help you achieve your
            goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-5"
            >
              <Image
                src={project.image}
                alt={project.title}
                height={500}
                width={900}
                className="w-full aspect-[4/4] object-cover rounded-md mb-4"
              />
              <h3 className="md:text-xl text-lg font-semibold text-center">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
