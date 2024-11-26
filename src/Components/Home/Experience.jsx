import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "../../constants/index";

// 브라우저 언어 감지 함수
const getLanguage = () => {
  const lang = navigator.language || navigator.userLanguage; // 브라우저 언어 감지
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("zh")) return "zh";
  return "en"; // 기본값: 영어
};

const Experience = () => {
  const currentLang = getLanguage(); // 현재 언어 선택

  return (
    <div className="border-b border-neutral-900 pb-4" id="experience">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="my-14 text-5xl font-thin tracking-tight text-center"
      >
        Experience
      </motion.h1>
      <div>
        {EXPERIENCES.map((experience, index) => (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            key={index}
            className="mb-8 flex flex-wrap lg:justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
              className="w-full lg:w-1/4"
            >
              <p className="mb-2 text-xl text-neutral-400">{experience.name[currentLang]}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold">{experience.feature[currentLang]}</h6>
              <p className="text-base font-light text-neutral-400">{experience.description[currentLang]}</p>
              <div className="flex flex-wrap">
                {experience.technologies.map((tech, techIndex) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.2 + 0.6 + techIndex * 0.1,
                    }}
                    whileHover={{ scale: 1.1 }}
                    key={techIndex}
                    className="mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-600"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
