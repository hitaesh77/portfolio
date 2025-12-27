'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, FileText, ChevronRight, Cpu, Code2, Layers, Binary } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = ['About', 'Experience', 'Projects', 'Tech Stack', 'Resume', 'Contact'];

  const socialLinks = [
    { icon: <Github size={18} />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Mail size={18} />, href: "mailto:hitaesh.sara@gmail.com", label: "Email" }
  ];

  const experience = [
    {
      role: "Software Engineer (Part-Time)",
      org: "Kyron Medical",
      period: "2025 — Present",
      bullets: [
        "Leading eClinicalWorks EHR integration with Next.js, tRPC, and TypeScript.",
        "Architected automated PHI sync pipeline reducing manual data entry by 90%.",
        "Implementing HIPAA-compliant data workflows for healthcare denial appeals."
      ]
    },
    {
      role: "Software Engineering Intern",
      org: "Penske Truck Leasing",
      period: "Summer 2025",
      bullets: [
        "Developed fullstack vehicle inspection app for 50K+ trucks.",
        "Built responsive Angular UI and implemented Java Spring Boot RESTful APIs.",
        "Projected annual savings of 6,000+ hours through automation."
      ]
    },
    {
      role: "Undergraduate TA",
      org: "ECE 270: Digital System Design",
      period: "2025 — Present",
      bullets: [
        "Mentoring 40+ students in SystemVerilog and FPGA prototyping.",
        "Guiding debugging for synchronous design and complex HDL issues."
      ]
    }
  ];

  const projects = [
    {
      name: "Volos",
      desc: "Low-latency C++ options Greeks calculator with Python bindings. 11µs hotpath latency.",
      tags: ["C++", "Python", "GCP"],
    },
    {
      name: "USB 1.1 Transceiver",
      desc: "Full Speed bulk transfer endpoint with AHB interface for 100 MHz SoC.",
      tags: ["SystemVerilog", "RTL"],
    },
    {
      name: "Snipden",
      desc: "AI snippet manager with natural language search via OpenAI embeddings.",
      tags: ["Next.js", "OpenAI"],
    },
    {
      name: "Smart Safe Box",
      desc: "STM32-based digital safe with custom FSM and modular firmware.",
      tags: ["Embedded C", "STM32"],
    }
  ];

  const stack = [
    { category: "Languages", items: ["C", "C++", "SystemVerilog", "Python", "Java", "TypeScript"] },
    { category: "Frameworks", items: ["Next.js", "React", "FastAPI", "Spring Boot", "tRPC"] },
    { category: "Hardware", items: ["RTL Design", "FPGA", "AHB/APB", "STM32", "QuestaSim"] },
    { category: "Tools", items: ["Docker", "AWS", "GCP", "PostgreSQL", "Git"] }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#888] font-sans selection:bg-white selection:text-black antialiased">
      <div className={`max-w-2xl mx-auto pt-20 pb-24 px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* Left-Aligned Hero Section */}
        <header className="mb-12">
          <div className="w-16 h-16 rounded-xl overflow-hidden mb-6 border border-[#1a1a1a] grayscale">
            <img 
              src="https://i.imgur.com/TqVZQZ6.png" 
              alt="Hitaesh" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-medium text-white tracking-tight mb-2">
            Hitaesh Saravanarajan
          </h1>
          <p className="text-[15px] text-[#d1d1d1] mb-2">
            Computer Engineering at Purdue University
          </p>
          <p className="text-[14px] leading-relaxed max-w-lg mb-6 opacity-70">
            Building software, systems, and hardware. Focused on low-level C, FPGA architecture, and performance-focused infrastructure.
          </p>
          
          <div className="flex gap-5">
            {socialLinks.map((link, i) => (
              <a 
                key={i}
                href={link.href}
                className="text-[#555] hover:text-white transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </header>

        {/* Static Tab Navigation - Integrated with background */}
        <nav className="mb-12 border-b border-[#161616]">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] font-medium transition-all duration-200 relative whitespace-nowrap ${
                  activeTab === tab ? 'text-white' : 'hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white animate-in fade-in zoom-in-95" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <div className="min-h-[300px]">
          {activeTab === 'About' && (
            <section className="animate-in fade-in duration-500 space-y-5 text-[14px] leading-relaxed">
              <p>
                I'm a Junior at <span className="text-white">Purdue University</span> (GPA 3.82). 
                I specialize in bridging the gap between hardware constraints and software performance.
              </p>
              <p>
                My background spans from architecting <span className="text-white">HIPAA-compliant</span> backend systems 
                to designing <span className="text-white">RTL peripherals</span> for custom SoCs. I thrive in environments 
                where every clock cycle and byte of memory matters.
              </p>
              <p>
                Currently researching GPU architectures and serving as a TA for digital logic, focusing on 
                SystemVerilog and synchronous design principles.
              </p>
            </section>
          )}

          {activeTab === 'Experience' && (
            <section className="animate-in fade-in duration-500 space-y-10">
              {experience.map((exp, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-white text-[14px] font-medium">{exp.role}</h3>
                    <span className="text-[11px] font-mono opacity-40">{exp.period}</span>
                  </div>
                  <p className="text-[13px] text-[#555] mb-3">{exp.org}</p>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="text-[13px] leading-relaxed flex gap-3">
                        <span className="text-[#262626]">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {activeTab === 'Projects' && (
            <section className="animate-in fade-in duration-500 grid grid-cols-1 gap-6">
              {projects.map((project, i) => (
                <div key={i} className="group flex justify-between items-start gap-4 p-4 rounded-xl hover:bg-[#111] border border-transparent hover:border-[#1a1a1a] transition-all">
                  <div>
                    <h3 className="text-white text-[14px] font-medium mb-1">{project.name}</h3>
                    <p className="text-[13px] leading-relaxed mb-3 opacity-70">{project.desc}</p>
                    <div className="flex gap-2">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] text-[#555] font-mono uppercase tracking-tight">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
              ))}
            </section>
          )}

          {activeTab === 'Tech Stack' && (
            <section className="animate-in fade-in duration-500 space-y-8">
              {stack.map((group, i) => (
                <div key={i}>
                  <h4 className="text-[11px] font-semibold text-[#444] uppercase tracking-[0.2em] mb-4">{group.category}</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {group.items.map((item, j) => (
                      <span key={j} className="text-[13px] text-[#d1d1d1]">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {activeTab === 'Resume' && (
            <section className="animate-in fade-in duration-500 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="#" className="p-5 rounded-xl bg-[#111] border border-[#1a1a1a] hover:border-[#333] transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-[#555] group-hover:text-white transition-colors" />
                  <span className="text-white text-[13px]">Software Resume</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
              </a>
              <a href="#" className="p-5 rounded-xl bg-[#111] border border-[#1a1a1a] hover:border-[#333] transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Cpu size={18} className="text-[#555] group-hover:text-white transition-colors" />
                  <span className="text-white text-[13px]">Hardware Resume</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </section>
          )}

          {activeTab === 'Contact' && (
            <section className="animate-in fade-in duration-500 pt-8">
              <p className="text-[14px] mb-8 leading-relaxed max-w-sm">
                I'm currently looking for opportunities in systems, firmware, or backend infrastructure.
              </p>
              <a 
                href="mailto:hitaesh.sara@gmail.com"
                className="text-white text-[15px] font-medium border-b border-[#333] hover:border-white transition-all pb-1"
              >
                hitaesh.sara@gmail.com
              </a>
            </section>
          )}
        </div>

        <footer className="mt-32 pt-10 border-t border-[#161616] flex justify-between text-[11px] opacity-30">
          <p>© 2025 Hitaesh Saravanarajan</p>
          <p>Next.js + Tailwind</p>
        </footer>
      </div>
    </div>
  );
};

export default App;