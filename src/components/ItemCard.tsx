import React from 'react';
import { Link } from 'react-router-dom';
import { ItemListing } from '@/src/types';
import SafetyBadge from './SafetyBadge';
import { ShieldCheck, Clock } from 'lucide-react';

interface ItemCardProps {
  item: ItemListing;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Link 
      to={`/item/${item.id}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <SafetyBadge grade={item.safetyGrade} />
        </div>
        {item.isVerified && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5 rounded">
            {item.gameId.replace('-', ' ')}
          </span>
          <span className="text-[10px] font-medium text-gray-400">
            {item.server}
          </span>
        </div>
        
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 min-h-[2.5rem]">
          {item.title}
        </h3>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">판매가</p>
            <p className="text-lg font-bold text-gray-900">
              {item.price.toLocaleString()}
              <span className="text-sm font-medium ml-0.5">원</span>
            </p>
          </div>
          
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Clock className="w-3 h-3" />
            <span>2시간 전</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
