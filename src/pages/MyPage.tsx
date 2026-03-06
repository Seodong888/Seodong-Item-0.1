import React, { useState } from 'react';
import { 
  Wallet, 
  ShoppingBag, 
  Tag, 
  Heart, 
  FileText, 
  MessageCircle, 
  Settings, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownLeft,
  Download,
  ShieldCheck,
  User as UserIcon,
  Bell
} from 'lucide-react';
import Layout from '@/src/components/Layout';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'contracts' | 'chats'>('dashboard');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-100">
                  <UserIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">홍길동님</h2>
                  <p className="text-xs text-gray-400">아이템팜 3년차 우수회원</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <SidebarItem 
                  active={activeTab === 'dashboard'} 
                  onClick={() => setActiveTab('dashboard')}
                  icon={<Wallet className="w-4 h-4" />} 
                  label="대시보드" 
                />
                <SidebarItem 
                  active={activeTab === 'transactions'} 
                  onClick={() => setActiveTab('transactions')}
                  icon={<ShoppingBag className="w-4 h-4" />} 
                  label="거래 내역" 
                />
                <SidebarItem 
                  active={activeTab === 'contracts'} 
                  onClick={() => setActiveTab('contracts')}
                  icon={<FileText className="w-4 h-4" />} 
                  label="내 계약서 관리" 
                />
                <SidebarItem 
                  active={activeTab === 'chats'} 
                  onClick={() => setActiveTab('chats')}
                  icon={<MessageCircle className="w-4 h-4" />} 
                  label="채팅 목록" 
                  badge={3}
                />
                <SidebarItem 
                  active={false} 
                  onClick={() => {}}
                  icon={<Heart className="w-4 h-4" />} 
                  label="찜한 목록" 
                />
                <SidebarItem 
                  active={false} 
                  onClick={() => {}}
                  icon={<Settings className="w-4 h-4" />} 
                  label="계정 설정" 
                />
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-sm font-bold mb-2">프리미엄 멤버십</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  거래 수수료 50% 할인 혜택을<br />지금 바로 확인하세요.
                </p>
                <button className="text-xs font-bold text-blue-400 flex items-center gap-1">
                  자세히 보기 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {activeTab === 'dashboard' && (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatCard 
                      title="보유 마일리지" 
                      value="1,245,000" 
                      unit="원" 
                      icon={<Wallet className="w-5 h-5 text-blue-600" />}
                      action="출금 신청"
                    />
                    <StatCard 
                      title="진행 중인 구매" 
                      value="2" 
                      unit="건" 
                      icon={<ShoppingBag className="w-5 h-5 text-orange-600" />}
                      action="내역 보기"
                    />
                    <StatCard 
                      title="진행 중인 판매" 
                      value="1" 
                      unit="건" 
                      icon={<Tag className="w-5 h-5 text-emerald-600" />}
                      action="내역 보기"
                    />
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">최근 거래 활동</h3>
                      <button className="text-xs text-blue-600 font-bold">전체보기</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      <ActivityItem 
                        type="buy" 
                        title="리니지M 데포로쥬01 계정" 
                        status="결제 완료" 
                        date="2024.03.05 14:20" 
                        amount="4,500,000" 
                      />
                      <ActivityItem 
                        type="sell" 
                        title="오딘 발할라 라이징 다이아 1만" 
                        status="인수 대기" 
                        date="2024.03.05 12:45" 
                        amount="120,000" 
                      />
                      <ActivityItem 
                        type="buy" 
                        title="나이트 워커 블레이드 고스펙" 
                        status="거래 완료" 
                        date="2024.03.04 18:10" 
                        amount="850,000" 
                      />
                    </div>
                  </div>

                  {/* Withdrawal Section */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">출금 신청</h3>
                        <p className="text-xs text-gray-500">등록된 계좌로 마일리지를 현금화합니다.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">출금 가능 금액</label>
                          <p className="text-2xl font-black text-gray-900">1,245,000원</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">출금 신청 금액</label>
                          <input 
                            type="number" 
                            placeholder="금액을 입력하세요"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <label className="block text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">등록된 계좌 정보</label>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center font-bold text-[10px]">신한</div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">신한은행</p>
                              <p className="text-xs text-gray-500">110-***-123456</p>
                            </div>
                          </div>
                          <button className="text-xs text-blue-600 font-bold">변경</button>
                        </div>
                        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md">
                          출금 신청하기
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'contracts' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">내 계약서 관리</h3>
                    <p className="text-sm text-gray-500 mt-1">완료된 거래의 전자 계약서를 확인하고 다운로드할 수 있습니다.</p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <ContractItem 
                      title="리니지M 데포로쥬01 계정 거래" 
                      date="2024.03.05" 
                      buyer="홍길동" 
                      seller="안전거래왕" 
                      amount="4,500,000" 
                    />
                    <ContractItem 
                      title="나이트 워커 블레이드 고스펙 거래" 
                      date="2024.03.04" 
                      buyer="홍길동" 
                      seller="워커홀릭" 
                      amount="850,000" 
                    />
                  </div>
                </div>
              )}

              {activeTab === 'chats' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">채팅 목록</h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded">새 메시지 3건</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <ChatItem 
                      name="안전거래왕" 
                      lastMsg="계정 정보 확인 부탁드립니다!" 
                      time="방금 전" 
                      unread={1} 
                    />
                    <ChatItem 
                      name="게임매니아" 
                      lastMsg="네, 쿨거래 감사합니다." 
                      time="2시간 전" 
                      unread={2} 
                    />
                    <ChatItem 
                      name="워커홀릭" 
                      lastMsg="계약서 확인했습니다." 
                      time="어제" 
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SidebarItem({ active, onClick, icon, label, badge }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, badge?: number }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
        active ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("transition-colors", active ? "text-white" : "text-gray-400 group-hover:text-blue-600")}>
          {icon}
        </span>
        <span className="text-sm font-bold">{label}</span>
      </div>
      {badge && (
        <span className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
          active ? "bg-white text-blue-600" : "bg-blue-600 text-white"
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ title, value, unit, icon, action }: { title: string, value: string, unit: string, icon: React.ReactNode, action: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors">
          {action}
        </button>
      </div>
      <p className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-gray-900">{value}</span>
        <span className="text-sm font-bold text-gray-500">{unit}</span>
      </div>
    </div>
  );
}

function ActivityItem({ type, title, status, date, amount }: { type: 'buy' | 'sell', title: string, status: string, date: string, amount: string }) {
  return (
    <div className="p-6 flex items-center justify-between group hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          type === 'buy' ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
        )}>
          {type === 'buy' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
              type === 'buy' ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"
            )}>
              {type === 'buy' ? '구매' : '판매'}
            </span>
            <h4 className="text-sm font-bold text-gray-900">{title}</h4>
          </div>
          <p className="text-xs text-gray-400">{date} • {status}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">{amount}원</p>
        <button className="text-[10px] font-bold text-blue-600 hover:underline">상세보기</button>
      </div>
    </div>
  );
}

function ContractItem({ title, date, buyer, seller, amount }: { title: string, date: string, buyer: string, seller: string, amount: string }) {
  return (
    <div className="p-6 flex items-center justify-between group hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-xs text-gray-400">계약일: {date} • 구매자: {buyer} / 판매자: {seller}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right mr-4">
          <p className="text-xs text-gray-400 mb-0.5">거래 금액</p>
          <p className="text-sm font-bold text-gray-900">{amount}원</p>
        </div>
        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ChatItem({ name, lastMsg, time, unread }: { name: string, lastMsg: string, time: string, unread?: number }) {
  return (
    <div className="p-6 flex items-center justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <UserIcon className="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-1">{name}</h4>
          <p className="text-xs text-gray-500 line-clamp-1">{lastMsg}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-400 mb-1">{time}</p>
        {unread && (
          <span className="inline-block w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ml-auto">
            {unread}
          </span>
        )}
      </div>
    </div>
  );
}
