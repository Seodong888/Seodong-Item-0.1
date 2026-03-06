import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, HelpCircle, Menu, X, LogOut, LogIn } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import AuthAlertModal from './AuthAlertModal';
import PolicyModal from './PolicyModal';
import PreparationModal from './PreparationModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isPrepModalOpen, setIsPrepModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleProtectedAction = (path: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-2xl italic tracking-tighter">SD</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-gray-900 leading-none">
                SD의Item
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">
                Safe & Direct
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="게임명 또는 서버명을 입력하세요"
                className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="검색"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleProtectedAction('/register')}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              판매등록
            </button>
            
            {user ? (
              <>
                <Link to="/mypage" className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Link>
                <Link to="/mypage" className="flex items-center gap-2 p-1 pl-2 pr-3 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.user_metadata.full_name || '마이페이지'}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
              >
                <LogIn className="h-4 w-4" />
                로그인
              </Link>
            )}
            
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-5 w-5" />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn("p-2 transition-colors", isSearchOpen ? "text-blue-600" : "text-gray-400")}
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4">
          <form onSubmit={(e) => {
            handleSearch(e);
            setIsSearchOpen(false);
          }}>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="게임명 또는 서버명을 입력하세요"
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg">
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              handleProtectedAction('/register');
            }} 
            className="block w-full text-left py-2 text-base font-medium text-gray-700"
          >
            판매등록
          </button>
          {user ? (
            <>
              <Link to="/mypage" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-medium text-gray-700">마이페이지</Link>
              <button onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }} className="block w-full text-left py-2 text-base font-medium text-red-600">로그아웃</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-medium text-blue-600">로그인 / 회원가입</Link>
          )}
          <Link to="/support" onClick={() => setIsMenuOpen(false)} className="block py-2 text-base font-medium text-gray-700">고객센터</Link>
        </div>
      )}

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
    </header>
  );
}
