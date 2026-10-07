import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HeroSection from "./components/home/HeroSection";
import CoreServices from "./components/home/CoreServices";
import AdditionalServices from "./components/home/AdditionalServices";
import CaseStudies from "./components/home/CaseStudies";
import KidsAcademy from "./components/home/KidsAcademy";
import ToolsResources from "./components/home/ToolsResources";
import CTAstrip from "./components/home/CTAstrip";
import Footer from "./components/home/Footer";
import ContactModal from "./components/ContactModal";
import HeaderNavigation from "./components/HeaderNavigation";
import Home from "./pages/Home";
import CyberAttackReadiness from "./pages/CyberAttackReadiness";
import CyberSecurityConsulting from "./pages/CyberSecurityConsulting";
import ManagedItServices from "./pages/ManagedItServices";
import Discovery from "./pages/Discovery";
import CyberAssessment from "./pages/CyberAssessment";
import AiImplementation from "./pages/AiImplementation";
import ItConsulting from "./pages/ItConsulting";
import ProjectManagementTraining from "./pages/ProjectManagementTraining";
import DevOpsCourses from "./pages/DevOpsCourses";
import DigitalTransformation from "./pages/DigitalTransformation";
import CloudMigration from "./pages/CloudMigration";
import WebsiteDesign from "./pages/WebsiteDesign";

function App() {
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
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/services/cyber-attack-readiness"
          element={<CyberAttackReadiness />}
        />
        <Route
          path="/services/cyber-security-consulting"
          element={<CyberSecurityConsulting />}
        />
        <Route path="/services/managed-it" element={<ManagedItServices />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/cyber-assessment" element={<CyberAssessment />} />
        <Route
          path="/services/ai-implementation"
          element={<AiImplementation />}
        />
        <Route path="/services/it-consulting" element={<ItConsulting />} />
        <Route
          path="/services/project-management-training"
          element={<ProjectManagementTraining />}
        />
        <Route path="/services/devops-courses" element={<DevOpsCourses />} />
        <Route
          path="/services/digital-transformation"
          element={<DigitalTransformation />}
        />
        <Route path="/services/cloud-migration" element={<CloudMigration />} />
        <Route path="/services/website-design" element={<WebsiteDesign />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
