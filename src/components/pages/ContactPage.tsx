import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { lang, t, settings, addContactMessage } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !message) return;

    addContactMessage({
      fullName,
      email: email || 'n/a',
      phone,
      subject: subject || (lang === 'ne' ? 'सामान्य सोधपुछ' : 'General Inquiry'),
      message,
    });

    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Header (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०५ ] सम्पर्क तथा ठेगाना' : '[ 05 ] CONTACT & INQUIRIES'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {t.contactUs}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'नागार्जुन-४ स्थित मुख्य कार्यालयमा स्वागत छ। बचत खाता, कर्जा सुविधा वा कुनै जिज्ञासा भएमा हामीलाई सिधै सम्पर्क गर्नुहोस्।'
            : 'Visit our central office in Nagarjun-4, Kathmandu, or send us your inquiries online. Our member relationship officers are ready to assist you.'}
        </p>
      </div>

      {/* 2 Column: Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Information Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border-2 border-[#111111] shadow-[6px_6px_0_#111111] space-y-5">
            <h3 className="font-syne font-bold text-lg text-[#111111] pb-2 border-b border-[#111111]/15">
              {lang === 'ne' ? 'कार्यालय विवरण' : 'Central Office Contact'}
            </h3>

            <div className="space-y-4 font-mono-code text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 border border-[#111111] bg-[#111111] text-[#d6a943] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="label block mb-0.5">
                    {lang === 'ne' ? 'ठेगाना' : 'OFFICE LOCATION'}
                  </span>
                  <span className="text-[#111111] font-bold">
                    {lang === 'ne' ? settings.addressNe : settings.addressEn}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 border border-[#111111] bg-[#111111] text-[#d6a943] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="label block mb-0.5">
                    {lang === 'ne' ? 'टेलिफोन' : 'TELEPHONE'}
                  </span>
                  <span className="text-[#111111] font-bold block">{settings.phone}</span>
                  <span className="text-[#111111] font-bold block">{settings.phoneSecondary}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 border border-[#111111] bg-[#111111] text-[#d6a943] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="label block mb-0.5">
                    {lang === 'ne' ? 'इमेल ठेगाना' : 'EMAIL'}
                  </span>
                  <span className="text-[#111111] font-bold block">{settings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 border border-[#111111] bg-[#111111] text-[#d6a943] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="label block mb-0.5">
                    {lang === 'ne' ? 'कार्यालय समय' : 'OFFICE HOURS'}
                  </span>
                  <span className="text-[#111111] font-bold block">
                    {lang === 'ne' ? settings.officeHoursNe : settings.officeHoursEn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 border-2 border-[#111111] shadow-[8px_8px_0_#111111]">
            <h3 className="font-syne font-bold text-xl text-[#111111] mb-2">
              {lang === 'ne' ? 'सन्देश वा सोधपुछ पठाउनुहोस्' : 'Send an Official Message'}
            </h3>
            <p className="font-mono-code text-xs text-[#111111]/70 mb-6">
              {lang === 'ne'
                ? 'हाम्रा कर्मचारीहरूले तपाईंको सोधपुछ २४ घण्टाभित्र समीक्षा गरी सम्पर्क गर्नेछन्।'
                : 'Direct inquiries will be routed to member service officers in Nagarjun-4.'}
            </p>

            {submitted ? (
              <div className="p-6 bg-[#f8f7f4] border-2 border-[#111111] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#111111] mx-auto" />
                <h4 className="font-syne font-bold text-lg text-[#111111]">
                  {lang === 'ne' ? 'सन्देश सफलतापूर्वक पठाइयो!' : 'Message Sent Successfully!'}
                </h4>
                <p className="font-mono-code text-xs text-[#111111]/70">
                  {lang === 'ne'
                    ? 'हाम्रो टोलीले यथाशीघ्र तपाईंलाई सम्पर्क गर्नेछ। धन्यवाद।'
                    : 'Thank you for reaching out. We will get back to you shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-brutal-primary text-xs py-2 px-4 mt-2"
                >
                  {lang === 'ne' ? 'अर्को सन्देश पठाउनुहोस्' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label block mb-1">{t.applicantName} *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="label block mb-1">{t.applicantPhone} *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977-98xxxxxxxx"
                      className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label block mb-1">{t.applicantEmail}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="label block mb-1">{lang === 'ne' ? 'विषय' : 'Subject'}</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Savings, Loan, Membership, etc."
                      className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="label block mb-1">{lang === 'ne' ? 'सन्देश विवरण' : 'Message'} *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-brutal-primary w-full"
                  >
                    <Send className="w-4 h-4 text-[#d6a943]" />
                    <span>{lang === 'ne' ? 'सन्देश पठाउनुहोस्' : 'Send Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
