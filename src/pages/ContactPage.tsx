import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/ui/AnimatedSection';

const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="Contact Us - Qbrain Team | Get in Touch with Our Technology Team"
        description="Contact Qbrain Team for inquiries about joining our elite B.Tech technology team, partnerships, or technical support. WhatsApp, email, and contact form available."
        keywords="contact qbrain, join tech team, qbrain inquiries, BWU technology team, hackathon team contact"
        url="https://qbrain.in/contact"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24">
          <AnimatedSection animation="fadeIn">
            <Contact />
          </AnimatedSection>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;