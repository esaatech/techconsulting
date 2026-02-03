import React, { useState } from "react";
import { motion } from "framer-motion";
import { subscribeToNewsletter } from "../../services/newsletterService";
import "./Footer.css";

const Footer = ({ onOpenContactModal }) => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubscriptionStatus("error");
      setSubscriptionMessage("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus(null);
    setSubscriptionMessage("");

    try {
      await subscribeToNewsletter(email);
      setSubscriptionStatus("success");
      setSubscriptionMessage(
        "Successfully subscribed! Check your email for confirmation."
      );
      setEmail("");

      setTimeout(() => {
        setSubscriptionStatus(null);
        setSubscriptionMessage("");
      }, 5000);
    } catch (error) {
      setSubscriptionStatus("error");
      setSubscriptionMessage(error.message);

      setTimeout(() => {
        setSubscriptionStatus(null);
        setSubscriptionMessage("");
      }, 5000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <motion.footer
      id="contact"
      className="w-full bg-[#020814] text-white py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-secondary">
            SBTCONSULT
          </h3>
          <p className="text-sm text-gray-300">
            Your partner in cyber readiness, security, and AI transformation. We
            help organizations protect their assets and accelerate their digital
            journey.
          </p>
          <div className="flex gap-4 text-sm text-orange-400">
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="mailto:info@sbtconsult.com">Email</a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-tertiary">Services</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">Cyber Attack Readiness</a>
            </li>
            <li>
              <a href="#">Security Consulting</a>
            </li>
            <li>
              <a href="#">AI Implementation</a>
            </li>
            <li>
              <a href="#">IT Consulting</a>
            </li>
            <li>
              <a href="#">Training Programs</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-tertiary">
            Resources
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">Free Assessment</a>
            </li>
            <li>
              <a href="#">Security Guide</a>
            </li>
            <li>
              <a href="#">AI Checklist</a>
            </li>
            <li>
              <a href="#">Case Studies</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-tertiary">Contact</h4>
          <div className="text-sm text-gray-300 space-y-1">
            <p>📧 info@sbtconsult.com</p>
            <p>📞 +1 204 406 2247</p>
            <p>📞 +1 343 843 3159</p>
            <p>📍 1029L Manitoba Avenue, MB Canada</p>
          </div>
          <button
            className="mt-4 bg-orange-500/70 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg transition shadow-md"
            onClick={() => onOpenContactModal("appointment")}
          >
            Book a Free Consultation
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <h4 className="text-lg font-semibold text-secondary mb-2">
          Stay Updated
        </h4>
        <p className="text-sm text-gray-300 mb-4">
          Get the latest insights on cybersecurity and AI trends
        </p>
        <form
          className="flex flex-col sm:flex-row items-center text-white justify-center gap-4 bg-white/20 backdrop-blur-lg border border-white/20 rounded-lg p-4 shadow-lg shadow-black/40"
          onSubmit={handleNewsletterSubmit}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-2 rounded-lg text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribing}
          />
          <button
            type="submit"
            className="bg-orange-500/70 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg transition"
            disabled={isSubscribing}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {subscriptionMessage && (
          <div
            className={`mt-3 text-sm ${
              subscriptionStatus === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {subscriptionMessage}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
        <p>&copy; 2024 sbtconsult. All rights reserved.</p>
        <div className="flex gap-4 justify-center mt-2">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
