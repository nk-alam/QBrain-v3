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
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValid, setIsValid] = useState(false);

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
    
    // Validate form
    validateForm(updatedData);
    
    onDataChange({ personalInfo: updatedData });
  };

  const validateForm = (data: typeof formData) => {
    const newErrors: {[key: string]: string} = {};
    
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(data.email)) newErrors.email = 'Invalid email format';
    if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!isValidPhone(data.phone)) newErrors.phone = 'Invalid phone format';
    if (!data.branch) newErrors.branch = 'Branch is required';
    if (!data.year) newErrors.year = 'Year is required';
    if (!data.college.trim()) newErrors.college = 'College is required';
    if (!data.preferredRole) newErrors.preferredRole = 'Preferred role is required';
    if (!data.motivation.trim()) newErrors.motivation = 'Motivation is required';
    
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
    
    // Pass validation status to parent
    onDataChange({ 
      personalInfo: data, 
      isValid: Object.keys(newErrors).length === 0 
    });
  };

  // Initial validation
  React.useEffect(() => {
    validateForm(formData);
  }, []);

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
              className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-1 focus:outline-none transition-all duration-300 ${
                errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-1 focus:outline-none transition-all duration-300 ${
                errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-1 focus:outline-none transition-all duration-300 ${
                errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
              placeholder="+91 9876543210"
              required
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-1 focus:outline-none transition-all duration-300 ${
                errors.college ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
              placeholder="BWU"
              required
            />
            {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college}</p>}
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:ring-1 focus:outline-none transition-all duration-300 ${
                errors.branch ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
              required
            >
              <option value="">Select your branch</option>
              {branches.map(branch => (
                <option key={branch} value={branch} className="bg-slate-700">
                  {branch}
                </option>
              ))}
            </select>
            {errors.branch && <p className="text-red-400 text-xs mt-1">{errors.branch}</p>}
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:ring-1 focus:outline-none transition-all duration-300 ${
                errors.year ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
              }`}
              required
            >
              <option value="">Select your year</option>
              {years.map(year => (
                <option key={year} value={year} className="bg-slate-700">
                  {year}
                </option>
              ))}
            </select>
            {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
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
          className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:ring-1 focus:outline-none transition-all duration-300 ${
            errors.preferredRole ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
          }`}
          required
        >
          <option value="">Select your preferred role</option>
          {roles.map(role => (
            <option key={role} value={role} className="bg-slate-700">
              {role}
            </option>
          ))}
        </select>
        {errors.preferredRole && <p className="text-red-400 text-xs mt-1">{errors.preferredRole}</p>}
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
          className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-1 focus:outline-none transition-all duration-300 ${
            errors.motivation ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400'
          }`}
          placeholder="Tell us about your passion for technology, hackathons, and what you hope to achieve with our team..."
          required
        />
        {errors.motivation && <p className="text-red-400 text-xs mt-1">{errors.motivation}</p>}
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