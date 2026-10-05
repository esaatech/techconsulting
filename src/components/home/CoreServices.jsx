import React from "react";
import { motion } from "framer-motion";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "./CoreServices.css";
import { services } from "../../data";
import { Link } from "react-router-dom";

function CoreServices() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, duration: 0.8, ease: "easeOut" },
    },
  };

  const slideVariants = (direction) => ({
    hidden: {
      opacity: 0,
      x: direction === "left" ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  });

  return (
    <section className="py-12 lg:py-36 w-full text-white">
      {/* Section Header */}
      <div className="text-center w-11/12 mx-auto mb-12">
        <div className="titlewrap mb:16 lg:mb-24">
          <h2 className="title">Our Core Services</h2>
          <p className="description py-2 max-w-xl mx-auto">
            Comprehensive solutions to protect, secure, and transform your
            business
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.filter((service) => !service.hidden).map((service, i) => (
          <motion.div
            key={i}
            className="relative rounded-2xl overflow-hidden group"
            variants={slideVariants(i % 2 === 0 ? "left" : "right")}
            whileHover={{
              rotateX: -8,
              rotateY: 6,
              scale: 0.97,
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Radial gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, ${service.gradient.colors.join(
                  ", "
                )})`,
                filter: "blur(30px)",
                transform: "scale(1.15)",
              }}
            ></div>

            {/* Glassmorphism Card */}
            <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl flex flex-col h-full overflow-hidden shadow-lg shadow-black/40">
              {/* Image */}
              <div
                className="relative w-11/12 mx-auto my-6 rounded-xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow:
                    "inset 0 4px 12px rgba(255,255,255,0.1), inset 0 -4px 12px rgba(0,0,0,0.3)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-60 object-cover rounded-lg transform group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 py-3 px-6">
                <h3 className="cardTitle font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-gray-300 mb-4">
                  {service.description}
                </p>

                <ul className="text-sm text-gray-200 flex-1 space-y-2">
                  {service.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-white text-lg">
                        <IoIosCheckmarkCircle />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Glassy Button */}
                <button
                  className="mt-6 text-white font-semibold py-2 px-4 rounded-lg transition backdrop-blur-sm hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    textShadow: "0px 0px 6px rgba(0,0,0,0.4)",
                  }}
                >
                  <Link to={service.link}>Learn More</Link>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default CoreServices;
