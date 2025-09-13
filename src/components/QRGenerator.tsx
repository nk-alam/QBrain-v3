import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';

interface QRGeneratorProps {
  value: string;
  size?: number;
  className?: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ 
  value, 
  size = 300, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [value, size]);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        duration: 0.8
      }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(0, 212, 255, 0.3)',
            '0 0 40px rgba(57, 255, 20, 0.4)',
            '0 0 20px rgba(0, 212, 255, 0.3)'
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="rounded-2xl overflow-hidden bg-white p-4"
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>
      
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-4 border-gradient-to-r from-cyan-400 to-green-400"
        animate={{ 
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: 'linear-gradient(45deg, #00D4FF, #39FF14, #00D4FF)',
          padding: '4px',
          borderRadius: '16px'
        }}
      >
        <div className="w-full h-full bg-white rounded-xl"></div>
      </motion.div>
    </motion.div>
  );
};

export default QRGenerator;