export const navItems = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "additional-services", label: "Solutions" },
  { id: "KidsAcademy", label: "Kids Academy" },
  { id: "case-studies", label: "Case Studies" },
  { id: "tools", label: "Tools" },
];

export const services = [
  {
    title: "Cyber Attack Readiness",
    description:
      "Prepare your organization for cyber threats with comprehensive readiness programs.",
    points: [
      "Security posture assessments",
      "Simulated attack drills (penetration testing, phishing simulations)",
      "Incident response planning",
    ],
    img: "../../../security.jpg",
    link: "/services/cyber-attack-readiness",
    gradient: {
      colors: ["#FF6E14E6", "#0A3D62B3", "#00D8FFCC"],
    },
  },
  {
    title: "Managed IT Services",
    description:
      "End-to-end managed IT — support, security, cloud, and infrastructure under one roof.",
    points: [
      "24/7 monitoring & helpdesk support",
      "Cybersecurity, cloud & network management",
      "Backup, continuity & disaster recovery",
    ],
    img: "../../../managedItService.jpg",
    link: "/services/managed-it",
    gradient: {
      colors: ["#00D8FFE6", "#FF6E14B3", "#0A3D62CC"],
    },
  },
  // Hidden for now — keep in code for easy restore later
  {
    title: "Cyber Security Consulting",
    description: "Secure your systems with tailored consulting strategies.",
    points: [
      "Threat modeling",
      "Security architecture design",
      "Compliance & governance",
    ],
    img: "../../../consulting.jpg",
    link: "/services/cyber-security-consulting",
    gradient: {
      colors: ["#00D8FFE6", "#FF6E14B3", "#0A3D62CC"],
    },
    hidden: true,
  },
  {
    title: "AI Implementation",
    description:
      "Integrate AI into your workflows for automation and innovation.",
    points: [
      "AI workflow design",
      "Custom AI model training",
      "System integration",
    ],
    img: "../../../aiAutomation.jpeg",
    link: "/services/ai-implementation",
    gradient: {
      colors: ["#0A3D62E6", "#00D8FFB3", "#FF6E14CC"],
    },
  },
];
