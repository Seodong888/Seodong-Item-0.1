import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function AuthAlertModal({ isOpen, onClose, message = "회원전용 메뉴 입니다. 로그인 부탁 드립니다." }: AuthAlertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
                <X className="w-10 h-10 text-red-600 stroke-[3px]" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">알림</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              {message}
            </p>

            <button
              onClick={onClose}
              className="mt-8 w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg"
            >
              확인
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
