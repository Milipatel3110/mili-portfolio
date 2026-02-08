export type Project = {
    title: string;
    subtitle: string;
    dates: string;
    org?: string;
    tech: string[];
    highlights: string[];
    links?: { github?: string; demo?: string };
    featured?: boolean;
  };
  
  export const PROJECTS: Project[] = [
    {
      title: "Deepfake Anomaly Detection (Thesis)",
      subtitle: "Flagship research: anomaly detection for deepfake facial images",
      dates: "2024 – 2026",
      tech: ["Python", "Deep Learning", "Computer Vision", "OOD/Anomaly Detection"],
      highlights: [
        "Master’s thesis focused on detecting anomalies in deepfake facial imagery under distribution shift.",
        "Research-driven evaluation, robust experimentation, and reproducible pipelines.",
      ],
      featured: true,
    },
    {
      title: "Smart Inventory Management System",
      subtitle: "Real-time retail dashboard + low-stock alerts",
      dates: "Apr 2025 – May 2025",
      org: "University of North Texas",
      tech: ["Streamlit", "MySQL", "Email Alerts", "Dashboards"],
      highlights: [
        "Built a full-stack solution with real-time dashboards and low-stock email notifications.",
        "Designed normalized schemas with indexes/triggers; role-based access; export to Excel/PDF.",
      ],
    },
    {
      title: "AI-Driven Crime Pattern Analysis",
      subtitle: "Data visualization + insights",
      dates: "Mar 2025 – Apr 2025",
      org: "University of North Texas",
      tech: ["Python", "Tableau", "Power BI", "Data Modeling"],
      highlights: [
        "Analyzed 638,000+ U.S. crime records; built dashboards for hotspots, weapon trends, outcomes.",
        "Cleaned and modeled data; delivered state/weapon/demographic insights.",
      ],
    },
    {
      title: "Smart Attendance System",
      subtitle: "Face recognition + student engagement",
      dates: "Jan 2025 – Apr 2025",
      org: "University of North Texas",
      tech: ["Raspberry Pi", "OpenCV", "Python"],
      highlights: [
        "Built a Raspberry Pi + OpenCV pipeline for real-time recognition and automated attendance.",
        "Optimized for low latency and added engagement metrics from live classroom feeds.",
      ],
    },
    {
      title: "AI-Based Object Detection on FPGA (Funded/ISRO)",
      subtitle: "YOLOv3 inference acceleration on PYNQ FPGA",
      dates: "Aug 2023 – Dec 2023",
      org: "Ahmedabad",
      tech: ["YOLOv3", "PYNQ FPGA", "Raspberry Pi", "Edge AI"],
      highlights: [
        "Implemented YOLOv3 inference on PYNQ FPGA; reduced end-to-end latency by 30%.",
        "Designed Raspberry Pi + motor-controller network; improved synchronization by 40%.",
      ],
    },
    {
      title: "MineD Hackathon",
      subtitle: "Journal rejection predictor + formatting feedback",
      dates: "Mar 2023",
      org: "Nirma University",
      tech: ["Random Forest", "Logistic Regression", "Streamlit"],
      highlights: [
        "Built a classifier to flag likely rejections; reduced manual revisions by 35%.",
        "Shipped a Streamlit prototype highlighting formatting issues in real time.",
      ],
    },
    {
      title: "HackInfinity (EdTech)",
      subtitle: "Real-time captioning + translation",
      dates: "Feb 2023",
      org: "DAIICT, Gandhinagar",
      tech: ["OpenCV", "TensorFlow", "Speech-to-Text", "Translation"],
      highlights: [
        "Designed an accessibility tool for students with hearing/language impairments.",
        "Integrated speech-to-text + multilingual translation for live support.",
      ],
    },
  ];
  