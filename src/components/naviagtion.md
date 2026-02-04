import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import "./Navigation.css";

const Navigation = () => {
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isContactModalOpen, setIsContactModalOpen] = useState(false);
const [isTrainingDropdownOpen, setIsTrainingDropdownOpen] = useState(false);

useEffect(() => {
const handleScroll = () => {
setIsScrolled(window.scrollY > 50);
};

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };

}, []);

const scrollToSection = (sectionId) => {
const element = document.getElementById(sectionId);
if (element) {
element.scrollIntoView({ behavior: "smooth" });
}
setIsMobileMenuOpen(false);
setIsTrainingDropdownOpen(false);
};

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
id: "kids-academy",
label: "SBTY Academy Young Learners Growing Coding Skills",
},
{ id: "project-management", label: "IT Project Management Training" },
{ id: "scrum-master", label: "Scrum Master Training" },
{ id: "business-analysis", label: "Business Analysis Training" },
{ id: "data-analytics", label: "Data Analytics & Sciences Training" },
];

return (
<>
<nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
<div className="nav-container container">
<a
href="#home"
className="nav-logo"
onClick={(e) => {
e.preventDefault();
scrollToSection("home");
}} >
Tech Consulting Pro
</a>

          <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Training Dropdown */}
            <div className="nav-dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() =>
                  setIsTrainingDropdownOpen(!isTrainingDropdownOpen)
                }
                onMouseEnter={() =>
                  window.innerWidth > 768 && setIsTrainingDropdownOpen(true)
                }
              >
                Training
                <span className="dropdown-arrow">▼</span>
              </button>
              <div
                className={`dropdown-menu ${
                  isTrainingDropdownOpen ? "active" : ""
                }`}
                onMouseEnter={() =>
                  window.innerWidth > 768 && setIsTrainingDropdownOpen(true)
                }
                onMouseLeave={() =>
                  window.innerWidth > 768 && setIsTrainingDropdownOpen(false)
                }
              >
                {trainingItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                      setIsTrainingDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <button
              className="nav-cta"
              onClick={() => setIsContactModalOpen(true)}
            >
              Contact Us
            </button>
          </div>

          <div
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>

);
};

export default Navigation;
