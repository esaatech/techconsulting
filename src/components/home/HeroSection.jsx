import React, { useState } from "react";
import { motion } from "framer-motion"; // ✅ fix import (was motion/react)
import heroBg from "../../../public/heroBg.png";
import cyberImage from "../../../public/cyberImage.png";
import automationImage from "../../../public/automationImage.png";
import consultingImage from "../../../public/consultingImage.png";
import ContactModal from "../ContactModal"; // ✅ fix import path

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalTab, setContactModalTab] = useState("message");

  const openContactModal = (tab = "message") => {
    setContactModalTab(tab);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <section
      className="hero-section bg-cover w-full min-h-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="w-[90%] mx-auto py-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        <motion.div
          className="heroLeft w-full lg:w-1/2 md:w-full flex flex-col items-start justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="content flex flex-col justify-center py-4 lg:py-46">
            <h1 className="text-3xl sm:text-center lg:text-left md:text-6xl text-white font-bold leading-[1.2]">
              Your Partner in Cyber Readiness, Security, and AI Transformation
            </h1>
            <p className="text-[12px] sm:text-center md:text-left md:text-lg text-blue-100 mt-6">
              We combine proactive defense strategies, expert consulting, and
              cutting-edge AI innovation to protect your business and accelerate
              your digital transformation journey.
            </p>
            <div className="buttons w-full mx-auto flex flex-col md:flex-col lg:flex-row sm:flex-row items-start sm:items-center gap-4 mt-8">
              {/* ✅ Fixed: Button now opens modal */}
              <button
                onClick={() => openContactModal("appointment")}
                className="bg-orange-500 w-full lg:w-fit text-center text-white px-3 md:px-6 py-3 rounded-sm hover:bg-orange-600 transition-colors duration-300 text-lg font-semibold"
              >
                BOOK A FREE CONSULTATION
              </button>
              <button className="bg-white w-full lg:w-fit text-center px-3 md:px-6 py-3 rounded-sm hover:bg-blue-100 transition-colors duration-300 text-lg font-bold"
                style={{ 
                  color: '#1E40AF',
                  fontWeight: '700'
                }}
              >
                ASSESS YOUR CYBER READINESS
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <div className="heroRight py-16 flex flex-col items-center lg:items-end gap-6">
          {/* Top Image */}
          <motion.div
            className="cyber"
            initial={{ opacity: 0, y: 20, scale: 1 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
              opacity: { duration: 1 },
            }}
          >
            <img src={cyberImage} alt="Cyber Attack Readiness" />
          </motion.div>

          {/* Bottom Images */}
          <div className="bottom flex gap-6">
            <motion.div
              className="ai"
              initial={{ opacity: 0, y: 20, scale: 1 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                y: {
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
                scale: {
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
                opacity: { duration: 1, delay: 0.2 },
              }}
            >
              <img src={automationImage} alt="AI Automations" />
            </motion.div>

            <motion.div
              className="ai"
              initial={{ opacity: 0, y: 20, scale: 1 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                y: {
                  duration: 2.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
                scale: {
                  duration: 2.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
                opacity: { duration: 1, delay: 0.4 },
              }}
            >
              <img src={consultingImage} alt="Consulting" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ✅ Contact Modal injected here */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        initialTab={contactModalTab}
      />
    </section>
  );
};

export default HeroSection;
