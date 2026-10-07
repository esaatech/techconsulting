import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import heroImage from "/public/cyberReadinessPageHero.jpeg";
import { TbFolderSearch } from "react-icons/tb";
import { FaChess } from "react-icons/fa";
import { FaShieldVirus } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { RiFolderSettingsFill } from "react-icons/ri";
import ContactModal from "../components/ContactModal";

function CyberAttackReadiness() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openConsultation = () => setIsContactModalOpen(true);

  const process = [
    {
      title: "Risk Assessment & Vulnerability Scans",
      description:
        "We Identify weak spots in your systems and networks, uncovering the entry points attackers are most likely to exploit.",
      icon: <TbFolderSearch />,
    },
    {
      title: "Strategy Development & Policy Planning",
      description:
        "Next, We build a tailored strategy and clear response protocols - your custom playbook for dealing with threats",
      icon: <FaChess />,
    },
    {
      title: "Proactive Simulation & Penetration Testing",
      description:
        "Through red teaming and real-world simulations, we stress-test your defenses, to see how they hold up under pressure.",
      icon: <FaShieldVirus />,
    },
    {
      title: "Training & Awareness Programs",
      description:
        "Your people are your first line of defense. We deleiver practical training that helps employees recognize and respond to threats.",
      icon: <GoVideo />,
    },
    {
      title: "Incident Response  Drills & Review",
      description:
        "We run hands-on drills, then refine your playbooks, ensuring your team stays sharp and ready for any attack.",
      icon: <RiFolderSettingsFill />,
    },
  ];

  return (
    <div className="pageContainer w-full">
      {/* HERO */}
      <div
        className="pageHero w-full bg-cover bg-center bg-no-repeat flex items-center mx-auto "
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="heroBg w-full min-h-screen flex justify-center items-center bg-[#020814]/90">
          <motion.div
            className="pageHeroContent text-white text-center py-8 sm:w-11/12 md:max-w-9/12 lg:max-w-5/12 mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight text-center">
              <span className="text-orange-500">
                Prepare, Protect, Prevail:
              </span>{" "}
              Your Cyber Attack Readiness
            </h1>
            <p className="text-xl text-blue-100 mt-3">
              We equip your organization with proactive defenses, tested
              response strategies, and resilience against cyber threats.
            </p>
            <div className="buttons mt-16 w-10/12 md:w-full mx-auto flex flex-col md:flex-col lg:flex-row sm:flex-row items-center gap-4 justify-center">
              <Link to="/cyber-assessment" className="primaryButton">
                START YOUR ASSESSMENT
              </Link>
              <button
                type="button"
                className="secondaryButton"
                onClick={openConsultation}
              >
                SCHEDULE A CONSULTATION
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="sectionWhy w-full bg-[#020814] text-white py-4 lg:py-16 ">
        <div className="whySectionWrapper w-11/12 px-4 lg:px-16 mx-auto">
          <div className="whyContent py-4 lg:py-24 flex flex-col lg:flex-row gap-12">
            <motion.div
              className="left flex-1 flex justify-center items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="leftContent ">
                <img
                  src={heroImage}
                  alt="Cyber Attack Readiness Consult"
                  className="rounded-md hidden lg:block object-cover shadow-lg shadow-black/40"
                />
              </div>
            </motion.div>
            <motion.div
              className="right flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="rightContent">
                <h2 className="text-2xl text-center lg:text-left lg:text-4xl font-semibold mb-6 ">
                  Why Cyber Attack Readiness Matters
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed text-justify hyphens-auto mb-8">
                  Cyberattacks are no longer a question of if—but when. From
                  ransomware to phishing and data breaches, threats are constant
                  and evolving. The organizations that suffer the most are the
                  ones that wait until it’s too late. Cyber Attack Readiness
                  gives you the edge. It ensures your business can stay online,
                  protect customer trust, and meet compliance standards—even
                  under attack. Without it, you risk downtime, lost revenue,
                  reputational damage, and costly penalties. Preparation isn’t
                  just about technology; it’s about people and processes. By
                  planning ahead, training your teams, and running simulations,
                  you turn potential chaos into a controlled, confident response
                  that keeps your business moving forward.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="processSection w-full bg-[#020814] text-white py-4 lg:py-16">
        <div className="processWrapper w-11/12 px-4 lg:px-16 mx-auto">
          <div className="processContent w-full justify-center flex flex-col gap-12 mx-auto">
            <div className="titleContent mx-auto">
              <h2 className="text-2xl text-center lg:text-left lg:text-4xl font-semibold mb-3 ">
                Our Cyber Readiness Process
              </h2>
              <p className="text-blue-200 text-center">
                A step-by-step approach to keep your business resilient against
                cyber threats
              </p>
            </div>

            <div className="cards w-full mx-auto mt-12">
              <div className="cardContents w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {process.map((processItem, idx) => (
                  <motion.div
                    key={idx}
                    className="group [perspective:1000px]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                  >
                    <div
                      className="card bg-blue-600 rounded-md min-h-[350px]
                        transition-all duration-500 
                        hover:[transform:rotateY(-10deg)] 
                        hover:shadow-lg hover:bg-blue-600/50 
                        hover:shadow-black/30 
                        [transform-style:preserve-3d]"
                    >
                      <div className="cardContent flex flex-col justify-center w-full p-5 py-8">
                        <div className="icon mx-auto text-6xl  text-center py-3 mb-4">
                          {processItem.icon}
                        </div>
                        <h3 className="text-xl lg:text-2xl lg:px-8 font-bold text-center mb-4">
                          {processItem.title}
                        </h3>
                        <p className=" text-center text-gray-200">
                          {processItem.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="cta py-16 flex flex-col justify-center w-full mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="ctaContent flex flex-col justify-center text-center mx-auto ">
                <p className="text-center text-blue-100">
                  Contact our Cyber Readiness Expert
                </p>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="mt-3 bg-orange-500 px-8 py-3 rounded-sm mx-auto text-lg w-[300px] hover:bg-orange-600 transition-300"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialTab="appointment"
      />
    </div>
  );
}

export default CyberAttackReadiness;
