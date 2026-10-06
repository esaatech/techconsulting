import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import heroImage from "/public/managedItPageHero.jpeg";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";
import { IoCloudUpload } from "react-icons/io5";
import { FaNetworkWired, FaServer } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

function ManagedItServices() {
  const benefits = [
    {
      item: "Proactive Support — we monitor and maintain your systems around the clock to prevent downtime",
    },
    {
      item: "Security First — every service is built with protection for your data, users, and reputation",
    },
    {
      item: "Single Point of Contact — one trusted partner for all your IT needs",
    },
    {
      item: "Predictable Costs — clear, fixed-fee plans that make IT budgeting simple",
    },
    {
      item: "Scalable Solutions — services that grow with your business, from small teams to multi-site operations",
    },
  ];

  const services = [
    {
      title: "Managed IT Support & Helpdesk",
      description:
        "Remote and on-site support, 24/7 monitoring, patch management, asset tracking, and user onboarding — so your team stays productive every day.",
      icon: <BiSupport />,
    },
    {
      title: "Cybersecurity & Data Protection",
      description:
        "Endpoint protection, email security, MFA, vulnerability remediation, and security awareness guidance to protect your business from evolving threats.",
      icon: <MdSecurity />,
    },
    {
      title: "Cloud Services (Microsoft 365 / Azure)",
      description:
        "Setup, migration, administration, cloud backup, and identity management across Microsoft 365 and Azure for flexible, resilient operations.",
      icon: <IoCloudUpload />,
    },
    {
      title: "Network & Infrastructure",
      description:
        "Firewalls, VPNs, Wi-Fi, secure remote access, and end-to-end network design so your people stay connected securely.",
      icon: <FaNetworkWired />,
    },
    {
      title: "Backup, Continuity & Disaster Recovery",
      description:
        "Automated backups, business continuity planning, and tested disaster recovery so downtime and data loss don't put you at risk.",
      icon: <FaServer />,
    },
    {
      title: "IT Consulting & Projects",
      description:
        "Technology roadmaps, migrations, procurement, vendor coordination, and compliance support aligned to your business goals.",
      icon: <HiOutlineDocumentSearch />,
    },
  ];

  const engagementModels = [
    {
      title: "Fully Managed IT",
      description:
        "A complete outsourced IT department. We manage support, security, cloud, and infrastructure for a predictable monthly fee.",
    },
    {
      title: "Co-Managed IT",
      description:
        "We work alongside your existing IT staff, adding specialist skills, tools, and capacity where you need them most.",
    },
    {
      title: "Project-Based",
      description:
        "Defined-scope engagements such as cloud migration, network upgrades, or security projects — delivered to an agreed timeline.",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Discovery",
      description:
        "We assess your current systems, understand your goals, and identify priorities and risks.",
    },
    {
      step: "2",
      title: "Proposal",
      description:
        "We present a tailored service plan with clear scope, deliverables, and transparent pricing.",
    },
    {
      step: "3",
      title: "Onboarding",
      description:
        "We document your environment, deploy our tools, and secure your systems.",
    },
    {
      step: "4",
      title: "Ongoing Management",
      description:
        "We monitor, maintain, support, and continuously improve your IT.",
    },
    {
      step: "5",
      title: "Review",
      description:
        "We meet regularly to review performance, plan ahead, and align with your business.",
    },
  ];

  return (
    <div className="pageContainer w-full">
      {/* HERO */}
      <div
        className="pageHero w-full bg-cover bg-center bg-no-repeat flex items-center mx-auto"
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
              <span className="text-orange-500">Reliable. Secure.</span> Always
              On.
            </h1>
            <p className="text-xl text-orange-100 mt-3">
              SBTCONSULT delivers managed IT services that keep your systems
              secure, reliable, and cost-effective — so you can focus on your
              business while we keep the technology running.
            </p>
            <div className="buttons mt-16 w-10/12 md:w-full mx-auto flex flex-col md:flex-col lg:flex-row sm:flex-row items-center gap-4 justify-center">
              <button className="primaryButton">BOOK A FREE CONSULTATION</button>
              <Link to="/discovery" className="secondaryButton">
                START DISCOVERY
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="sectionWhy w-full bg-[#020814] text-white py-4 lg:py-16">
        <div className="whySectionWrapper w-11/12 px-4 lg:px-16 mx-auto">
          <div className="whyContent py-4 lg:py-24 flex flex-col lg:flex-row gap-12">
            <motion.div
              className="left flex-1 flex justify-center items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="leftContent">
                <img
                  src={heroImage}
                  alt="Managed IT Services"
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
                <h2 className="text-2xl text-center lg:text-left lg:text-4xl font-semibold mb-3">
                  Why Managed IT with SBTCONSULT
                </h2>
                <p className="text-lg text-blue-50 leading-relaxed text-justify hyphens-auto mb-8">
                  We act as an extension of your team — designing, deploying, and
                  managing the systems your business depends on. Our approach is
                  proactive rather than reactive: we monitor, maintain, and
                  secure your environment continuously.
                </p>
                <p className="text-xl text-orange-100 mb-4">
                  Choosing SBTCONSULT means:
                </p>
                <div className="benefits">
                  {benefits.map((item, idx) => (
                    <div
                      key={idx}
                      className="benefit flex items-center gap-4 py-2 text-lg"
                    >
                      <div className="icon text-orange-500">
                        <IoIosCheckmarkCircle />
                      </div>
                      <p className="text-blue-100">{item.item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="processSection w-full bg-[#020814] text-white py-4 lg:py-16">
        <div className="processWrapper w-11/12 px-4 lg:px-16 mx-auto">
          <div className="processContent w-full justify-center flex flex-col gap-12 mx-auto">
            <div className="titleContent mx-auto">
              <h2 className="text-2xl text-center lg:text-4xl font-semibold mb-3">
                Our Managed IT Services
              </h2>
              <p className="text-orange-100 text-center lg:w-6/12 mx-auto">
                End-to-end IT under one roof — tailored to cover everything
                below, or a specific subset based on your needs.
              </p>
            </div>

            <div className="cards w-full mx-auto lg:mt-12">
              <div className="cardContents w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((serviceItem, idx) => (
                  <motion.div
                    key={idx}
                    className="group [perspective:1000px]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                  >
                    <div
                      className="card bg-[#0A3D62] rounded-md min-h-[350px]
                        transition-all duration-500
                        hover:[transform:rotateY(-10deg)]
                        hover:shadow-lg hover:bg-[#0A3D62]/50
                        hover:shadow-black/30
                        [transform-style:preserve-3d]"
                    >
                      <div className="cardContent flex flex-col justify-center w-full p-5 py-8">
                        <div className="icon mx-auto text-orange-400 text-6xl text-center py-3 mb-4">
                          {serviceItem.icon}
                        </div>
                        <h3 className="text-xl lg:text-2xl lg:px-8 font-bold text-center mb-4">
                          {serviceItem.title}
                        </h3>
                        <p className="text-center text-orange-100">
                          {serviceItem.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ENGAGEMENT MODELS */}
      <div className="w-full bg-[#020814] text-white py-4 lg:py-16">
        <div className="w-11/12 px-4 lg:px-16 mx-auto">
          <div className="titleContent mx-auto mb-12">
            <h2 className="text-2xl text-center lg:text-4xl font-semibold mb-3">
              Flexible Engagement Models
            </h2>
            <p className="text-orange-100 text-center lg:w-6/12 mx-auto">
              Service models to suit different needs and budgets — all tailored
              following our discovery process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg shadow-black/40"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="text-orange-400 text-4xl mb-4">
                  <TbDeviceDesktopAnalytics />
                </div>
                <h3 className="text-xl font-bold mb-3 text-tertiary">
                  {model.title}
                </h3>
                <p className="text-sm text-gray-300">{model.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW WE ENGAGE */}
      <div className="w-full bg-[#020814] text-white py-4 lg:py-16">
        <div className="w-11/12 px-4 lg:px-16 mx-auto">
          <div className="titleContent mx-auto mb-12">
            <h2 className="text-2xl text-center lg:text-4xl font-semibold mb-3">
              How We Engage
            </h2>
            <p className="text-orange-100 text-center lg:w-6/12 mx-auto">
              Getting started is straightforward. Our process is designed to
              understand your environment thoroughly and deliver value quickly.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                className="text-center p-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full bg-[#020814] text-white py-4 lg:py-16">
        <motion.div
          className="cta py-8 flex flex-col justify-center w-full mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="ctaContent flex flex-col justify-center text-center mx-auto">
            <div className="font-bold text-2xl">
              Ready to Make Your IT Reliable and Worry-Free?
            </div>
            <p className="text-center text-blue-100 mt-2 max-w-xl mx-auto">
              Let&apos;s talk about your environment and show you how managed IT
              can protect, support, and scale with your business.
            </p>
            <button className="mt-6 bg-orange-500 px-3 py-3 rounded-sm mx-auto text-lg w-[300px] hover:bg-orange-600 transition-300">
              SCHEDULE A CONSULTATION
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ManagedItServices;
