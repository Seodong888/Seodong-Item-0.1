import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Tag, TrendingUp, ShieldAlert, ChevronRight, AlertCircle, Loader2, User as UserIcon } from 'lucide-react';
import Layout from '@/src/components/Layout';
import GameIcon from '@/src/components/GameIcon';
import ItemCard from '@/src/components/ItemCard';
import { POPULAR_GAMES } from '@/src/mockData';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';
import { ItemListing } from '@/src/types';
import AuthAlertModal from '@/src/components/AuthAlertModal';
import PolicyModal from '@/src/components/PolicyModal';
import PreparationModal from '@/src/components/PreparationModal';

const REVIEWS = [
  {
    name: "김*준",
    rating: 5,
    text: "처음 거래해봤는데 전자 계약서가 있어서 정말 안심됐어요. 판매자분도 친절하시고 매물도 설명이랑 똑같네요!"
  },
  {
    name: "이*민",
    rating: 5,
    text: "SD의아이템 덕분에 오랫동안 찾던 매물 안전하게 구했습니다. 에스크로 시스템이 확실해서 좋네요."
  },
  {
    name: "박*서",
    rating: 5,
    text: "회수 걱정 없는 거래는 처음이에요. 전자계약서 시스템이 정말 잘 되어 있네요. 강력 추천합니다!"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<ItemListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isPrepModalOpen, setIsPrepModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const fetchLatestListings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('listings')
          .select(`
            *,
            profiles (
              name,
              rating,
              trades,
              is_verified
            )
          `)
          .order('created_at', { ascending: false })
          .limit(8);

        if (error) throw error;

        if (data) {
          const mappedData: ItemListing[] = data.map((item: any) => ({
            id: item.id,
            gameId: item.game_id,
            server: item.server,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            safetyGrade: item.safety_grade,
            sellerId: item.seller_id,
            sellerName: item.profiles?.name || '익명',
            sellerRating: item.profiles?.rating || 5.0,
            sellerTrades: item.profiles?.trades || 0,
            isVerified: item.profiles?.is_verified || false,
            description: item.description,
            level: item.level || 0,
            class: item.class || '',
            equipment: item.equipment || [],
            skills: item.skills || [],
            currency: item.currency || '원',
            images: item.images || [],
            createdAt: item.created_at,
          }));
          setListings(mappedData);
        }
      } catch (err) {
        console.error('Error fetching latest listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestListings();
  }, []);

  const handleProtectedAction = (path: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      navigate(path);
    }
  };

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
                <button 
                  onClick={() => handleProtectedAction('/register')}
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  지금 판매하기
                </button>
                <button
                  onClick={() => handleProtectedAction('/browse')}
                  className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  매물 보러가기
                </button>
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
                onClick={() => handleProtectedAction('/browse')}
              />
              <QuickMenuButton 
                icon={<Tag className="w-6 h-6" />} 
                title="판매하기" 
                desc="빠른 현금화" 
                color="bg-blue-50 text-blue-600"
                onClick={() => handleProtectedAction('/register')}
              />
              <QuickMenuButton 
                icon={<TrendingUp className="w-6 h-6" />} 
                title="시세조회" 
                desc="실시간 가격 분석" 
                color="bg-purple-50 text-purple-600"
                onClick={() => setIsPrepModalOpen(true)}
              />
              <QuickMenuButton 
                icon={<ShieldAlert className="w-6 h-6" />} 
                title="사고보상" 
                desc="200% 책임 보장" 
                color="bg-red-50 text-red-600"
                onClick={() => setIsPolicyModalOpen(true)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">인기 게임 리스트</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-10 justify-items-center">
          {POPULAR_GAMES.map((game) => (
            <GameIcon 
              key={game.id} 
              game={game} 
              onClick={() => navigate(`/listings/${game.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Real-time Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">실시간 등록 매물</h2>
              <p className="text-sm text-gray-500 mt-1">방금 올라온 따끈따끈한 안전 매물입니다.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 sm:flex-none px-4 py-3 sm:py-2 bg-white border border-gray-200 rounded-xl sm:rounded-lg text-sm font-bold sm:font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                전체
              </button>
              <button className="flex-1 sm:flex-none px-4 py-3 sm:py-2 bg-white border border-gray-200 rounded-xl sm:rounded-lg text-sm font-bold sm:font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                계정
              </button>
              <button className="flex-1 sm:flex-none px-4 py-3 sm:py-2 bg-white border border-gray-200 rounded-xl sm:rounded-lg text-sm font-bold sm:font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
                아이템
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-gray-500 font-medium">매물을 불러오는 중입니다...</p>
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {listings.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-500">등록된 매물이 없습니다. 첫 번째 매물을 등록해보세요!</p>
              <button 
                onClick={() => handleProtectedAction('/register')}
                className="inline-block mt-4 text-blue-600 font-bold hover:underline"
              >
                판매 등록하러 가기
              </button>
            </div>
          )}
        </div>
      </section>

      <AuthAlertModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <PolicyModal 
        isOpen={isPolicyModalOpen} 
        onClose={() => setIsPolicyModalOpen(false)} 
      />

      <PreparationModal 
        isOpen={isPrepModalOpen} 
        onClose={() => setIsPrepModalOpen(false)} 
      />

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

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden h-[240px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">생생한 거래 후기</h3>
              <button className="text-xs text-blue-600 font-bold">더보기</button>
            </div>
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReviewIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="flex gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold">{REVIEWS[currentReviewIdx].name}</span>
                        <div className="flex text-yellow-400 text-xs">
                          {'★'.repeat(REVIEWS[currentReviewIdx].rating)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">실제 거래 완료 회원</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    "{REVIEWS[currentReviewIdx].text}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {REVIEWS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    idx === currentReviewIdx ? "bg-blue-600 w-4" : "bg-gray-200"
                  )} 
                />
              ))}
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
