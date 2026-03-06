import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Search } from 'lucide-react';
import Layout from '@/src/components/Layout';
import { POPULAR_GAMES } from '@/src/mockData';
import GameIcon from '@/src/components/GameIcon';

export default function BrowseGames() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">어떤 게임을 찾으시나요?</h1>
          <p className="text-gray-500">원하시는 게임을 선택하시면 현재 등록된 안전 매물을 보여드립니다.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="게임명을 검색해보세요 (예: 리니지M, 오딘...)"
              className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-2xl text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-5 top-5 h-7 w-7 text-gray-400" />
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-12 justify-items-center">
          {POPULAR_GAMES.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/listings/${game.id}`)}
              className="cursor-pointer"
            >
              <GameIcon game={game} />
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-20">
          <h3 className="text-xl font-bold text-gray-900 mb-8">인기 카테고리</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <CategoryCard title="모바일 게임" count="1,240" />
            <CategoryCard title="PC 게임" count="850" />
            <CategoryCard title="아이템/머니" count="3,100" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CategoryCard({ title, count }: { title: string, count: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex items-center justify-between group cursor-pointer">
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-400">{count}개의 매물</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
}
