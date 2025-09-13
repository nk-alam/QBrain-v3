import React, { useState, useEffect } from 'react';
import { Heart, QrCode, CreditCard, Copy, Check, ArrowRight, Target, Users, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/ui/AnimatedSection';
import QRGenerator from '../components/QRGenerator';
import { getDonationSettings } from '../services/firebaseService';
import toast from 'react-hot-toast';

const DonatePage = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'paypal'>('upi');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getDonationSettings();
      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error('Error loading donation settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateUPIQR = (amount: number) => {
    const upiUrl = `upi://pay?pa=${settings.upiId}&pn=Qbrain Team&am=${amount}&cu=INR&tn=Donation for Qbrain Team Projects`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || Number(customAmount) || 0;
  };

  const handleDonate = () => {
    const amount = getCurrentAmount();
    if (amount < (settings?.minimumAmount || 100)) {
      toast.error(`Minimum donation amount is ₹${settings?.minimumAmount || 100}`);
      return;
    }

    if (paymentMethod === 'upi') {
      setShowQR(true);
    } else {
      // Redirect to PayPal
      const paypalUrl = `https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID&amount=${amount / 75}`; // Convert to USD
      window.open(paypalUrl, '_blank');
    }
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(settings.upiId);
    setCopied(true);
    toast.success('UPI ID copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

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

  if (!settings?.enabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Donations Currently Unavailable</h1>
              <p className="text-gray-400 mb-8">Thank you for your interest in supporting us. Donations are currently disabled.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Support Qbrain Team - Donate to Fund Innovation Projects"
        description="Support Qbrain Team's innovative technology projects. Your donations help us participate in hackathons and develop cutting-edge solutions."
        keywords="donate qbrain, support tech team, fund innovation, hackathon sponsorship, technology donations"
        url="https://qbrain.in/donate"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              
              {/* Page Header */}
              <AnimatedSection animation="fadeIn" className="text-center mb-16">
                <div className="relative inline-block mb-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                    {settings.title}
                  </h1>
                  <motion.div
                    className="absolute -top-4 -right-4"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Heart className="h-10 w-10 text-red-400" />
                  </motion.div>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  {settings.description}
                </p>
              </AnimatedSection>

              {/* Donation Goals */}
              {settings.donationGoals && settings.donationGoals.length > 0 && (
                <AnimatedSection animation="slideUp" className="mb-16">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Our Goals</h2>
                    <p className="text-gray-400 text-lg">Help us achieve these milestones</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {settings.donationGoals.map((goal: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 h-full">
                          <div className="flex items-center mb-4">
                            <Target className="h-6 w-6 text-cyan-400 mr-3" />
                            <h3 className="text-lg font-bold text-white">{goal.title}</h3>
                          </div>
                          <p className="text-gray-400 text-sm mb-4">{goal.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-400">₹{goal.raised.toLocaleString()}</span>
                              <span className="text-gray-400">₹{goal.amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-3">
                              <motion.div 
                                className="bg-gradient-to-r from-cyan-400 to-green-400 h-3 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((goal.raised / goal.amount) * 100, 100)}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            <div className="text-center text-sm text-cyan-400 mt-2 font-bold">
                              {Math.round((goal.raised / goal.amount) * 100)}% completed
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Donation Form */}
              <AnimatedSection animation="slideUp" className="max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/50 border border-pink-400/20 rounded-3xl p-8 backdrop-blur-sm">
                    
                    <div className="text-center mb-8">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="inline-block p-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mb-4"
                      >
                        <Heart className="h-12 w-12 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white mb-2">Make a Donation</h2>
                      <p className="text-gray-400">Every contribution helps us innovate and excel</p>
                    </div>

                    {/* Amount Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Select Amount
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {settings.suggestedAmounts.map((amount: number) => (
                          <button
                            key={amount}
                            onClick={() => handleAmountSelect(amount)}
                            className={`p-3 rounded-lg border transition-all duration-300 ${
                              selectedAmount === amount
                                ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                                : 'border-slate-600/50 bg-slate-700/30 text-gray-300 hover:border-slate-500/50'
                            }`}
                          >
                            ₹{amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Enter custom amount"
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          min={settings.minimumAmount}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          ₹
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Minimum amount: ₹{settings.minimumAmount}
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Payment Method
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          onClick={() => setPaymentMethod('upi')}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            paymentMethod === 'upi'
                              ? 'border-cyan-400 bg-cyan-400/10 text-white'
                              : 'border-slate-600/50 bg-slate-700/30 text-gray-300 hover:border-slate-500/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <QrCode className={`h-6 w-6 ${paymentMethod === 'upi' ? 'text-cyan-400' : 'text-gray-400'}`} />
                            <div className="text-left">
                              <div className="font-medium">UPI Payment</div>
                              <div className="text-sm text-gray-400">Scan QR or use UPI ID</div>
                            </div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => setPaymentMethod('paypal')}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            paymentMethod === 'paypal'
                              ? 'border-blue-400 bg-blue-400/10 text-white'
                              : 'border-slate-600/50 bg-slate-700/30 text-gray-300 hover:border-slate-500/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <CreditCard className={`h-6 w-6 ${paymentMethod === 'paypal' ? 'text-blue-400' : 'text-gray-400'}`} />
                            <div className="text-left">
                              <div className="font-medium">PayPal</div>
                              <div className="text-sm text-gray-400">International payments</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Donate Button */}
                    <motion.button
                      onClick={handleDonate}
                      disabled={getCurrentAmount() < (settings?.minimumAmount || 100)}
                      className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                        getCurrentAmount() >= (settings?.minimumAmount || 100)
                          ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white hover:shadow-lg hover:shadow-pink-400/25 transform hover:scale-105'
                          : 'bg-slate-700 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={getCurrentAmount() >= (settings?.minimumAmount || 100) ? { scale: 1.05 } : {}}
                      whileTap={getCurrentAmount() >= (settings?.minimumAmount || 100) ? { scale: 0.95 } : {}}
                    >
                      <span className="flex items-center justify-center">
                        <Heart className="h-5 w-5 mr-2" />
                        Donate ₹{getCurrentAmount().toLocaleString()}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </span>
                    </motion.button>
                  </div>
                </div>
              </AnimatedSection>

              {/* QR Code Modal */}
              {showQR && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-800 border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full text-center"
                  >
                    <div className="mb-6">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="inline-block p-4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-4"
                      >
                        <QrCode className="h-8 w-8 text-black" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">Scan to Pay</h3>
                      <p className="text-gray-400">₹{getCurrentAmount().toLocaleString()}</p>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="relative mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-2xl blur-xl animate-pulse"></div>
                      <QRGenerator
                        value={`upi://pay?pa=${settings.upiId}&pn=Qbrain Team&am=${getCurrentAmount()}&cu=INR&tn=Donation for Qbrain Team Projects`}
                        size={250}
                        className="mx-auto"
                      />
                    </motion.div>

                    <div className="mb-6">
                      <p className="text-gray-400 text-sm mb-2">Or use UPI ID:</p>
                      <div className="flex items-center justify-center space-x-2">
                        <code className="px-3 py-2 bg-slate-700/50 rounded text-cyan-400 font-mono">
                          {settings.upiId}
                        </code>
                        <button
                          onClick={copyUPIId}
                          className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setShowQR(false)}
                        className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setShowQR(false);
                          toast.success(settings.thankYouMessage);
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Impact Section */}
              <AnimatedSection animation="slideUp" className="mt-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Your Impact</h2>
                  <p className="text-gray-400 text-lg">See how your support makes a difference</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 border border-purple-400/20 rounded-2xl p-6 text-center">
                      <Lightbulb className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
                      <p className="text-gray-400 text-sm">Fund cutting-edge research and development</p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-2xl p-6 text-center">
                      <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Team Growth</h3>
                      <p className="text-gray-400 text-sm">Support team development and training</p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-teal-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 border border-green-400/20 rounded-2xl p-6 text-center">
                      <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Competition</h3>
                      <p className="text-gray-400 text-sm">Enable participation in major hackathons</p>
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

export default DonatePage;