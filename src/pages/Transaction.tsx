import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  FileText, 
  Key, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Lock,
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';
import Layout from '@/src/components/Layout';
import { MOCK_LISTINGS } from '@/src/mockData';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function Transaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = MOCK_LISTINGS.find(i => i.id === id) || MOCK_LISTINGS[0];
  
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">안전 거래 진행</h1>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              거래 번호: <span className="text-gray-900">#TRX-20240305-001</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-10" />
            <div 
              className="absolute top-5 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-500" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            
            <TransactionStep num={1} active={step >= 1} current={step === 1} label="결제" icon={<CreditCard className="w-5 h-5" />} />
            <TransactionStep num={2} active={step >= 2} current={step === 2} label="계약서 작성" icon={<FileText className="w-5 h-5" />} />
            <TransactionStep num={3} active={step >= 3} current={step === 3} label="정보 인수" icon={<Key className="w-5 h-5" />} />
            <TransactionStep num={4} active={step >= 4} current={step === 4} label="확정" icon={<CheckCircle2 className="w-5 h-5" />} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
            >
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">결제 수단 선택</h2>
                    <p className="text-sm text-gray-500">대금은 아이템팜 에스크로에 안전하게 예치됩니다.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <PaymentOption icon={<CreditCard className="w-5 h-5" />} title="계좌이체" desc="수수료 0원 / 즉시 확인" active />
                    <PaymentOption icon={<CreditCard className="w-5 h-5" />} title="마일리지" desc="보유: 1,200,000원" />
                    <PaymentOption icon={<CreditCard className="w-5 h-5" />} title="신용카드" desc="카드사별 무이자 할부" />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                      결제하신 대금은 판매자에게 바로 전달되지 않으며, 구매자가 '인수 확정'을 누르기 전까지 아이템팜이 안전하게 보관합니다.
                    </p>
                  </div>

                  <button 
                    onClick={nextStep}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all"
                  >
                    결제하기
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">전자 계약서 작성</h2>
                    <p className="text-sm text-gray-500">법적 효력이 있는 계약서를 작성합니다.</p>
                  </div>

                  <div className="space-y-4 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed">
                    <p className="font-bold text-gray-900 mb-2">[제 1조] 목적</p>
                    <p>본 계약은 판매자와 구매자 간의 게임 계정 및 아이템 거래에 관한 권리와 의무를 규정함을 목적으로 합니다.</p>
                    <p className="font-bold text-gray-900 mb-2">[제 2조] 보증 및 책임</p>
                    <p>판매자는 본 매물이 1대 본주임을 보증하며, 향후 계정 회수 등 문제 발생 시 거래 금액의 200%를 배상할 책임을 집니다.</p>
                    <p>판매자는 구매자의 원활한 이용을 위해 필요한 모든 정보를 성실히 제공해야 합니다.</p>
                    <p className="font-bold text-gray-900 mb-2">[제 3조] 분쟁 해결</p>
                    <p>본 계약과 관련하여 발생하는 분쟁은 아이템팜의 중재를 우선으로 하며, 해결되지 않을 경우 관할 법원의 판결에 따릅니다.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="성명" className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input type="text" placeholder="연락처" className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <button 
                    onClick={nextStep}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    카카오/PASS 전자 서명하기
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">계정 정보 인수</h2>
                    <p className="text-sm text-gray-500">판매자가 등록한 계정 정보를 확인하세요.</p>
                  </div>

                  <div className="bg-gray-900 rounded-2xl p-8 text-white space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-sm text-gray-400">아이디</span>
                      <span className="font-mono font-bold text-lg">itemfarm_user_01</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-sm text-gray-400">비밀번호</span>
                      <span className="font-mono font-bold text-lg">********</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">보안 코드</span>
                      <span className="font-mono font-bold text-lg">4582</span>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <p className="text-xs text-orange-800 leading-relaxed">
                      정보를 확인하신 후 즉시 비밀번호 및 보안 설정을 변경해 주세요. 
                      모든 변경이 완료된 후에만 '인수 확정'을 눌러주시기 바랍니다.
                    </p>
                  </div>

                  <button 
                    onClick={nextStep}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all"
                  >
                    정보 확인 및 변경 완료
                  </button>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">거래가 완료되었습니다!</h2>
                    <p className="text-sm text-gray-500">안전하게 거래를 마쳤습니다. 이용해 주셔서 감사합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="py-4 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      계약서 PDF 다운로드
                    </button>
                    <button 
                      onClick={() => navigate('/')}
                      className="py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all"
                    >
                      홈으로 이동
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar: Item Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-gray-900 mb-4">거래 매물 정보</h3>
              <div className="flex gap-4 mb-6">
                <img src={item.thumbnail} className="w-20 h-20 rounded-lg object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">{item.gameId.replace('-', ' ')}</p>
                  <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{item.title}</h4>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">상품 금액</span>
                  <span className="font-bold text-gray-900">{item.price.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">수수료</span>
                  <span className="text-blue-600 font-bold">0원</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">최종 결제 금액</span>
                  <span className="text-xl font-black text-blue-600">{item.price.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TransactionStep({ num, active, current, label, icon }: { num: number, active: boolean, current: boolean, label: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 relative z-10">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
        current ? "bg-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-50" : 
        active ? "bg-blue-100 text-blue-600" : "bg-white text-gray-300 border-2 border-gray-100"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-xs font-bold transition-all",
        current ? "text-blue-600" : active ? "text-gray-900" : "text-gray-300"
      )}>
        {label}
      </span>
    </div>
  );
}

function PaymentOption({ icon, title, desc, active = false }: { icon: React.ReactNode, title: string, desc: string, active?: boolean }) {
  return (
    <div className={cn(
      "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4",
      active ? "bg-blue-50 border-blue-600" : "bg-white border-gray-100 hover:border-blue-200"
    )}>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400")}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", active ? "bg-blue-600 border-blue-600" : "border-gray-200")}>
        {active && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
    </div>
  );
}
