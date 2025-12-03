import React from "react";
import { motion } from "framer-motion";
import "./KidsAcademy.css";
import { FaCircleCheck } from "react-icons/fa6";

const KidsAcademy = () => {
  const programs = [
    {
      id: 1,
      title: "Coding Fundamentals",
      age: "10-14 years",
      duration: "6 months",
      description:
        "Basic programming concepts using kid-friendly languages and tools.",
      topics: ["Scratch programming", "Python basics", "Game development"],
      link: "https://sbtyacedemy.com/courses/intro-to-coding-9ef2d474-8ca3-49fc-8373-8c1863794377",
    },
    {
      id: 2,
      title: "Cyber Safety Basics",
      age: "8-12 years",
      duration: "4 weeks",
      description:
        "Introduction to online safety, password security, and responsible internet use.",
      topics: ["Password creation", "Safe browsing", "Social media awareness"],
    },
    {
      id: 3,
      title: "Electronics and Robotics",
      age: "12-16 years",
      duration: "6 months",
      description:
        "Build your own robots from circuits to code. Learn electronics fundamentals and programming to create interactive bots.",
      topics: ["Circuit basics", "Robotics fundamentals", "Programming bots"],
      link: "https://sbtyacedemy.com/courses/robot-academy-from-circuits-to-code-build-your-own-bots-07e9d31f-c446-4190-8483-924df913792c",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: "12",
      quote: "I learned how to stay safe online and even made my first game!",
    },
    {
      id: 2,
      name: "Michael Chen",
      age: "14",
      quote: "The coding class was amazing. I can now build simple websites!",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: "10",
      quote: "I feel much more confident using the internet safely now.",
    },
  ];

  // === Animation Variants ===
  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      boxShadow: "0px 8px 30px rgba(255, 255, 255, 0.25)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const carouselVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  const carouselItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <motion.section
      className="py-12 lg:py-36 w-full overflow-x-hidden text-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{ willChange: "opacity, transform" }}
    >
      {/* Intro */}
      <motion.div
        className="text-center w-11/12 mx-auto mb-12"
        variants={cardVariants}
      >
        <motion.h2
          className="title mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <a
            href="https://sbtyacedemy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-300 transition-colors duration-300"
          >
            SBTY Acedemy
          </a>
        </motion.h2>
        <motion.p
          className="description max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Empowering the next generation with essential digital skills and cyber
          safety knowledge. Our age-appropriate programs make learning
          technology fun, safe, and engaging.
        </motion.p>
      </motion.div>

      {/* Programs */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
        variants={containerVariants}
      >
        {programs.map((program) => (
          <motion.div
            key={program.id}
            className="relative rounded-2xl overflow-hidden group"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Glow Background */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, rgba(255,255,255,0.12), rgba(0,0,0,0.25))`,
                filter: "blur(30px)",
                transform: "scale(1.15)",
              }}
            ></div>

            {/* Glassmorphic Card */}
            <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl flex flex-col h-full overflow-hidden shadow-lg shadow-black/40 p-6">
              <div className="flex flex-col flex-1">
                <h4 className="cardTitle py-3 font-bold mb-3 text-lg text-orange-300">
                  {program.title}
                </h4>
                <div className="text-sm text-gray-50 mb-4 flex flex-wrap gap-2">
                  <span className="bg-orange-400/50 backdrop-blur-lg shadow-md px-3 py-1 rounded-sm">
                    {program.age}
                  </span>
                  <span className="bg-blue-400/50 backdrop-blur-lg shadow-md px-3 py-1 rounded-sm">
                    {program.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  {program.description}
                </p>
                <ul className="text-sm text-gray-200 flex-1 space-y-1">
                  {program.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2 py-1">
                      <FaCircleCheck className="text-orange-400" />
                      {topic}
                    </li>
                  ))}
                </ul>
                {program.link ? (
                  <motion.a
                    href={program.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 text-white font-semibold py-2 px-4 rounded-lg transition text-center block"
                    style={{
                      backgroundColor:
                        "rgba(243, 155, 22, 0.55) backdrop-blur-lg shadow-md",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Enroll Now
                  </motion.a>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 text-white font-semibold py-2 px-4 rounded-lg transition"
                    style={{
                      backgroundColor:
                        "rgba(243, 155, 22, 0.55) backdrop-blur-lg shadow-md",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Enroll Now
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials Carousel */}
      <motion.div
        className="mt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <h3 className="text-center text-2xl font-semibold mb-6 text-orange-300">
          What Kids Say
        </h3>
        <div className="overflow-hidden relative max-w-4xl mx-auto">
          <motion.div
            className="flex"
            variants={carouselVariants}
            animate="animate"
            style={{ width: "200%", willChange: "transform" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="min-w-[300px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 mx-3 shadow-md"
                variants={carouselItemVariants}
              >
                <p className="text-body text-sm mb-2">{testimonial.quote}</p>
                <div className="testimonial-author text-xs text-gray-300">
                  <strong>{testimonial.name}</strong> ({testimonial.age} yrs)
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center w-10/12 mx-auto mt-16"
        variants={ctaVariants}
        initial="hidden"
        whileInView="visible"
      >
        <h3 className="text-2xl font-semibold mb-4 text-orange-300">
          Ready to Get Started?
        </h3>
        <p className="max-w-lg mx-auto text-gray-300 mb-6">
          Give your child the digital skills they need for the future. Limited
          spots available for our next session.
        </p>
        <motion.div
          className="flex w-10/12 mx-auto flex-col md:flex-row justify-center  gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="https://sbtyacedemy.com/assessment"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="btn btn-primary bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white font-semibold py-2 px-4 rounded-sm shadow-md inline-block text-center"
          >
            Take Assessment
          </motion.a>
          <motion.a
            href="https://sbtyacedemy.com/courses"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="btn btn-outline border border-2-white hover:bg-white/10 transition-colors duration-300 text-white font-semibold py-2 px-4 rounded-sm shadow-md inline-block text-center"
          >
            View All Courses
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default KidsAcademy;
