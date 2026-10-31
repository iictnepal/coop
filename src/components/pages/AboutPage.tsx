import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Target,
  Award,
  Phone,
  Mail,
  Building2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, settings, boardMembers } = useApp();
  const [activeTab, setActiveTab] = useState<'intro' | 'vision' | 'board' | 'management' | 'legal'>('intro');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Page Title (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०१ ] संस्थागत परिचय तथा संरचना' : '[ 01 ] INSTITUTIONAL OVERVIEW & STRUCTURE'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {lang === 'ne' ? 'हाम्रो बारेमा (About Us)' : 'About Aadhunik Jana SACCOS'}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'नागार्जुन-४, काठमाडौंमा अवस्थित आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेडको स्थापना, इतिहास, सञ्चालक समिति र कानुनी विवरण।'
            : 'Explore the history, vision, leadership, and regulatory governance of Aadhunik Jana Saving & Credit Co-operative Ltd., Nagarjun-4, Kathmandu.'}
        </p>

        {/* Navigation Tabs in Space Mono */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/15">
          {[
            { id: 'intro', labelNe: 'परिचय र इतिहास', labelEn: 'History & Overview' },
            { id: 'vision', labelNe: 'दूरदृष्टि, ध्येय र मूल्य', labelEn: 'Vision & Values' },
            { id: 'board', labelNe: 'सञ्चालक समिति', labelEn: 'Board of Directors' },
            { id: 'management', labelNe: 'व्यवस्थापन समूह', labelEn: 'Management' },
            { id: 'legal', labelNe: 'दर्ता र कानुनी विवरण', labelEn: 'Legal & PAN' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 font-mono-code text-xs uppercase font-bold border-2 transition ${
                activeTab === tab.id
                  ? 'bg-[#d6a943] text-[#111111] border-[#d6a943]'
                  : 'bg-transparent text-white border-white/30 hover:border-white'
              }`}
            >
              {lang === 'ne' ? tab.labelNe : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Introduction & History */}
      {activeTab === 'intro' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="label">[ HERITAGE & ORIGINS ]</span>
              <h2 className="font-syne text-2xl sm:text-3xl font-bold text-[#111111]">
                {lang === 'ne' ? 'संस्थाको स्थापना तथा ऐतिहासिक पृष्ठभूमि' : 'Establishment & Historical Background'}
              </h2>
              <p className="text-sm text-[#111111]/80 leading-relaxed">
                {lang === 'ne'
                  ? 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेडको स्थापना वि.सं. २०६५ सालमा स्थानीय समुदायका जागरुक, प्रतिष्ठित र समर्पित समाजसेवी, व्यवसायी तथा अग्रज व्यक्तित्वहरूको अग्रसरतामा सहकारी ऐन अन्तर्गत विधिवत रूपमा दर्ता भई भएको हो।'
                  : 'Aadhunik Jana Saving & Credit Co-operative Ltd. was registered in 2065 BS (2008 CE) under the Cooperative Act of Nepal by a dedicated group of community elders, local entrepreneurs, and social workers in Nagarjun-4, Kathmandu.'}
              </p>
              <p className="text-sm text-[#111111]/80 leading-relaxed">
                {lang === 'ne'
                  ? 'शुरुवाती दिनहरूमा स्थानीय स्तरमा छरिएर रहेको स-साना बचत संकलन गरी सदस्यहरूलाई सामान्य गर्जो टार्न कर्जा प्रवाह गर्ने उद्देश्यले प्रारम्भ भएको यस संस्थाले आज २,८५० भन्दा बढी सेयर सदस्य, रु. ३४ करोडभन्दा बढी बचत संकलन र रु. २८ करोडभन्दा बढी कर्जा लगानी गर्दै नागार्जुन क्षेत्रकै एक विश्वसनीय वित्तीय धरोहरको रूप धारण गरेको छ।'
                  : 'Starting from small pooled community contributions to meet urgent domestic and trading needs, our institution has grown to mobilize over NPR 34 Crore in member deposits and disbursed over NPR 28 Crore in active loans to over 2,850 shareholder members.'}
              </p>
            </div>

            {/* Emblem / Illustration Container without external Unsplash */}
            <div className="lg:col-span-5">
              <div className="bg-[#111111] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8 text-center text-white space-y-4">
                <div className="w-20 h-20 bg-[#d6a943] border-2 border-white mx-auto flex items-center justify-center text-[#111111]">
                  <Building2 className="w-10 h-10" />
                </div>
                <h3 className="font-syne font-bold text-xl text-white">
                  Aadhunik Jana SACCOS
                </h3>
                <p className="font-mono-code text-xs text-slate-300">
                  Established 2065 B.S. · Nagarjun-4, Kathmandu
                </p>
                <div className="p-3 border border-white/20 bg-white/5 font-mono-code text-xs text-[#d6a943]">
                  {settings.regNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Key Milestones */}
          <div className="bg-white border-2 border-[#111111] p-6 shadow-[6px_6px_0_#111111] space-y-4">
            <h3 className="font-syne font-bold text-lg text-[#111111]">{lang === 'ne' ? 'प्रमुख उपलब्धिहरू' : 'Key Milestones'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-code">
              <div className="p-4 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-syne font-bold text-[#111111] text-base block mb-1">२०६५ / 2008</span>
                <p className="text-[#111111]/70">
                  Formal registration with Department of Cooperatives (Reg: 1248/065/066) and start of counter operations.
                </p>
              </div>
              <div className="p-4 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-syne font-bold text-[#111111] text-base block mb-1">२०७२ / 2015</span>
                <p className="text-[#111111]/70">
                  Established Member Relief and Emergency Medical Fund providing zero-interest crisis support during hardship.
                </p>
              </div>
              <div className="p-4 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-syne font-bold text-[#111111] text-base block mb-1">२०८० / 2024</span>
                <p className="text-[#111111]/70">
                  Upgraded core IT accounting software, launched digital SMS alerts and online preliminary inquiry portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vision, Mission & Core Values */}
      {activeTab === 'vision' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border-2 border-[#111111] shadow-[6px_6px_0_#111111] space-y-3">
              <div className="w-10 h-10 border-2 border-[#111111] bg-[#111111] text-[#d6a943] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-syne text-xl font-bold text-[#111111]">{lang === 'ne' ? 'दूरदृष्टि (Vision)' : 'Our Vision'}</h3>
              <p className="text-xs md:text-sm text-[#111111]/80 leading-relaxed">
                {lang === 'ne'
                  ? 'नागार्जुन नगरपालिका तथा कार्यक्षेत्रका सम्पूर्ण सदस्यहरूलाई आत्मनिर्भर, उद्यमशील र आर्थिक रूपमा सुदृढ बनाउँदै एक अनुकरणीय, मर्यादित र आधुनिक वित्तीय सहकारी संस्थाको रूपमा स्थापित हुनु।'
                  : 'To be a pioneering, model, and respected community financial cooperative delivering self-reliance, entrepreneurship, and sustainable prosperity to every member in Nagarjun.'}
              </p>
            </div>

            <div className="bg-white p-6 border-2 border-[#111111] shadow-[6px_6px_0_#111111] space-y-3">
              <div className="w-10 h-10 border-2 border-[#111111] bg-[#d6a943] text-[#111111] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-syne text-xl font-bold text-[#111111]">{lang === 'ne' ? 'ध्येय (Mission)' : 'Our Mission'}</h3>
              <p className="text-xs md:text-sm text-[#111111]/80 leading-relaxed">
                {lang === 'ne'
                  ? 'सदस्यहरूको बचतलाई सुरक्षित र अधिकतम प्रतिफल दिने, व्यावसायिक तथा कृषि कर्जा सुलभ दरमा प्रवाह गर्ने, वित्तीय साक्षरता अभिवृद्धि गर्ने र समुदायको सामाजिक उत्तरदायित्व पुरा गर्ने।'
                  : 'To protect member deposits with competitive returns, disburse productive micro and SME credit fairly, spread financial literacy, and uplift community welfare with transparency.'}
              </p>
            </div>
          </div>

          {/* 7 Cooperative Principles */}
          <div className="bg-white border-2 border-[#111111] p-6 shadow-[6px_6px_0_#111111] space-y-4">
            <h3 className="font-syne text-lg font-bold text-[#111111]">
              {lang === 'ne' ? 'सहकारीका आधारभूत सिद्धान्त र मूल्यहरू' : 'International Cooperative Principles'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-code">
              <div className="p-3 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-bold text-[#111111] block mb-1">१. खुला तथा ऐच्छिक सदस्यता</span>
                <span className="text-[#111111]/60">Voluntary & Open Membership without discrimination.</span>
              </div>
              <div className="p-3 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-bold text-[#111111] block mb-1">२. लोकतान्त्रिक सदस्य नियन्त्रण</span>
                <span className="text-[#111111]/60">Democratic Member Control (One member, one vote).</span>
              </div>
              <div className="p-3 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-bold text-[#111111] block mb-1">३. सदस्यहरूको आर्थिक सहभागिता</span>
                <span className="text-[#111111]/60">Member Economic Participation in capital & reserves.</span>
              </div>
              <div className="p-3 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-bold text-[#111111] block mb-1">४. स्वायत्तता र स्वतन्त्रता</span>
                <span className="text-[#111111]/60">Autonomy and Independence under regulatory laws.</span>
              </div>
              <div className="p-3 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-bold text-[#111111] block mb-1">५. शिक्षा, तालिम र सूचना</span>
                <span className="text-[#111111]/60">Education, Training & Financial Literacy for all.</span>
              </div>
              <div className="p-3 bg-[#f8f7f4] border border-[#111111]">
                <span className="font-bold text-[#111111] block mb-1">६. समुदाय प्रति चासो</span>
                <span className="text-[#111111]/60">Concern for Community and Sustainable Development.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Board of Directors */}
      {activeTab === 'board' && (
        <div className="space-y-6">
          <div className="border-b-2 border-[#111111] pb-3">
            <span className="label">[ GOVERNANCE ]</span>
            <h2 className="font-syne text-2xl font-bold text-[#111111]">
              {lang === 'ne' ? 'सञ्चालक समितिका पदाधिकारीहरू' : 'Board of Directors'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers
              .filter((m) => m.type === 'Board')
              .map((member) => (
                <div
                  key={member.id}
                  className="bg-white border-2 border-[#111111] p-5 shadow-[6px_6px_0_#111111] text-center space-y-3"
                >
                  <img
                    src={member.imageUrl}
                    alt={member.nameEn}
                    className="w-24 h-24 mx-auto object-cover border-2 border-[#111111]"
                  />
                  <div>
                    <h3 className="font-syne font-bold text-sm md:text-base text-[#111111]">
                      {lang === 'ne' ? member.nameNe : member.nameEn}
                    </h3>
                    <p className="font-mono-code text-xs font-bold text-[#d6a943] bg-[#111111] inline-block px-2 py-0.5 mt-1">
                      {lang === 'ne' ? member.designationNe : member.designationEn}
                    </p>
                  </div>
                  {(member.phone || member.email) && (
                    <div className="pt-2 border-t border-[#111111]/15 font-mono-code text-[11px] text-[#111111]/70 space-y-1">
                      {member.phone && (
                        <div className="flex items-center justify-center gap-1">
                          <Phone className="w-3 h-3 text-[#d6a943]" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center justify-center gap-1">
                          <Mail className="w-3 h-3 text-[#d6a943]" />
                          <span>{member.email}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tab 4: Account Committee & Management */}
      {activeTab === 'management' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-syne text-xl font-bold text-[#111111] mb-1">
              {lang === 'ne' ? 'लेखा सुपरिवेक्षण समिति' : 'Account Supervisory Committee'}
            </h2>
            <p className="font-mono-code text-xs text-[#111111]/60 mb-4">
              Independent audit and internal control committee reporting directly to the AGM.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {boardMembers
                .filter((m) => m.type === 'Account Committee')
                .map((member) => (
                  <div key={member.id} className="bg-white p-5 border-2 border-[#111111] shadow-[4px_4px_0_#111111] text-center space-y-3">
                    <img
                      src={member.imageUrl}
                      alt={member.nameEn}
                      className="w-20 h-20 mx-auto object-cover border-2 border-[#111111]"
                    />
                    <h3 className="font-syne font-bold text-sm text-[#111111]">
                      {lang === 'ne' ? member.nameNe : member.nameEn}
                    </h3>
                    <p className="font-mono-code text-xs font-bold text-[#111111]">
                      {lang === 'ne' ? member.designationNe : member.designationEn}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="pt-6 border-t-2 border-[#111111]">
            <h2 className="font-syne text-xl font-bold text-[#111111] mb-1">
              {lang === 'ne' ? 'कार्यकारी व्यवस्थापन समूह' : 'Executive Management Team'}
            </h2>
            <p className="font-mono-code text-xs text-[#111111]/60 mb-4">
              Professional staff responsible for day-to-day operations and member service delivery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {boardMembers
                .filter((m) => m.type === 'Management')
                .map((member) => (
                  <div key={member.id} className="bg-white p-5 border-2 border-[#111111] shadow-[4px_4px_0_#111111] text-center space-y-3">
                    <img
                      src={member.imageUrl}
                      alt={member.nameEn}
                      className="w-20 h-20 mx-auto object-cover border-2 border-[#111111]"
                    />
                    <h3 className="font-syne font-bold text-sm text-[#111111]">
                      {lang === 'ne' ? member.nameNe : member.nameEn}
                    </h3>
                    <p className="font-mono-code text-xs font-bold text-[#111111]">
                      {lang === 'ne' ? member.designationNe : member.designationEn}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Legal & Registration */}
      {activeTab === 'legal' && (
        <div className="space-y-6">
          <div className="border-b-2 border-[#111111] pb-3">
            <span className="label">[ COMPLIANCE ]</span>
            <h2 className="font-syne text-2xl font-bold text-[#111111]">
              {lang === 'ne' ? 'कानुनी तथा दर्ता सम्बन्धी प्रमाणिक विवरण' : 'Legal Compliance & Registration Credentials'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border-2 border-[#111111] shadow-[6px_6px_0_#111111] space-y-4">
              <h3 className="label text-[#111111]">
                Statutory Identifiers
              </h3>
              <div className="space-y-3 font-mono-code text-xs">
                <div className="flex justify-between py-2 border-b border-[#111111]/15">
                  <span className="text-[#111111]/60">Cooperative Registration No:</span>
                  <span className="font-bold text-[#111111]">1248/065/066</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#111111]/15">
                  <span className="text-[#111111]/60">Regulating Authority:</span>
                  <span className="font-bold text-[#111111]">Department of Cooperatives, GoN</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#111111]/15">
                  <span className="text-[#111111]/60">Inland Revenue PAN No:</span>
                  <span className="font-bold text-[#111111]">302847195</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#111111]/15">
                  <span className="text-[#111111]/60">Jurisdiction:</span>
                  <span className="font-bold text-[#111111]">Nagarjun Municipality & Kathmandu District</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] text-white p-6 border-2 border-[#111111] shadow-[6px_6px_0_#d6a943] space-y-3">
              <Award className="w-8 h-8 text-[#d6a943]" />
              <h3 className="font-syne font-bold text-lg text-white">Annual Statutory Audit</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-mono-code">
                As per Section 73 of the Cooperative Act 2074, our accounts are strictly audited annually by licensed
                Chartered Accountants registered with the Institute of Chartered Accountants of Nepal (ICAN).
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-[#d6a943] text-[#111111] font-mono-code text-xs font-bold uppercase">
                  Audit Cleared for FY 2080/081
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
