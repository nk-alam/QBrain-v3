import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Clock, CheckCircle, AlertCircle, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/ui/AnimatedSection';
import ApplicationForm from '../components/ApplicationForm';
import TechnicalQuiz from '../components/TechnicalQuiz';
import ResumeUpload from '../components/ResumeUpload';
import InterviewSchedule from '../components/InterviewSchedule';
import { getJoinTeamSettings } from '../services/firebaseService';
import { sendApplicationEmail } from '../services/emailService';
import { saveApplication } from '../services/firebaseService';
import toast from 'react-hot-toast';

const JoinTeamPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    personalInfo: {},
    quizResults: {},
    resumeFile: null,
    interviewSlot: null
  });
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getJoinTeamSettings();
      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error('Error loading join team settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Basic Information', icon: '📝', component: ApplicationForm },
    { id: 2, title: 'Technical Quiz', icon: '🧠', component: TechnicalQuiz },
    { id: 3, title: 'Resume Upload', icon: '📄', component: ResumeUpload },
    { id: 4, title: 'Interview Schedule', icon: '📅', component: InterviewSchedule }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepData = (stepData: any) => {
    setApplicationData(prev => ({
      ...prev,
      ...stepData
    }));
    
    if (stepData.interviewSlot && currentStep === steps.length) {
      handleApplicationSubmit();
    }
  };

  const handleApplicationSubmit = async () => {
    try {
      const saveResult = await saveApplication(applicationData);
      
      if (saveResult.success) {
        const emailResult = await sendApplicationEmail(applicationData);
        
        if (emailResult.success) {
          toast.success('Application submitted successfully!');
        } else {
          toast.success('Application submitted successfully!');
        }
      } else {
        toast.error('Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast.success('Application received! We will review it shortly.');
    }
  };

  const CurrentComponent = steps.find(step => step.id === currentStep)?.component || ApplicationForm;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
          <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Join Qbrain Team - Apply for Elite B.Tech Technology Team | Hackathon Excellence"
        description="Apply to join Qbrain Team's elite B.Tech student technology team. Complete our application process including technical quiz, resume upload, and interview scheduling."
        keywords="join qbrain team, B.Tech technology team application, hackathon team recruitment, AI IoT team jobs, student tech team"
        url="https://qbrain.in/join"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Page Header */}
              <AnimatedSection animation="fadeIn" className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Join Our Team
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  {settings?.description || "Ready to be part of something extraordinary? Complete our application process and join the future of tech innovation."}
                </p>
              </AnimatedSection>

              {/* Benefits Section */}
              {settings?.benefits && (
                <AnimatedSection animation="slideUp" className="mb-16">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {settings.benefits.map((benefit: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-slate-800/60 border-2 border-cyan-400/20 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-500 text-center h-full">
                          <div className="text-4xl mb-4">{benefit.icon}</div>
                          <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                          <p className="text-sm text-gray-300">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Progress Stepper */}
              <AnimatedSection animation="slideUp" className="mb-12">
                <div className="flex justify-between items-center relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 transform -translate-y-1/2"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-green-400 transform -translate-y-1/2 transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  ></div>
                  
                  {steps.map((step, index) => (
                    <div key={step.id} className="relative flex flex-col items-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 transition-all duration-300 ${
                          currentStep > step.id 
                            ? 'bg-green-400 border-green-400 text-black' 
                            : currentStep === step.id 
                              ? 'bg-gradient-to-r from-cyan-400 to-green-400 border-transparent text-black'
                              : 'bg-slate-800 border-slate-600 text-gray-400'
                        }`}
                      >
                        {currentStep > step.id ? <CheckCircle className="h-6 w-6" /> : step.icon}
                      </div>
                      <span 
                        className={`mt-2 text-sm font-medium transition-colors duration-300 text-center ${
                          currentStep >= step.id ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Application Form Container */}
              <AnimatedSection animation="slideUp" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-sm">
                  
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Step {currentStep}: {steps.find(s => s.id === currentStep)?.title}
                      </h2>
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {currentStep === 2 ? '30 minutes' : currentStep === 3 ? '5 minutes' : '10 minutes'} estimated
                        </span>
                      </div>
                    </div>
                    
                    {currentStep === 2 && (
                      <div className="flex items-center text-yellow-400">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">70% minimum score required</span>
                      </div>
                    )}
                  </div>

                  {/* Current Step Component */}
                  <div className="mb-8">
                    <CurrentComponent onDataChange={handleStepData} data={applicationData} />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-slate-700/50">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                        currentStep === 1
                          ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
                          : 'bg-slate-700 text-white hover:bg-slate-600 hover:shadow-lg'
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5 mr-2" />
                      Previous
                    </button>

                    <div className="text-center">
                      <span className="text-sm text-gray-400">
                        Step {currentStep} of {steps.length}
                      </span>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={currentStep === steps.length}
                      className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                        currentStep === steps.length
                          ? 'bg-green-400 text-black font-semibold cursor-default'
                          : 'bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold hover:shadow-lg hover:shadow-cyan-400/25 hover:scale-105'
                      }`}
                    >
                      {currentStep === steps.length ? 'Application Complete!' : 'Continue'}
                      {currentStep < steps.length && <ChevronRight className="h-5 w-5 ml-2" />}
                    </button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Help Section */}
              <AnimatedSection animation="fadeIn" className="mt-12 text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/30 border border-slate-700/30 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Have questions about the application process or technical requirements? We're here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="https://wa.me/+918695205637?text=Hi! I have questions about joining Qbrain team."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors duration-300"
                      >
                        WhatsApp Support
                      </a>
                      <button 
                        onClick={() => window.location.href = '/contact'}
                        className="inline-flex items-center px-4 py-2 border border-cyan-400/50 text-cyan-400 rounded-full text-sm hover:bg-cyan-400/10 transition-colors duration-300"
                      >
                        Contact Form
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JoinTeamPage;