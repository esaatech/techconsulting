import React, { useState, useEffect, useRef } from "react";
import { scroller } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import ContactModal from "./ContactModal";
import logo from "/esaaconsulting.svg";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTrainingDropdownOpen, setIsTrainingDropdownOpen] = useState(false);

  const hoverTimer = useRef(null);
  const scrollOffset = -120;

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "additional-services", label: "Solutions" },
    { id: "case-studies", label: "Case Studies" },
    { id: "tools", label: "Tools" },
  ];

  const trainingItems = [
    { id: "cyber-security", label: "Cyber Security & Compliance Training" },
    { id: "devops", label: "Professional DevOps Engineer Training" },
    {
      id: "KidsAcademy",
      label: "SBTY Academy Young Learners Growing Coding Skills",
    },
    { id: "project-management", label: "IT Project Management Training" },
    { id: "scrum-master", label: "Scrum Master Training" },
    { id: "business-analysis", label: "Business Analysis Training" },
    { id: "data-analytics", label: "Data Analytics & Sciences Training" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const openTraining = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsTrainingDropdownOpen(true);
  };

  const closeTrainingWithDelay = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setIsTrainingDropdownOpen(false);
    }, 120);
  };

  // Handle scrolling or routing first if needed
  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 200);
    } else {
      scrollToSection(id);
    }
    setMenuOpen(false);
    setIsTrainingDropdownOpen(false);
  };

  const scrollToSection = (id) => {
    scroller.scrollTo(id, {
      smooth: true,
      duration: 500,
      offset: scrollOffset,
    });
    setActive(id);
  };

  return (
    <>
      <div
        className={`navigation w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="navigation__wrapper flex justify-between items-center w-[90%] mx-auto py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div
            className="navigation__logo cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <img src={logo} alt="Logo" className="w-64" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex navigation__menu items-center gap-16">
            <div className="navs flex items-center gap-6 uppercase">
              {navItems.map((menu) => (
                <div
                  key={menu.id}
                  onClick={() => handleNavClick(menu.id)}
                  className={`cursor-pointer transition-colors duration-300 ${
                    active === menu.id
                      ? "text-blue-400 text-md font-semibold"
                      : "text-md text-navy-500 hover:text-blue-400"
                  }`}
                >
                  {menu.label}
                </div>
              ))}

              {/* Training Dropdown (Desktop) */}
              <div
                className="relative"
                onPointerEnter={openTraining}
                onPointerLeave={closeTrainingWithDelay}
              >
                <button
                  type="button"
                  className="cursor-pointer transition-colors duration-300 text-md text-navy-500 hover:text-blue-400 uppercase flex items-center gap-1"
                  onClick={() => setIsTrainingDropdownOpen((prev) => !prev)}
                  aria-haspopup="menu"
                  aria-expanded={isTrainingDropdownOpen}
                >
                  Training <span className="text-xs">▼</span>
                </button>

                <AnimatePresence>
                  {isTrainingDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-md py-2 w-72 z-50 pointer-events-auto"
                    >
                      {trainingItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className="block px-4 py-2 text-sm text-navy-500 hover:bg-gray-100 cursor-pointer"
                        >
                          {item.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="contact">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 text-md font-semibold cursor-pointer"
              >
                Contact us
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white shadow-lg px-6 py-4"
            >
              <div className="flex flex-col gap-4 uppercase">
                {navItems.map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => handleNavClick(menu.id)}
                    className={`cursor-pointer transition-colors duration-300 ${
                      active === menu.id
                        ? "text-blue-400 font-semibold"
                        : "text-navy-500 hover:text-blue-400"
                    }`}
                  >
                    {menu.label}
                  </div>
                ))}

                {/* Mobile Training Items */}
                <details>
                  <summary className="cursor-pointer text-navy-500 hover:text-blue-400">
                    Training
                  </summary>
                  <div className="flex flex-col mt-2">
                    {trainingItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="px-4 py-2 text-sm text-navy-500 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </details>

                <button
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 text-md font-semibold cursor-pointer text-center"
                >
                  Contact us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
