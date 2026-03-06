import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-600 text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-xl font-bold">사고보상 정책 안내</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    1. 200% 책임 보상제도
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    SD의아이템에서 '안전보증' 마크가 부착된 매물을 구매한 후, 판매자의 귀책사유(계정 회수 등)로 인해 피해가 발생할 경우 거래 금액의 200%를 보상해 드립니다.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    2. 보상 범위 및 조건
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
                    <li>SD의아이템 내 전자 계약 시스템을 통해 완료된 거래</li>
                    <li>판매자의 고의적인 계정 회수 및 비밀번호 변경</li>
                    <li>판매자가 등록한 정보와 실제 정보가 현저히 다른 경우</li>
                    <li>거래 완료 후 1년 이내 발생한 사고에 대해 보장</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    3. 보상 제외 대상
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
                    <li>SD의아이템 외부(카카오톡 등)에서 진행된 직거래</li>
                    <li>구매자의 과실로 인한 계정 정지 또는 분실</li>
                    <li>게임사 정책 변경으로 인한 계정 제재</li>
                    <li>증빙 서류(사건 접수 확인서 등)가 미비한 경우</li>
                  </ul>
                </section>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-blue-800 text-sm font-medium leading-relaxed">
                    SD의아이템은 모든 거래에 대해 엄격한 본인 인증과 전자 계약 시스템을 적용하고 있습니다. 안심하고 거래하세요!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all"
              >
                확인하였습니다
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
