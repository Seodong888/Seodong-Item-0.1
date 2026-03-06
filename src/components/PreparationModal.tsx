import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Construction } from 'lucide-react';

interface PreparationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreparationModal({ isOpen, onClose }: PreparationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 relative">
                <Construction className="w-10 h-10 text-orange-500" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-orange-200 rounded-full"
                />
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 mb-4">현재 준비중입니다.</h2>
              
              <p className="text-gray-500 leading-relaxed mb-10">
                더욱 정확하고 세련된 서비스를 제공하기 위해<br />
                열심히 준비하고 있습니다.<br />
                <span className="text-blue-600 font-bold mt-2 inline-block">조금만 더 기다려 주세요!</span>
              </p>

              <button
                onClick={onClose}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                확인
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
