import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, ChevronDown, Search, ArrowLeft } from 'lucide-react';
import Layout from '@/src/components/Layout';
import ItemCard from '@/src/components/ItemCard';
import { MOCK_LISTINGS, POPULAR_GAMES } from '@/src/mockData';

export default function GameListings() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const game = POPULAR_GAMES.find(g => g.id === gameId);
  
  const filteredListings = MOCK_LISTINGS.filter(item => item.gameId === gameId);

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
                <p className="text-sm text-gray-500">현재 {filteredListings.length}개의 안전 매물이 등록되어 있습니다.</p>
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
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
            {/* Mock more items if needed */}
            {filteredListings.map((item, idx) => (
              <motion.div
                key={`dup-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + filteredListings.length) * 0.1 }}
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
            <p className="text-gray-500">다른 게임을 선택하시거나 나중에 다시 확인해주세요.</p>
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
