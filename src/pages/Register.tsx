import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Upload, 
  Check, 
  ChevronRight, 
  AlertCircle,
  Gamepad2,
  Layers,
  FileText,
  ShieldCheck,
  X,
  Loader2
} from 'lucide-react';
import Layout from '@/src/components/Layout';
import { POPULAR_GAMES } from '@/src/mockData';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';
import SuccessModal from '@/src/components/SuccessModal';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    game: '',
    server: '',
    category: '계정',
    title: '',
    price: '',
    description: '',
    guarantee: false,
  });

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('판매 등록을 위해 로그인이 필요합니다.');
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, upload to Supabase Storage. Here we just use placeholders.
      const newImages = Array.from(files).map((_, i) => `https://picsum.photos/seed/upload-${Date.now()}-${i}/800/600`);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('로그인이 필요합니다.');
      }

      // Ensure profile exists (in case trigger didn't run for existing users)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw profileError;
      }

      if (!profile) {
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '익명 사용자',
            rating: 5.0,
            trades: 0,
            mileage: 0,
            is_verified: false
          });
        
        if (createProfileError) throw createProfileError;
      }

      const { error: insertError } = await supabase
        .from('listings')
        .insert({
          game_id: formData.game,
          server: formData.server,
          title: formData.title,
          price: parseInt(formData.price),
          description: formData.description,
          thumbnail: images[0] || 'https://picsum.photos/seed/default/400/300',
          images: images,
          safety_grade: formData.guarantee ? 'S' : 'A',
          seller_id: session.user.id,
          class: formData.category,
          currency: '원',
          level: 0, // Default for now
          equipment: [],
          skills: [],
        });

      if (insertError) throw insertError;

      setIsSuccessModalOpen(true);
    } catch (err: any) {
      setError(err.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">판매 등록</h1>
          <p className="text-gray-500">빠르고 안전하게 당신의 소중한 아이템을 판매하세요.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <StepIndicator active={step >= 1} label="게임 선택" />
          <div className={cn("w-12 h-0.5 mx-2", step >= 2 ? "bg-blue-600" : "bg-gray-200")} />
          <StepIndicator active={step >= 2} label="정보 입력" />
          <div className={cn("w-12 h-0.5 mx-2", step >= 3 ? "bg-blue-600" : "bg-gray-200")} />
          <StepIndicator active={step >= 3} label="등록 완료" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Game Selection */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-blue-600" />
              게임 및 서버 선택
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">게임 선택</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.game}
                  onChange={(e) => setFormData({...formData, game: e.target.value})}
                  required
                >
                  <option value="">게임을 선택하세요</option>
                  {POPULAR_GAMES.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">서버 입력</label>
                <input 
                  type="text"
                  placeholder="예: 데포로쥬01"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.server}
                  onChange={(e) => setFormData({...formData, server: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">카테고리</label>
              <div className="grid grid-cols-3 gap-4">
                {['계정', '아이템', '게임머니'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat})}
                    className={cn(
                      "py-3 rounded-xl border font-bold transition-all",
                      formData.category === cat 
                        ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                        : "bg-white text-gray-500 border-gray-200 hover:border-blue-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Content Input */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              상세 정보 입력
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input 
                  type="text"
                  placeholder="매물을 한 눈에 요약할 수 있는 제목을 입력하세요"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">판매 가격 (원)</label>
                <input 
                  type="number"
                  placeholder="판매할 가격을 입력하세요"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">상세 설명</label>
                <textarea 
                  rows={6}
                  placeholder="캐릭터 스펙, 장비, 스킬 등 상세한 내용을 입력하세요"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">이미지 업로드 (최대 20장)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                      <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {images.length < 20 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-all">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500 font-medium">사진 추가</span>
                      <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Guarantee Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              보증 및 혜택 설정
            </h2>

            <div 
              onClick={() => setFormData({...formData, guarantee: !formData.guarantee})}
              className={cn(
                "p-6 rounded-2xl border-2 cursor-pointer transition-all",
                formData.guarantee 
                  ? "bg-blue-50 border-blue-600" 
                  : "bg-white border-gray-100 hover:border-blue-200"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1",
                  formData.guarantee ? "bg-blue-600 border-blue-600" : "border-gray-300"
                )}>
                  {formData.guarantee && <Check className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">회수 시 200% 보상 동의</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    계정 회수 등 문제 발생 시 구매자에게 거래 금액의 200%를 보상하는 것에 동의합니다. 
                    <span className="text-blue-600 font-bold ml-1">체크 시 검색 결과 상단 노출 및 '안전보증' 마크가 부여됩니다.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <p className="text-xs text-orange-800 leading-relaxed">
                허위 정보를 입력하거나 사기 행위 적발 시 아이템팜 이용이 영구 제한되며, 전자 계약서에 의거하여 민형사상 책임을 질 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              취소
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '매물 등록하기'}
            </button>
          </div>
        </form>
      </div>
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={handleSuccessClose} 
        message="매물이 등록 되었습니다." 
      />
    </Layout>
  );
}

function StepIndicator({ active, label }: { active: boolean, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
        active ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-500"
      )}>
        {active ? <Check className="w-5 h-5" /> : '•'}
      </div>
      <span className={cn("text-xs font-bold", active ? "text-blue-600" : "text-gray-400")}>{label}</span>
    </div>
  );
}
