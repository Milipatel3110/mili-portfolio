"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, BookOpen, ExternalLink } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: (
      <div>
        <p>Hi there! 👋 I'm Mili's AI assistant. I can help you learn about her skills, projects, and experience.</p>
        <p className="mt-2">Try asking me:</p>
        <ul className="mt-1 list-disc list-inside text-sm">
          <li>"What AI projects has she done?"</li>
          <li>"Show me her full-stack projects"</li>
          <li>"How can I learn DSA?"</li>
          <li>"What are her Generative AI skills?"</li>
        </ul>
      </div>
    ),
  },
];

// Learning Resources Database
const LEARNING_RESOURCES: Record<string, { name: string; url: string; description: string }[]> = {
  "dsa": [
    { name: "LeetCode", url: "https://leetcode.com", description: "Practice coding problems" },
    { name: "NeetCode", url: "https://neetcode.io", description: "Curated blind75 & patterns" },
    { name: "GeeksforGeeks", url: "https://geeksforgeeks.org", description: "DSA tutorials & practice" },
    { name: "Codeforces", url: "https://codeforces.com", description: "Competitive programming" },
  ],
  "generative ai": [
    { name: "DeepLearning.AI", url: "https://deeplearning.ai", description: "Andrew Ng's AI courses" },
    { name: "LangChain Docs", url: "https://js.langchain.com", description: "Build LLM apps" },
    { name: "Hugging Face", url: "https://huggingface.co", description: "AI models & datasets" },
    { name: "Prompt Engineering Guide", url: "https://promptengineering.org", description: "Learn prompt engineering" },
  ],
  "machine learning": [
    { name: "Coursera ML", url: "https://coursera.org/learn/machine-learning", description: "Andrew Ng's ML course" },
    { name: "Fast.ai", url: "https://fast.ai", description: "Practical deep learning" },
    { name: "Kaggle", url: "https://kaggle.com", description: "ML competitions & datasets" },
  ],
  "python": [
    { name: "Python.org", url: "https://docs.python.org/3", description: "Official Python docs" },
    { name: "Real Python", url: "https://realpython.com", description: "Python tutorials" },
  ],
  "web development": [
    { name: "Next.js Docs", url: "https://nextjs.org/docs", description: "React framework" },
    { name: "MDN Web Docs", url: "https://developer.mozilla.org", description: "Web technologies" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com", description: "CSS framework" },
  ],
  "computer vision": [
    { name: "OpenCV Python", url: "https://docs.opencv.org", description: "CV library" },
    { name: "PyTorch Vision", url: "https://pytorch.org/vision", description: "Vision models" },
  ],
  "database": [
    { name: "PostgreSQL Docs", url: "https://postgresql.org", description: "SQL database" },
    { name: "MongoDB University", url: "https://university.mongodb.com", description: "NoSQL database" },
  ],
};

// Project categories for filtering
const PROJECT_CATEGORIES = {
  "ai/ml": [
    {
      title: "Deepfake Anomaly Detection (Master's Thesis)",
      tech: "PyTorch, Computer Vision, OOD Detection",
      description: "Research on detecting deepfake facial images under distribution shift",
    },
    {
      title: "RAG-Based Knowledge Base System",
      tech: "LangChain, ChromaDB, OpenAI, Next.js",
      description: "Retrieval-Augmented Generation for intelligent document querying",
    },
    {
      title: "AI-Driven Crime Pattern Analysis",
      tech: "Python, Tableau, Power BI",
      description: "Analyzed 638,000+ crime records with visualizations",
    },
    {
      title: "Smart Attendance System",
      tech: "Raspberry Pi, OpenCV, Python",
      description: "Real-time face recognition for attendance automation",
    },
    {
      title: "AI-Based Object Detection on FPGA (ISRO)",
      tech: "YOLOv3, PYNQ FPGA",
      description: "Object detection with 30% latency reduction",
    },
  ],
  "full-stack": [
    {
      title: "Sarthak Group Tuition Website",
      tech: "Next.js, React, Node.js, MongoDB",
      description: "Full-featured tuition management platform with booking & payments",
    },
    {
      title: "Smart Inventory Management System",
      tech: "Streamlit, MySQL, Email Alerts",
      description: "Real-time dashboard with low-stock alerts & exports",
    },
  ],
  "data/bi": [
    {
      title: "AI-Driven Crime Pattern Analysis",
      tech: "Python, Tableau, Power BI",
      description: "638,000+ records analyzed with interactive dashboards",
    },
    {
      title: "Smart Inventory Management System",
      tech: "Streamlit, MySQL",
      description: "Data modeling with normalized schemas",
    },
  ],
  "hardware": [
    {
      title: "AI-Based Object Detection on FPGA (ISRO Funded)",
      tech: "YOLOv3, PYNQ FPGA, Raspberry Pi",
      description: "Edge AI with 30% latency reduction & 40% sync improvement",
    },
    {
      title: "Smart Attendance System",
      tech: "Raspberry Pi, OpenCV",
      description: "Real-time face recognition on edge devices",
    },
  ],
  "hackathon": [
    {
      title: "MineD Hackathon - Journal Rejection Predictor",
      tech: "Random Forest, Logistic Regression, Streamlit",
      description: "ML model to predict journal rejections (35% fewer revisions)",
    },
    {
      title: "HackInfinity - Real-Time Captioning",
      tech: "OpenCV, TensorFlow, Speech-to-Text",
      description: "Accessibility tool for hearing-impaired students",
    },
  ],
};

function findLearningResources(query: string): { name: string; url: string; description: string }[] | null {
  const q = query.toLowerCase();
  
  if (q.includes("dsa") || q.includes("algorithm") || q.includes("data structure")) {
    return LEARNING_RESOURCES["dsa"];
  }
  if (q.includes("generative ai") || q.includes("gai") || q.includes("llm") || q.includes("langchain") || q.includes("rag")) {
    return LEARNING_RESOURCES["generative ai"];
  }
  if (q.includes("machine learning") || q.includes("ml") || q.includes("deep learning")) {
    return LEARNING_RESOURCES["machine learning"];
  }
  if (q.includes("python")) {
    return LEARNING_RESOURCES["python"];
  }
  if (q.includes("web") || q.includes("react") || q.includes("nextjs") || q.includes("frontend") || q.includes("backend")) {
    return LEARNING_RESOURCES["web development"];
  }
  if (q.includes("computer vision") || q.includes("cv") || q.includes("opencv")) {
    return LEARNING_RESOURCES["computer vision"];
  }
  if (q.includes("database") || q.includes("sql") || q.includes("mysql") || q.includes("mongodb")) {
    return LEARNING_RESOURCES["database"];
  }
  
  return null;
}

function findProjects(query: string): { title: string; tech: string; description: string }[] | null {
  const q = query.toLowerCase();
  
  if (q.includes("ai") || q.includes("ml") || q.includes("machine learning") || q.includes("deep learning") || q.includes("anomaly") || q.includes("deepfake")) {
    return PROJECT_CATEGORIES["ai/ml"];
  }
  if (q.includes("full-stack") || q.includes("fullstack") || q.includes("web") || q.includes("tuition")) {
    return PROJECT_CATEGORIES["full-stack"];
  }
  if (q.includes("data") || q.includes("bi") || q.includes("analytics") || q.includes("dashboard") || q.includes("crime")) {
    return PROJECT_CATEGORIES["data/bi"];
  }
  if (q.includes("hardware") || q.includes("fpga") || q.includes("edge") || q.includes("raspberry")) {
    return PROJECT_CATEGORIES["hardware"];
  }
  if (q.includes("hackathon")) {
    return PROJECT_CATEGORIES["hackathon"];
  }
  if (q.includes("project")) {
    // Return all projects
    return [
      ...PROJECT_CATEGORIES["ai/ml"],
      ...PROJECT_CATEGORIES["full-stack"],
    ];
  }
  
  return null;
}

function ResourceLink({ name, url, description }: { name: string; url: string; description: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10"
    >
      <BookOpen className="h-4 w-4 text-sky-400" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{name}</div>
        <div className="text-xs text-[rgb(var(--muted))]">{description}</div>
      </div>
      <ExternalLink className="h-3 w-3 text-[rgb(var(--muted))]" />
    </a>
  );
}

function ProjectCard({ title, tech, description }: { title: string; tech: string; description: string }) {
  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-sky-400 mt-1">{tech}</div>
      <div className="text-xs text-[rgb(var(--muted))] mt-1">{description}</div>
    </div>
  );
}

function getRelevantAnswer(question: string): React.ReactNode {
  const q = question.toLowerCase();
  
  // Check for project-specific queries first
  const projects = findProjects(q);
  if (projects) {
    return (
      <div>
        <p className="mb-2">Here are Mili's {q.includes("ai") || q.includes("ml") ? "AI/ML" : q.includes("full") ? "Full-Stack" : q.includes("data") ? "Data" : q.includes("hardware") ? "Hardware" : q.includes("hackathon") ? "Hackathon" : ""} projects:</p>
        <div className="space-y-2">
          {projects.slice(0, 4).map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    );
  }
  
  // Check for learning resources
  const resources = findLearningResources(q);
  if (resources) {
    const topic = q.includes("dsa") ? "DSA" : q.includes("generative") || q.includes("llm") ? "Generative AI & LLMs" : q.includes("python") ? "Python" : q.includes("web") ? "Web Development" : q.includes("computer") ? "Computer Vision" : "the skill";
    return (
      <div>
        <p className="mb-2">Here are great resources to learn {topic}:</p>
        <div className="space-y-2">
          {resources.map((r, i) => (
            <ResourceLink key={i} {...r} />
          ))}
        </div>
      </div>
    );
  }
  
  // General knowledge base
  const KNOWLEDGE_BASE: Record<string, React.ReactNode> = {
    skills: (
      <div>
        <p className="mb-2">Mili has expertise in:</p>
        <div className="space-y-3">
          <div>
            <span className="text-purple-400 font-semibold">🎨 Generative AI & LLMs:</span>
            <span className="text-sm"> Generative AI, LLMs, LangChain, RAG Systems, Vector Databases, Prompt Engineering</span>
          </div>
          <div>
            <span className="text-sky-400 font-semibold">🤖 Machine Learning:</span>
            <span className="text-sm"> PyTorch, TensorFlow, Computer Vision, Deep Learning, NLP</span>
          </div>
          <div>
            <span className="text-emerald-400 font-semibold">💻 Programming:</span>
            <span className="text-sm"> Python (Expert), SQL, Java, C++, JavaScript/TypeScript</span>
          </div>
          <div>
            <span className="text-blue-400 font-semibold">🌐 Web/Frameworks:</span>
            <span className="text-sm"> Next.js, React, FastAPI, Flask, Node.js, Tailwind CSS</span>
          </div>
          <div>
            <span className="text-amber-400 font-semibold">🛠️ Tools:</span>
            <span className="text-sm"> Claude AI, GitHub Copilot, Docker, AWS, Linux</span>
          </div>
        </div>
        <p className="mt-2 text-sm">Try: "What AI projects has she done?" or "How can I learn Generative AI?"</p>
      </div>
    ),
    
    projects: (
      <div>
        <p className="mb-2">Mili has worked on notable projects:</p>
        <div className="space-y-2">
          <ProjectCard title="Deepfake Anomaly Detection (Thesis)" tech="PyTorch, CV, OOD Detection" description="Master's thesis on detecting deepfake facial images" />
          <ProjectCard title="RAG-Based Knowledge Base" tech="LangChain, ChromaDB, OpenAI" description="Retrieval-Augmented Generation system" />
          <ProjectCard title="Sarthak Group Tuition Website" tech="Next.js, React, MongoDB" description="Full-stack tuition management platform" />
          <ProjectCard title="Smart Inventory System" tech="Streamlit, MySQL" description="Real-time dashboard with alerts" />
        </div>
        <p className="mt-2 text-sm">Try: "Show me her AI projects" or "What full-stack projects has she done?"</p>
      </div>
    ),
    
    experience: (
      <div>
        <p>Mili's experience includes:</p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
          <li>Master's student at University of North Texas (2024-2026)</li>
          <li>ISRO Funded Project - AI-Based Object Detection on FPGA</li>
          <li>Full-stack development with Next.js, React, Node.js</li>
          <li>AI/ML development with PyTorch, TensorFlow, Computer Vision</li>
          <li>Multiple hackathon participations</li>
        </ul>
      </div>
    ),
    
    education: (
      <div>
        <p>Mili's education:</p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
          <li>Master's in Computer Science (AI/ML) - University of North Texas</li>
          <li>Bachelor's in Computer Engineering from Ahmedabad</li>
        </ul>
      </div>
    ),
    
    contact: (
      <div>
        <p>You can reach Mili through:</p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
          <li>Email: milipatel3110@gmail.com</li>
          <li>GitHub: github.com/Milipatel3110</li>
        </ul>
        <p className="mt-2 text-sm">Or use the contact form on this website!</p>
      </div>
    ),
    
    about: (
      <div>
        <p>Mili Patel is an AI/ML and Full-Stack Developer with expertise in building production features across backend, frontend, and AI-enabled workflows.</p>
        <p className="mt-2">She specializes in Generative AI, LLMs, RAG systems, machine learning, computer vision, and full-stack development. Currently pursuing her Master's at UNT.</p>
      </div>
    ),
  };
  
  if (q.includes("skill") || q.includes("tech") || q.includes("expert")) {
    return KNOWLEDGE_BASE.skills;
  }
  if (q.includes("project") || q.includes("work") || q.includes("built") || q.includes("developed")) {
    return KNOWLEDGE_BASE.projects;
  }
  if (q.includes("experience") || q.includes("job")) {
    return KNOWLEDGE_BASE.experience;
  }
  if (q.includes("education") || q.includes("degree") || q.includes("university") || q.includes("college")) {
    return KNOWLEDGE_BASE.education;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("linkedin")) {
    return KNOWLEDGE_BASE.contact;
  }
  if (q.includes("about") || q.includes("who") || q.includes("yourself") || q.includes("introduce")) {
    return KNOWLEDGE_BASE.about;
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! 👋 How can I help you today? Try asking about my projects, skills, or learning resources!";
  }
  if (q.includes("thank")) {
    return "You're welcome! 😊 Feel free to ask more questions!";
  }
  
  return (
    <div>
      <p>I can help you with:</p>
      <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
        <li>Skills & Expertise (try: "What are her AI skills?")</li>
        <li>Projects (try: "Show me her AI projects")</li>
        <li>Learning Resources (try: "How can I learn Generative AI?")</li>
        <li>Experience & Education</li>
        <li>Contact Information</li>
      </ul>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userContent = input.trim();
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userContent,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = getRelevantAnswer(userContent);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[rgba(78,155,255,1)] via-[rgba(120,119,198,1)] to-[rgba(255,91,193,1)] shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] flex flex-col rounded-3xl border border-white/20 bg-[rgb(var(--bg-primary))] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-[rgba(78,155,255,0.15)] via-[rgba(120,119,198,0.15)] to-[rgba(255,91,193,0.15)]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[rgba(78,155,255,1)] to-[rgba(255,91,193,1)] flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[rgb(var(--bg-primary))]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm">Mili&apos;s Assistant</h3>
                    <Sparkles className="h-3 w-3 text-amber-400" />
                  </div>
                  <p className="text-xs text-[rgb(var(--muted))]">AI powered • With learning resources</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-white/10 transition"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[rgba(78,155,255,1)] to-[rgba(120,119,198,1)] text-white"
                        : "bg-white/10 border border-white/10 text-[rgb(var(--foreground))]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-[rgb(var(--muted))] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-[rgb(var(--muted))] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-[rgb(var(--muted))] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about projects, skills, learning resources..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-[rgb(var(--muted))]"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="rounded-full p-1.5 bg-gradient-to-r from-[rgba(78,155,255,1)] to-[rgba(255,91,193,1)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
              <p className="text-[10px] text-center text-[rgb(var(--muted))] mt-2">
                Try: "What AI projects?" or "How to learn Generative AI?"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

