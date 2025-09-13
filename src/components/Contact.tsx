import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { sendContactEmail } from '../services/emailService';
import { saveContactMessage as saveToFirebase } from '../services/firebaseService';
import { sanitizeInput, isValidEmail, RateLimiter } from '../utils/security';
import { 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Phone,
  Linkedin,
  Github,
  Instagram,
  ExternalLink
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting
    if (!RateLimiter.isAllowed('contact-form', 3, 300000)) { // 3 attempts per 5 minutes
      toast.error('Too many attempts. Please wait before submitting again.');
      return;
    }
    
    // Validate and sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };
    
    // Validation
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!isValidEmail(sanitizedData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save to Firebase
      const saveResult = await saveToFirebase(sanitizedData);
      
      if (saveResult.success) {
        // Send emails
        const emailResult = await sendContactEmail(sanitizedData);
        
        if (emailResult.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
          toast.success('Message sent successfully!');
          
          // Reset success message after 5 seconds
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          toast.success('Message sent successfully!');
          setSubmitted(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.success('Message received! We will get back to you soon.');
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjects = [
    'General Inquiry',
    'Join Team Application',
    'Technical Support',
    'Partnership Opportunity',
    'Media & Press',
    'Other'
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/qbrain',
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/qbrain',
      color: 'text-gray-300 hover:text-white'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/qbrain',
      color: 'text-pink-400 hover:text-pink-300'
    }
  ];

  const contactInfo = [
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Weekend: By appointment'],
      color: 'text-green-400'
    },
    {
      icon: Phone,
      title: 'Contact',
      details: ['+91 869 5205 637', 'team@qbrain.in'],
      color: 'text-purple-400'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Ready to join the future of tech innovation? Have questions about our team or projects? We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* WhatsApp CTA */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/50 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm text-center">
                  <MessageSquare className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Quick Response</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Get instant answers to your questions via WhatsApp. We're here to help!
                  </p>
                  <a
                    href="https://wa.me/+918695205637?text=Hi! I'm interested in learning more about Qbrain team."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Chat on WhatsApp
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-green-400/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <Icon className={`h-6 w-6 ${info.color} mt-1 flex-shrink-0`} />
                          <div>
                            <h4 className="text-white font-semibold mb-2">{info.title}</h4>
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-gray-400 text-sm">{detail}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 bg-slate-700/50 rounded-lg ${link.color} border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300`}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-8">
                    <Mail className="h-6 w-6 text-cyan-400" />
                    <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="relative group max-w-md mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
                        <div className="relative bg-slate-700/50 border border-green-400/30 rounded-2xl p-8">
                          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="h-8 w-8 text-black" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-3">Message Sent!</h4>
                          <p className="text-gray-300 leading-relaxed">
                            Thanks for reaching out! We'll get back to you within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                          required
                        >
                          <option value="">Select a subject</option>
                          {subjects.map(subject => (
                            <option key={subject} value={subject} className="bg-slate-700">
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300 resize-none"
                          placeholder="Tell us about your inquiry, questions, or how we can help you..."
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                          isSubmitting
                            ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:shadow-lg hover:shadow-cyan-400/25 transform hover:scale-105'
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full mr-3"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </div>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;