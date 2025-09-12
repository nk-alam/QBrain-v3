import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { sanitizeInput, isValidEmail, isValidPhone } from '../utils/security';

interface ApplicationFormProps {
  onDataChange: (data: any) => void;
  data: any;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onDataChange, data }) => {
  const [formData, setFormData] = useState({
    fullName: data.personalInfo?.fullName || '',
    email: data.personalInfo?.email || '',
    phone: data.personalInfo?.phone || '',
    branch: data.personalInfo?.branch || '',
    year: data.personalInfo?.year || '',
    college: data.personalInfo?.college || 'BWU',
    preferredRole: data.personalInfo?.preferredRole || '',
    experience: data.personalInfo?.experience || '',
    motivation: data.personalInfo?.motivation || ''
  });

  const branches = [
    'Computer Science Engineering',
    'Computer Science (AI & Robotics)',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Other'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const roles = [
    'Team Leader & App Developer',
    'Hardware & Circuit Designer',
    'Embedded/IoT Specialist',
    'AI/ML Engineer',
    'Networking/Communication Specialist',
    'UI/UX & Testing Engineer'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    // Additional validation for specific fields
    if (name === 'email' && sanitizedValue && !isValidEmail(sanitizedValue)) {
      // Don't update if email format is invalid (but allow partial typing)
      if (sanitizedValue.includes('@') && !sanitizedValue.endsWith('@')) {
        return;
      }
    }
    
    if (name === 'phone' && sanitizedValue && !isValidPhone(sanitizedValue)) {
      // Only allow numbers, +, -, (, ), and spaces for phone
      const phoneRegex = /^[\d\+\-\(\)\s]*$/;
      if (!phoneRegex.test(sanitizedValue)) {
        return;
      }
    }
    
    const updatedData = { ...formData, [name]: sanitizedValue };
    setFormData(updatedData);
    onDataChange({ personalInfo: updatedData });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
              placeholder="+91 9876543210"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            College *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
              placeholder="BWU"
              required
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Branch/Stream *
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
              required
            >
              <option value="">Select your branch</option>
              {branches.map(branch => (
                <option key={branch} value={branch} className="bg-slate-700">
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Year *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
              required
            >
              <option value="">Select your year</option>
              {years.map(year => (
                <option key={year} value={year} className="bg-slate-700">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Role Preference */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Preferred Role *
        </label>
        <select
          name="preferredRole"
          value={formData.preferredRole}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
          required
        >
          <option value="">Select your preferred role</option>
          {roles.map(role => (
            <option key={role} value={role} className="bg-slate-700">
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Experience */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Relevant Experience & Skills
        </label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
          placeholder="Describe your technical skills, projects, internships, or relevant experience..."
        />
      </div>

      {/* Motivation */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Why do you want to join Qbrain? *
        </label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
          placeholder="Tell us about your passion for technology, hackathons, and what you hope to achieve with our team..."
          required
        />
      </div>

      {/* Terms */}
      <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 text-cyan-400 border-slate-600 rounded focus:ring-cyan-400 focus:ring-offset-0"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
            I confirm that all information provided is accurate and I understand that:
            <ul className="mt-2 space-y-1 text-xs text-gray-400">
              <li>• I commit to participating in team projects and hackathons</li>
              <li>• I will maintain high standards of technical excellence</li>
              <li>• I understand the time commitment required for success</li>
              <li>• I agree to the team's code of conduct and values</li>
            </ul>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;