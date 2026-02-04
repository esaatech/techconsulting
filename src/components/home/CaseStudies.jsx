import React from "react";
import { motion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";
import "./CaseStudies.css";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      category: "Cyber Attack Readiness",
      title: "Financial Institution Breach Prevention",
      challenge:
        "A regional bank faced increasing cyber threats and needed to strengthen their security posture.",
      solution:
        "Implemented comprehensive security assessments, penetration testing, and incident response planning.",
      outcome:
        "Reduced security incidents by 85% and improved response time from 48 hours to 4 hours.",
      metrics: [
        "85% reduction in incidents",
        "4-hour response time",
        "100% compliance achieved",
      ],
    },
    {
      id: 2,
      category: "Cyber Security Consulting",
      title: "Healthcare Compliance Transformation",
      challenge:
        "A healthcare provider struggled with HIPAA compliance and security policy gaps.",
      solution:
        "Developed comprehensive security policies, staff training programs, and compliance frameworks.",
      outcome:
        "Achieved full HIPAA compliance and reduced audit findings by 90%.",
      metrics: [
        "100% HIPAA compliance",
        "90% audit improvement",
        "500+ staff trained",
      ],
    },
    {
      id: 3,
      category: "AI Implementation",
      title: "Intelligent Learning Management System",
      challenge:
        "An educational institution needed to modernize their LMS platform to reduce teacher workload and personalize student learning experiences.",
      solution:
        "Developed and integrated an AI-powered solution directly into their educational platform that automates quiz and assignment generation, provides intelligent grading capabilities, and adapts learning materials to each student's preferred learning pattern.",
      outcome:
        "Reduced teacher administrative time by 65%, improved student engagement by 50%, and increased learning outcomes through personalized content delivery.",
      metrics: [
        "65% reduction in grading time",
        "50% increase in student engagement",
        "Personalized learning paths for all students",
      ],
    },
  ];

  // Section animation
  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
  };

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="case-studies"
      className="py-12 lg:py-36 w-full overflow-x-hidden text-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ willChange: "opacity, transform" }}
    >
      {/* Header */}
      <motion.div
        className="text-center w-11/12 mx-auto mb-12"
        variants={cardVariants}
      >
        <h2 className="title mb-4 text-secondary">Success Stories</h2>
        <p className="description max-w-xl mx-auto text-body">
          Real results from our partnerships with organizations across
          industries
        </p>
      </motion.div>

      {/* Case Study Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
        variants={sectionVariants}
      >
        {caseStudies.map((study) => (
          <motion.div
            key={study.id}
            className="relative rounded-2xl overflow-hidden group"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Glow Background */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, rgba(255,255,255,0.1), rgba(0,0,0,0.2))`,
                filter: "blur(30px)",
                transform: "scale(1.15)",
              }}
            ></div>

            {/* Glassmorphic Card */}
            <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl flex flex-col h-full shadow-lg shadow-black/40 p-6">
              <div className="flex flex-col flex-1">
                <span className="text-xs uppercase tracking-wide bg-orange-500/70 backdrop-blur-lg shadow-md px-3 py-1 rounded-sm inline-block w-fit mb-3">
                  {study.category}
                </span>
                <h3 className="text-lg font-bold mb-4 text-tertiary">
                  {study.title}
                </h3>

                <div className="space-y-4 flex-1 py-2">
                  <div>
                    <h4 className="font-semibold">Challenge</h4>
                    <p className="text-sm text-gray-300">{study.challenge}</p>
                  </div>

                  <div className="py-2">
                    <h4 className="font-semibold">Solution</h4>
                    <p className="text-sm text-gray-300">{study.solution}</p>
                  </div>

                  <div className="py-2">
                    <h4 className="font-semibold">Outcome</h4>
                    <p className="text-sm text-gray-300">{study.outcome}</p>
                  </div>

                  <div className="py-2">
                    <h4 className="font-semibold">Key Metrics</h4>
                    <ul className="text-sm text-gray-200 space-y-1 mt-2">
                      {study.metrics.map((metric, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FaCircleCheck className="text-orange-400" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CaseStudies;
