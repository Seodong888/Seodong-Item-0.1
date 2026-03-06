import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  MessageCircle, 
  CreditCard, 
  Info, 
  User as UserIcon, 
  FileText, 
  Star,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import Layout from '@/src/components/Layout';
import SafetyBadge from '@/src/components/SafetyBadge';
import { MOCK_LISTINGS } from '@/src/mockData';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = MOCK_LISTINGS.find(i => i.id === id) || MOCK_LISTINGS[0];
  
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'detail' | 'seller' | 'contract'>('detail');

  const handlePurchase = () => {
    navigate(`/transaction/${item.id}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate(-1)} className="hover:text-gray-600 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> 뒤로가기
          </button>
          <span>/</span>
          <span>{item.gameId.replace('-', ' ')}</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">{item.server}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Slider */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="relative aspect-video bg-gray-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={item.images[activeImage]}
                    alt={`Screen ${activeImage + 1}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                <button 
                  onClick={() => setActiveImage(prev => (prev === 0 ? item.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveImage(prev => (prev === item.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
                  <Maximize2 className="w-3 h-3" />
                  {activeImage + 1} / {item.images.length}
                </div>
              </div>
              
              <div className="p-4 flex gap-2 overflow-x-auto">
                {item.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                      activeImage === idx ? "border-blue-600" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex border-b border-gray-100">
                <TabButton 
                  active={activeTab === 'detail'} 
                  onClick={() => setActiveTab('detail')}
                  icon={<Info className="w-4 h-4" />}
                  label="캐릭터 상세"
                />
                <TabButton 
                  active={activeTab === 'seller'} 
                  onClick={() => setActiveTab('seller')}
                  icon={<UserIcon className="w-4 h-4" />}
                  label="판매자 정보"
                />
                <TabButton 
                  active={activeTab === 'contract'} 
                  onClick={() => setActiveTab('contract')}
                  icon={<FileText className="w-4 h-4" />}
                  label="전자 계약 안내"
                />
              </div>
              
              <div className="p-8">
                {activeTab === 'detail' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <DetailItem label="레벨" value={`${item.level} Lv`} />
                      <DetailItem label="클래스" value={item.class} />
                      <DetailItem label="보유 재화" value={item.currency} />
                      <DetailItem label="서버" value={item.server} />
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-1 h-4 bg-blue-600 rounded-full" />
                        주요 장비
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.equipment.map((eq, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-100">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-1 h-4 bg-blue-600 rounded-full" />
                        보유 스킬
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((sk, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-bold text-gray-900 mb-4">판매자 한마디</h4>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'seller' && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-10 h-10 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{item.sellerName}</h3>
                          {item.isVerified && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100">
                              본인인증 완료
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-gray-900">{item.sellerRating}</span>
                            <span>평점</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-gray-900">{item.sellerTrades}</span>
                            <span>거래 횟수</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <SellerStat label="응답 속도" value="매우 빠름" />
                      <SellerStat label="평균 정산" value="30분 이내" />
                      <SellerStat label="사고 이력" value="없음" />
                    </div>
                  </div>
                )}

                {activeTab === 'contract' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        <div>
                          <h4 className="text-blue-900 font-bold mb-1">법적 효력이 있는 전자 계약서</h4>
                          <p className="text-sm text-blue-700 leading-relaxed">
                            본 매물은 거래 시 아이템팜의 표준 전자 계약서가 작성됩니다. 
                            계정 회수 등 문제 발생 시 법적 대응이 가능한 강력한 증빙 자료로 활용됩니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ContractStep 
                        num="01" 
                        title="계약 조항 확인" 
                        desc="회수 시 200% 보상 및 민형사상 책임 조항 포함" 
                      />
                      <ContractStep 
                        num="02" 
                        title="전자 서명" 
                        desc="카카오/PASS를 통한 간편하고 확실한 본인 인증" 
                      />
                      <ContractStep 
                        num="03" 
                        title="계약서 보관" 
                        desc="아이템팜 서버에 영구 보관 및 PDF 다운로드 제공" 
                      />
                      <ContractStep 
                        num="04" 
                        title="사후 관리" 
                        desc="문제 발생 시 아이템팜 법무팀의 전문 상담 지원" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Floating Bar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
                <div className="mb-6">
                  <SafetyBadge grade={item.safetyGrade} className="mb-3" />
                  <h1 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">판매가</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-blue-600">{item.price.toLocaleString()}</span>
                      <span className="text-lg font-bold text-blue-600 ml-1">원</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handlePurchase}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    구매 신청하기
                  </button>
                  <button className="w-full py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    1:1 채팅 문의
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>에스크로 수수료</span>
                    <span>무료 (이벤트 중)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>사고 보상 보험</span>
                    <span className="text-blue-600 font-bold">자동 가입</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h4 className="text-sm font-bold mb-2">아이템팜 안전 보장</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    본 매물은 아이템팜이 직접 검증한 안전 매물입니다. 
                    거래 완료 후 1년 내 사고 발생 시 최대 200%를 보상해 드립니다.
                  </p>
                </div>
                <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold transition-all border-b-2",
        active ? "text-blue-600 border-blue-600 bg-blue-50/30" : "text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}

function SellerStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}

function ContractStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
      <span className="text-2xl font-black text-gray-100 leading-none">{num}</span>
      <div>
        <h5 className="text-sm font-bold text-gray-900 mb-1">{title}</h5>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
