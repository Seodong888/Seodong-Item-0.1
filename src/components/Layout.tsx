import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm italic">SD</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-gray-900">
                  SD의Item
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm">
                대한민국 1등 계정 거래 안전 지대. SD의Item은 전자 계약 시스템과 200% 보상 제도를 통해 가장 안전한 거래 환경을 제공합니다.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">서비스</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">구매하기</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">판매하기</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">시세조회</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">사고보상 신청</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">고객센터</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">자주 묻는 질문</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">1:1 문의</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">공지사항</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">사기 수법 알림</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              © 2026 SD의Item. All rights reserved. SD의Item | 대표이사: 홍길동 | 사업자등록번호: 123-45-67890
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">이용약관</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 font-bold">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
