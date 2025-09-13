import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What is Qbrain and what do you do?",
      answer: "Qbrain is an elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions. We participate in hackathons, develop innovative projects, and create real-world technology solutions that solve complex problems."
    },
    {
      question: "How can I join the Qbrain team?",
      answer: "To join Qbrain, complete our application process which includes: filling out the application form, taking a technical quiz (70% minimum score required), uploading your resume, and scheduling an interview. The entire process is designed to identify passionate and skilled individuals."
    },
    {
      question: "What are the eligibility requirements?",
      answer: "We welcome B.Tech students from all streams who have strong academic performance, passion for technology and innovation, relevant technical skills for their chosen role, dedication to team goals, and availability for hackathons and competitions."
    },
    {
      question: "What roles are available in the team?",
      answer: "We have 6 specialized roles: Team Leader (App Development), Hardware & Circuit Designer, Embedded/IoT Specialist, AI/ML Engineer, Networking/Communication Specialist, and UI/UX & Testing Engineer. Each role has specific responsibilities and skill requirements."
    },
    {
      question: "Do team members receive any compensation?",
      answer: "Yes! Active team members receive a ₹500 monthly stipend along with other benefits including skill development opportunities, professional networking, career growth support, and hands-on experience with cutting-edge technologies."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with a wide range of technologies including AI/ML (Python, TensorFlow, PyTorch), IoT & Embedded Systems (Arduino, Raspberry Pi, ESP32), Mobile & Web Development (React, Node.js, React Native), Hardware Integration (PCB Design, 3D Printing), and Cloud Technologies."
    },
    {
      question: "How often does the team participate in hackathons?",
      answer: "We actively participate in major hackathons throughout the year, including national-level competitions like Smart India Hackathon (SIH). Our goal is to compete in 8-10 major hackathons annually and maintain our winning streak."
    },
    {
      question: "What was your biggest achievement so far?",
      answer: "Our flagship achievement is winning first place at AUAT Techfest 2025 with our AI-powered Smart Helmet project. This victory showcased our technical excellence and innovative problem-solving capabilities."
    },
    {
      question: "How long is the commitment period?",
      answer: "We expect a minimum commitment of one academic year to ensure project continuity and team cohesion. This allows sufficient time for skill development, project completion, and meaningful contribution to team goals."
    },
    {
      question: "Can I apply if I'm from a non-technical background?",
      answer: "While we primarily focus on technical roles, we welcome students from all branches who have developed relevant technical skills through self-learning, projects, or internships. Your passion and demonstrated skills matter more than your academic branch."
    },
    {
      question: "What is the interview process like?",
      answer: "The interview is a 30-minute technical discussion with our team leader covering: technical questions related to your chosen role, discussion about your projects and experience, questions about your motivation to join Qbrain, and overview of team culture and expectations."
    },
    {
      question: "How can I prepare for the technical quiz?",
      answer: "The quiz covers various domains including IoT, AI/ML, embedded systems, software development, and general technology concepts. Focus on fundamentals in your chosen area, review basic programming concepts, and stay updated with current technology trends."
    }
  ];

  return (
    <section className="py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400/10 to-green-400/10 border border-cyan-400/30 rounded-full backdrop-blur-sm mb-8">
              <HelpCircle className="h-5 w-5 text-cyan-400 mr-3" />
              <span className="text-base font-bold text-cyan-400">Frequently Asked Questions</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Got Questions?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Find answers to the most common questions about joining Qbrain and our team structure
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-green-400/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-xl backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
                  
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-cyan-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-slate-700/50 pt-4">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-slate-800/50 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-3">Still have questions?</h3>
                <p className="text-gray-400 mb-6">
                  Can't find the answer you're looking for? Our team is here to help you with any questions about joining Qbrain.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/+918695205637?text=Hi! I have questions about joining Qbrain team."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors duration-300"
                  >
                    WhatsApp Support
                  </a>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center px-6 py-3 border border-cyan-400/50 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-colors duration-300"
                  >
                    Contact Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;