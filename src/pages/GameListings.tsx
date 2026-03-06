import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, ChevronDown, Search, ArrowLeft, Loader2 } from 'lucide-react';
import Layout from '@/src/components/Layout';
import ItemCard from '@/src/components/ItemCard';
import { POPULAR_GAMES } from '@/src/mockData';
import { supabase } from '@/src/lib/supabase';
import { ItemListing } from '@/src/types';

export default function GameListings() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const game = POPULAR_GAMES.find(g => g.id === gameId);
  
  const [listings, setListings] = useState<ItemListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
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
          .eq('game_id', gameId)
          .order('created_at', { ascending: false });

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
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [gameId]);

  return (
    <Layout>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button 
            onClick={() => navigate('/browse')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 게임 목록으로
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-3xl shadow-sm">
                {game?.icon || '🎮'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{game?.name || '게임'} 매물</h1>
                <p className="text-sm text-gray-500">
                  {loading ? '불러오는 중...' : `현재 ${listings.length}개의 안전 매물이 등록되어 있습니다.`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="서버 또는 제목 검색"
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <FilterButton label="서버 전체" />
          <FilterButton label="아이템 종류" />
          <FilterButton label="가격대" />
          <FilterButton label="안전 등급" />
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">매물을 불러오는 중입니다...</p>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">등록된 매물이 없습니다.</h3>
            <p className="text-gray-500">가장 먼저 첫 번째 매물을 등록해보세요!</p>
            <button 
              onClick={() => navigate('/register')}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              판매 등록하기
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2">
      {label}
      <ChevronDown className="w-4 h-4 opacity-40" />
    </button>
  );
}
