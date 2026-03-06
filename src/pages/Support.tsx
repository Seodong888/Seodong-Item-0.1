import React from 'react';
import { Phone, Mail, MessageCircle, MapPin, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/src/components/Layout';

export default function Support() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <button onClick={() => navigate(-1)} className="hover:text-gray-600 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> 뒤로가기
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-black text-gray-900 mb-2">SD의아이템</h1>
            <p className="text-gray-500">고객님의 안전한 거래를 위해 최선을 다하겠습니다.</p>
          </div>

          <div className="space-y-6 mb-12">
            <ContactItem 
              icon={<Phone className="w-5 h-5 text-blue-600" />} 
              label="TEL" 
              value="02-1234-5678" 
              href="tel:02-1234-5678"
            />
            <ContactItem 
              icon={<Mail className="w-5 h-5 text-blue-600" />} 
              label="Email" 
              value="sales@sditem.com" 
              href="mailto:sales@sditem.com"
            />
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-bold mb-0.5">1:1 채팅하기</p>
                  <p className="text-sm font-bold text-blue-900">실시간 상담 연결</p>
                </div>
              </div>
              <a 
                href="https://open.kakao.com/o/s2nIq3ji" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                연결하기
              </a>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-gray-900">Location</h2>
            </div>
            <p className="text-gray-600 mb-6 font-medium">서울 관악구 관악로 1</p>
            
            <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.952545084931!2d126.9504561763567!3d37.4618779720658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f8000000001%3A0x8698944120377f80!2z7ISc7Jq464yA7ZWZ6rWQIOq0gOyVhey6oO2NvOyKpA!5e0!3m2!1sko!2skr!4v1709710000000!5m2!1sko!2skr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  return (
    <a href={href} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all group">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-bold mb-0.5">{label}</p>
        <p className="text-sm font-bold text-gray-900">{value}</p>
      </div>
    </a>
  );
}
