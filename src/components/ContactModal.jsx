import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";
import { submitContactForm } from "../services/contactService";
// import "../global.css";
import "./ContactModal.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa6";

const ContactModal = ({ isOpen, onClose, initialTab = "message" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Reset active tab when modal opens with new initialTab
  useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  // Load Calendly script when appointment tab is active
  useEffect(() => {
    if (activeTab === "appointment" && isOpen && !window.Calendly) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [activeTab, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContactForm(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });

      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Animations
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <motion.div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-secondary">Get in Touch</h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 flex  items-center justify-center rounded-full bg-orange-500/70">
                <FaPhoneAlt className="" />
              </span>
              <span>+1 204 406 2247</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 flex  items-center justify-center rounded-full bg-orange-500/70">
                <FaPhoneAlt className="" />
              </span>
              <span>+1 343 843 3159</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7  flex items-center justify-center rounded-full bg-orange-500/70">
                <MdEmail />
              </span>
              <span>info@sbtconsult.com</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "message"
                ? "bg-orange-500/70 text-white font-semibold"
                : "hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("message")}
          >
            <span className="flex items-center justify-center gap-2">
              <FaMessage />
              Send Message
            </span>
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "appointment"
                ? "bg-orange-500/70 text-white font-semibold"
                : "hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("appointment")}
          >
            <span className="flex items-center justify-center gap-2">
              <FaCalendarDay />
              Book Appointment
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* Message Form */}
          {activeTab === "message" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-400 rounded-lg text-green-300">
                  <FaCircleCheck />
                  <p>Thank you! We'll get back to you soon.</p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400 rounded-lg text-red-300">
                  ❌ <p>Failed to send. Please try again.</p>
                </div>
              )}

              <div>
                <label className="block mb-1 text-sm">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-md font-semibold text-white transition hover:scale-105"
                style={{
                  backgroundColor: "rgba(243, 155, 22, 0.55)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

          {/* Appointment */}
          {activeTab === "appointment" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-tertiary">
                Schedule a Consultation
              </h3>
              <p className="text-sm text-gray-200">
                Book a free 30-minute consultation to discuss your
                cybersecurity, AI implementation, or digital transformation
                needs.
              </p>

              <ul className="space-y-2 text-sm">
                {[
                  "Free 30-minute consultation",
                  "No obligation or pressure",
                  "Expert guidance and recommendations",
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaCircleCheck className="text-orange-400" /> {benefit}
                  </li>
                ))}
              </ul>

              <div className="calendly-embed-container">
                <div
                  className="calendly-inline-widget rounded-xl overflow-hidden"
                  data-url="https://calendly.com/esaatechnology/new-meeting"
                  style={{ minWidth: "320px", height: "600px" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactModal;
