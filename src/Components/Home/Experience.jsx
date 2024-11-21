import React from "react";
import { EXPERIENCES } from "../../constants";

const Experience = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="my-14 text-5xl font-thin tracking-tight text-center">
        Experience
      </h1>
      <div>
        {EXPERIENCES.map((experience, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <div className="w-full lg:w-1/4">
              <p className="mb-2 text-sm text-neutral-400">{experience.year}</p>
            </div>
            <div className="w-full max-w-xl lg:w-3/4">
              <h6 className="mb-2 font-semibold">
                {experience.role} - <span className="text-sm text-purple-100">{experience.company}</span>
              </h6>
              <p className="text-base font-light text-neutral-400">{experience.description}</p>
              <div className="flex flex-wrap">
                {experience.technologies.map((tech, index) => (
                  <div key={index} className="mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-600">
                      {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
