import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SliderProps {
  slides: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
    badge?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  }>;
  autoplay?: boolean;
  effect?: 'slide' | 'fade';
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  autoplay = true,
  effect = 'slide',
  showNavigation = true,
  showPagination = true,
  className = ''
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={showNavigation ? {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        } : false}
        pagination={showPagination ? {
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/30 !w-3 !h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-cyan-400'
        } : false}
        autoplay={autoplay ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false}
        effect={effect}
        fadeEffect={{
          crossFade: true
        }}
        loop={true}
        className="w-full h-full rounded-3xl overflow-hidden !mx-0"
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full min-h-[400px] flex items-center justify-center">
              {/* Background Image */}
              {slide.image && (
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
                </div>
              )}
              
              {/* Content */}
              <div className="relative z-10 text-center px-6 sm:px-12 max-w-4xl mx-auto">
                {slide.badge && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-green-400/20 border border-cyan-400/30 rounded-full backdrop-blur-sm mb-6"
                  >
                    <span className="text-sm font-bold text-cyan-400">{slide.badge}</span>
                  </motion.div>
                )}
                
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                >
                  {slide.title}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
                >
                  {slide.description}
                </motion.p>
                
                {slide.action && (
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={slide.action.onClick}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105"
                  >
                    {slide.action.label}
                  </motion.button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      {showNavigation && (
        <>
          <button
            ref={prevRef}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            ref={nextRef}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;