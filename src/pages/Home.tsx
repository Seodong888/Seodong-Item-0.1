import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Tag, TrendingUp, ShieldAlert, ChevronRight, AlertCircle } from 'lucide-react';
import Layout from '@/src/components/Layout';
import GameIcon from '@/src/components/GameIcon';
import ItemCard from '@/src/components/ItemCard';
import { POPULAR_GAMES, MOCK_LISTINGS } from '@/src/mockData';
import { cn } from '@/src/lib/utils';

export default function Home() {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Safety First Platform
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                대한민국 1등 계정 거래<br />
                <span className="text-blue-600">안전 지대</span> SD의아이템
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-lg">
                누적 거래량 <span className="font-bold text-gray-900">1,240,000건</span> 돌파! 
                전자 계약 시스템으로 회수 걱정 없는 안전한 거래를 시작하세요.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/register" 
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  지금 판매하기
                </Link>
                <Link
                  to="/browse"
                  className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  매물 보러가기
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <QuickMenuButton 
                icon={<ShoppingCart className="w-6 h-6" />} 
                title="구매하기" 
                desc="안전한 매물 찾기" 
                color="bg-orange-50 text-orange-600"
                onClick={() => navigate('/browse')}
              />
              <QuickMenuButton 
                icon={<Tag className="w-6 h-6" />} 
                title="판매하기" 
                desc="빠른 현금화" 
                color="bg-blue-50 text-blue-600"
                onClick={() => navigate('/register')}
              />
              <QuickMenuButton 
                icon={<TrendingUp className="w-6 h-6" />} 
                title="시세조회" 
                desc="실시간 가격 분석" 
                color="bg-purple-50 text-purple-600"
              />
              <QuickMenuButton 
                icon={<ShieldAlert className="w-6 h-6" />} 
                title="사고보상" 
                desc="200% 책임 보장" 
                color="bg-red-50 text-red-600"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">인기 게임 리스트</h2>
          <button className="text-sm font-medium text-gray-400 hover:text-blue-600 flex items-center gap-1">
            전체보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 sm:gap-8">
          {POPULAR_GAMES.map((game) => (
            <GameIcon key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Real-time Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">실시간 등록 매물</h2>
              <p className="text-sm text-gray-500 mt-1">방금 올라온 따끈따끈한 안전 매물입니다.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                전체
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                계정
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                아이템
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_LISTINGS.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
            {/* Repeat some items for visual density */}
            {MOCK_LISTINGS.map((item) => (
              <ItemCard key={`dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Community / Notice */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-red-900">최신 사기 수법 경고</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm text-red-700">
                <span className="truncate">카카오톡 오픈채팅 유도 사기 주의보</span>
                <span className="text-xs opacity-60">03.05</span>
              </li>
              <li className="flex items-center justify-between text-sm text-red-700">
                <span className="truncate">가짜 에스크로 결제창 링크 피싱 사례</span>
                <span className="text-xs opacity-60">03.04</span>
              </li>
              <li className="flex items-center justify-between text-sm text-red-700">
                <span className="truncate">아이템팜 사칭 문자 메시지 주의</span>
                <span className="text-xs opacity-60">03.02</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">생생한 거래 후기</h3>
              <button className="text-xs text-blue-600 font-bold">더보기</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold">김*준</span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    "처음 거래해봤는데 전자 계약서가 있어서 정말 안심됐어요. 판매자분도 친절하시고 매물도 설명이랑 똑같네요!"
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold">이*민</span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    "아이디팜 덕분에 오랫동안 찾던 매물 안전하게 구했습니다. 에스크로 시스템이 확실해서 좋네요."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function QuickMenuButton({ icon, title, desc, color, onClick }: { icon: React.ReactNode, title: string, desc: string, color: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all text-left group"
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", color)}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{desc}</p>
    </button>
  );
}
