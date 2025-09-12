import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Award, Users, ArrowLeft, ExternalLink, Star } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getAchievementById } from '../services/firebaseService';

const AchievementDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchAchievement();
    }
  }, [id]);

  const fetchAchievement = async () => {
    if (!id) return;
    
    setLoading(true);
    const result = await getAchievementById(id);
    if (result.success) {
      setAchievement(result.data);
    }
    setLoading(false);
  };

  const handleBack = () => {
    navigate('/achievements');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading achievement details..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Achievement Not Found</h1>
              <p className="text-gray-400 mb-8">The achievement you're looking for doesn't exist.</p>
              <button
                onClick={handleBack}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Achievements</span>
              </button>
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
        title={`${achievement.title} - Qbrain Team Achievement`}
        description={achievement.description}
        keywords={`qbrain achievement, ${achievement.category}, ${achievement.technologies?.join(', ')}`}
        image={achievement.images?.[0]}
        url={`https://qbrain.in/achievements/${achievement.id}`}
      >
        {/* Achievement Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Achievement",
            "name": achievement.title,
            "description": achievement.description,
            "image": achievement.images?.[0],
            "dateAchieved": achievement.date?.toDate()?.toISOString(),
            "location": achievement.location,
            "award": achievement.position,
            "achiever": {
              "@type": "Organization",
              "name": "Qbrain Team"
            },
            "category": achievement.category
          })}
        </script>
      </SEOHead>
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Achievements</span>
              </button>

              {/* Achievement Header */}
              <div className="relative group mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-slate-800/50 border border-yellow-400/30 rounded-3xl p-8 backdrop-blur-sm">
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-4 py-2 text-sm rounded-full font-semibold ${
                      achievement.category === 'hackathon' ? 'bg-purple-400/20 text-purple-400' :
                      achievement.category === 'competition' ? 'bg-blue-400/20 text-blue-400' :
                      achievement.category === 'award' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-green-400/20 text-green-400'
                    }`}>
                      {achievement.category}
                    </span>
                    
                    {achievement.position && (
                      <div className="flex items-center text-yellow-400">
                        <Trophy className="h-6 w-6 mr-2" />
                        <span className="text-lg font-bold">{achievement.position}</span>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{achievement.title}</h1>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">{achievement.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {achievement.date && (
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-5 w-5 mr-3 text-cyan-400" />
                        <div>
                          <div className="text-sm text-gray-400">Date</div>
                          <div className="font-medium">{format(achievement.date.toDate(), 'MMMM dd, yyyy')}</div>
                        </div>
                      </div>
                    )}
                    
                    {achievement.location && (
                      <div className="flex items-center text-gray-300">
                        <MapPin className="h-5 w-5 mr-3 text-green-400" />
                        <div>
                          <div className="text-sm text-gray-400">Location</div>
                          <div className="font-medium">{achievement.location}</div>
                        </div>
                      </div>
                    )}
                    
                    {achievement.prize && (
                      <div className="flex items-center text-gray-300">
                        <Award className="h-5 w-5 mr-3 text-yellow-400" />
                        <div>
                          <div className="text-sm text-gray-400">Prize</div>
                          <div className="font-medium">{achievement.prize}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              {achievement.images && achievement.images.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                  
                  {/* Main Image */}
                  <div className="relative group mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-slate-800/30 border border-cyan-400/20 rounded-2xl overflow-hidden">
                      <img
                        src={achievement.images[selectedImageIndex]}
                        alt={`${achievement.title} - Image ${selectedImageIndex + 1}`}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  {achievement.images.length > 1 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                      {achievement.images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            selectedImageIndex === index 
                              ? 'border-cyan-400' 
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Details Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Team Members */}
                {achievement.teamMembers && achievement.teamMembers.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-green-400/5 rounded-xl blur-xl"></div>
                    <div className="relative bg-slate-800/30 border border-cyan-400/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-cyan-400" />
                        Team Members
                      </h3>
                      <div className="space-y-2">
                        {achievement.teamMembers.map((member: string, index: number) => (
                          <div key={index} className="flex items-center text-gray-300">
                            <Star className="h-3 w-3 mr-2 text-cyan-400" />
                            <span>{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {achievement.technologies && achievement.technologies.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-cyan-400/5 rounded-xl blur-xl"></div>
                    <div className="relative bg-slate-800/30 border border-green-400/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-green-400" />
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {achievement.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-slate-700/50 border border-green-400/20 rounded-lg text-sm text-gray-200 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Highlights */}
              {achievement.highlights && achievement.highlights.length > 0 && (
                <div className="relative group mb-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-xl blur-xl"></div>
                  <div className="relative bg-slate-800/30 border border-purple-400/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Key Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievement.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <Award className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <div className="text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Inspired by Our Achievements?</h3>
                    <p className="text-gray-400 mb-6">
                      Join our team and be part of the next breakthrough achievement in technology and innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        onClick={() => navigate('/join')}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Join Our Team
                      </motion.button>
                      <motion.button
                        onClick={() => navigate('/contact')}
                        className="px-8 py-4 border border-cyan-400/50 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Us
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AchievementDetailPage;