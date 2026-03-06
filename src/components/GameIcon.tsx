import React from 'react';
import { Game } from '@/src/types';

interface GameIconProps {
  game: Game;
}

const GameIcon: React.FC<GameIconProps> = ({ game }) => {
  return (
    <button className="flex flex-col items-center gap-3 group">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-3xl group-hover:shadow-md group-hover:border-blue-200 group-hover:-translate-y-1 transition-all duration-200">
        {game.icon}
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
        {game.name}
      </span>
    </button>
  );
};

export default GameIcon;
