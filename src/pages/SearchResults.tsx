import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, ArrowUpDown, AlertCircle, Loader2, ChevronLeft } from 'lucide-react';
import Layout from '@/src/components/Layout';
import ItemCard from '@/src/components/ItemCard';
import { supabase } from '@/src/lib/supabase';
import { ItemListing } from '@/src/types';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [listings, setListings] = useState<ItemListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setListings([]);
        setLoading(false);
        return;
      }

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
          .or(`title.ilike.%${query}%,game_id.ilike.%${query}%,server.ilike.%${query}%`)
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
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Layout>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600">홈</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span>검색 결과</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                "{query}" 검색 결과
              </h1>
              <p className="text-gray-500 mt-1">
                총 {listings.length}개의 매물이 검색되었습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">검색 결과를 불러오는 중입니다...</p>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500 mb-8">다른 검색어를 입력하시거나 철자를 확인해보세요.</p>
            <Link 
              to="/"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
            >
              홈으로 돌아가기
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
