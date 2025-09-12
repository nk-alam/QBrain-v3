import React from 'react';
import { Calendar, MapPin, Trophy, Award, Users, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface AchievementCardProps {
  achievement: any;
  onClick: () => void;
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-slate-800/50 border border-yellow-400/20 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group-hover:transform group-hover:scale-105 h-full">
        
        {/* Image Gallery */}
        {achievement.images && achievement.images.length > 0 && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={achievement.images[0]}
              alt={achievement.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {achievement.images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                +{achievement.images.length - 1} more
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
              achievement.category === 'hackathon' ? 'bg-purple-400/20 text-purple-400' :
              achievement.category === 'competition' ? 'bg-blue-400/20 text-blue-400' :
              achievement.category === 'award' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-green-400/20 text-green-400'
            }`}>
              {achievement.category}
            </span>
            
            {achievement.position && (
              <div className="flex items-center text-yellow-400">
                <Trophy className="h-4 w-4 mr-1" />
                <span className="text-sm font-semibold">{achievement.position}</span>
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
            {achievement.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{achievement.description}</p>
          
          <div className="space-y-2 mb-4">
            {achievement.date && (
              <div className="flex items-center text-gray-400 text-xs">
                <Calendar className="h-3 w-3 mr-2" />
                {format(achievement.date.toDate(), 'MMM dd, yyyy')}
              </div>
            )}
            
            {achievement.location && (
              <div className="flex items-center text-gray-400 text-xs">
                <MapPin className="h-3 w-3 mr-2" />
                {achievement.location}
              </div>
            )}
            
            {achievement.prize && (
              <div className="flex items-center text-green-400 text-xs">
                <Award className="h-3 w-3 mr-2" />
                {achievement.prize}
              </div>
            )}
          </div>
          
          {achievement.technologies && (
            <div className="flex flex-wrap gap-1 mb-4">
              {achievement.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
              {achievement.technologies.length > 3 && (
                <span className="px-2 py-1 bg-slate-700/50 text-xs text-cyan-400 rounded">
                  +{achievement.technologies.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              Click to learn more
            </div>
            <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
              <span className="text-sm font-medium mr-1">Learn More</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;