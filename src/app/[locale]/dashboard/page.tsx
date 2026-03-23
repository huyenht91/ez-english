'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, Eye, EyeOff, Star, Trash2, ImagePlus, ClipboardList, Phone, Save, Pencil } from 'lucide-react';
import { useParams } from 'next/navigation';
import { SUPER_STARS_VI, type SuperStar, COLORS } from '@/data/superstars';
import ChatManager from '@/components/layout/ChatManager';
import { supabase } from '@/lib/supabase';

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'huyen.ht91@gmail.com' && password === '1234') {
      onLogin();
    } else {
      setError('Email hoặc mật khẩu không đúng.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--ez-cream)' }}>
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3"
            style={{ backgroundColor: 'var(--ez-primary)' }}>
            EZ
          </div>
          <h1 className="text-xl font-bold text-gray-800">EZ English Staff Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Đăng nhập để quản lý nội dung</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-400 text-sm"
              placeholder="staff@ezenglish.vn"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 focus:outline-none focus:border-orange-400 text-sm"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          <button type="submit"
            className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--ez-primary)' }}>
            <LogIn className="w-4 h-4" />
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

function SuperStarManager() {
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState<SuperStar[]>(SUPER_STARS_VI);
  const [hasChanges, setHasChanges] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [achievement, setAchievement] = useState('');
  const [quote, setQuote] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from('superstars').select('*').order('id').then(({ data }) => {
      if (data && data.length > 0) setStars(data as SuperStar[]);
    });
  }, []);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const updateStars = (updated: SuperStar[]) => {
    setStars(updated);
    setHasChanges(true);
  };

  const handleSave = async () => {
    await supabase.from('superstars').delete().neq('id', 0);
    await supabase.from('superstars').insert(stars.map(({ id: _id, ...s }) => s));
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newStar: SuperStar = {
      id: Date.now(),
      name,
      achievement,
      quote,
      avatar: '⭐',
      color,
      image: preview ?? undefined,
    };
    updateStars([...stars, newStar]);
    setName(''); setAchievement(''); setQuote(''); setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDelete = (id: number) => {
    updateStars(stars.filter((s) => s.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const handleEdit = (id: number, field: keyof SuperStar, value: string) => {
    updateStars(stars.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="mt-6 bg-white rounded-2xl border border-orange-100 p-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-bold text-gray-800">
          <Star className="w-5 h-5" style={{ color: 'var(--ez-primary)' }} />
          Super Star
          <span className="text-gray-400 text-sm ml-1">{open ? '▲' : '▼'}</span>
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--ez-primary)' }}
        >
          <Save className="w-4 h-4" />
          {saved ? '✅ Đã lưu!' : 'Lưu thay đổi'}
        </button>
      </div>

      {open && (
        <div className="mt-5 space-y-6">
          {/* Existing stars */}
          <div className="space-y-2">
            {stars.map((star) => (
              <div key={star.id} className="rounded-xl border border-gray-100 overflow-hidden">
                {/* Row */}
                <div className="flex items-center gap-3 p-3 bg-gray-50">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                    style={{ border: `2px solid ${star.color}40` }}>
                    {star.image ? (
                      <Image src={star.image} alt={star.name} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: star.color + '20' }}>{star.avatar}</div>
                    )}
                  </div>
                  <button className="flex-1 text-left min-w-0" onClick={() => setExpanded(expanded === star.id ? null : star.id)}>
                    <p className="font-semibold text-gray-800 text-sm truncate">{star.name}</p>
                    <p className="text-xs text-gray-500 truncate">{star.achievement}</p>
                  </button>
                  <button onClick={() => setExpanded(expanded === star.id ? null : star.id)}
                    className="text-gray-300 hover:text-orange-400 transition-colors flex-shrink-0">
                    <Pencil className={`w-4 h-4 transition-colors ${expanded === star.id ? 'text-orange-400' : ''}`} />
                  </button>
                  <button onClick={() => handleDelete(star.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 ml-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Edit form */}
                {expanded === star.id && (
                  <div className="p-4 border-t border-gray-100 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Tên học viên</label>
                      <input value={star.name} onChange={(e) => handleEdit(star.id, 'name', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Thành tích</label>
                      <input value={star.achievement} onChange={(e) => handleEdit(star.id, 'achievement', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Lời chia sẻ</label>
                      <textarea value={star.quote} onChange={(e) => handleEdit(star.id, 'quote', e.target.value)}
                        rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Màu thẻ</label>
                      <div className="flex gap-2">
                        {COLORS.map((c) => (
                          <button key={c} type="button" onClick={() => handleEdit(star.id, 'color', c)}
                            className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                            style={{ backgroundColor: c, outline: star.color === c ? `3px solid ${c}` : 'none', outlineOffset: '2px' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add new star form */}
          {stars.length >= 10 ? (
            <div className="border-t border-gray-100 pt-5 text-center text-sm text-gray-400">
              Đã đạt tối đa 10 Super Star.
            </div>
          ) : (
          <form onSubmit={handleAdd} className="border-t border-gray-100 pt-5 space-y-4">
            <p className="text-sm font-semibold text-gray-700">➕ Thêm học viên mới ({stars.length}/10)</p>

            {/* Photo upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh học viên</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-dashed border-orange-200 flex items-center justify-center bg-orange-50">
                  {preview ? (
                    <Image src={preview} alt="preview" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <ImagePlus className="w-6 h-6 text-orange-300" />
                  )}
                </div>
                <div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" id="star-photo" />
                  <label htmlFor="star-photo"
                    className="cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors hover:bg-orange-50"
                    style={{ borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' }}>
                    Chọn ảnh
                  </label>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG — tối đa 2MB</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên học viên</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400" />
            </div>

            {/* Achievement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thành tích</label>
              <input type="text" value={achievement} onChange={(e) => setAchievement(e.target.value)} required
                placeholder="Cambridge KET — Grade A"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400" />
            </div>

            {/* Quote */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lời chia sẻ</label>
              <textarea value={quote} onChange={(e) => setQuote(e.target.value)} required rows={2}
                placeholder="Cảm nhận của học viên..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 resize-none" />
            </div>

            {/* Color picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Màu thẻ</label>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button key={c} type="button" onClick={() => setColor(c)}
                    className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c,
                      outline: color === c ? `3px solid ${c}` : 'none',
                      outlineOffset: '2px',
                    }} />
                ))}
              </div>
            </div>

            <button type="submit"
              className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              Thêm Super Star
            </button>
          </form>
          )}
        </div>
      )}
    </div>
  );
}


interface Registration {
  id: number;
  name: string;
  phone: string;
  course: string;
  date: string;
  status: 'new' | 'contacted' | 'enrolled';
}

const STATUS_LABELS: Record<Registration['status'], string> = {
  new: 'Mới',
  contacted: 'Đã liên hệ',
  enrolled: 'Đã nhập học',
};

const STATUS_COLORS: Record<Registration['status'], string> = {
  new: '#F47920',
  contacted: '#3B82F6',
  enrolled: '#4CAF50',
};

function RegistrationsManager() {
  const [open, setOpen] = useState(false);
  const [regs, setRegs] = useState<Registration[]>([]);

  useEffect(() => {
    supabase.from('registrations').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setRegs(data as Registration[]);
    });
  }, []);

  const handleOpen = () => setOpen(!open);

  const updateStatus = async (id: number, status: Registration['status']) => {
    await supabase.from('registrations').update({ status }).eq('id', id);
    setRegs(regs.map((r) => r.id === id ? { ...r, status } : r));
  };

  const handleDelete = async (id: number) => {
    await supabase.from('registrations').delete().eq('id', id);
    setRegs(regs.filter((r) => r.id !== id));
  };

  const newCount = regs.filter((r) => r.status === 'new').length;

  return (
    <div className="mt-6 bg-white rounded-2xl border border-orange-100 p-6">
      <button onClick={handleOpen}
        className="w-full flex items-center justify-between font-bold text-gray-800">
        <span className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5" style={{ color: 'var(--ez-primary)' }} />
          Đăng ký học thử
          {newCount > 0 && (
            <span className="inline-flex flex-shrink-0 items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              {newCount}
            </span>
          )}
        </span>
        <span className="text-gray-400 text-sm">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="mt-5">
          {regs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Chưa có đăng ký nào.</p>
          ) : (
            <div className="space-y-3">
              {regs.map((reg) => (
                <div key={reg.id}
                  className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-800 text-sm">{reg.name}</p>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: STATUS_COLORS[reg.status] }}>
                        {STATUS_LABELS[reg.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <a href={`tel:${reg.phone}`} className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
                        {reg.phone}
                      </a>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{reg.course} · {reg.date}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {reg.status !== 'contacted' && (
                      <button onClick={() => updateStatus(reg.id, 'contacted')}
                        className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors hover:bg-blue-50"
                        style={{ borderColor: '#3B82F6', color: '#3B82F6' }}>
                        Đã liên hệ
                      </button>
                    )}
                    {reg.status !== 'enrolled' && (
                      <button onClick={() => updateStatus(reg.id, 'enrolled')}
                        className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors hover:bg-green-50"
                        style={{ borderColor: '#4CAF50', color: '#4CAF50' }}>
                        Nhập học
                      </button>
                    )}
                    <button onClick={() => handleDelete(reg.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const MENU = [
  { key: 'tests', label: 'Bài thi thử', icon: '📝', href: '/dashboard/staff/tests' },
  { key: 'courses', label: 'Khóa học', icon: '📚', href: '/dashboard/staff/courses' },
  { key: 'activities', label: 'Tin tức & Sự kiện', icon: '📰', href: '/dashboard/staff/activities' },
  { key: 'hiring', label: 'Tuyển dụng', icon: '💼', href: '/dashboard/staff/hiring' },
];

function Dashboard({ locale }: { locale: string }) {
  const [newRegCount, setNewRegCount] = useState(0);

  useEffect(() => {
    supabase.from('registrations').select('id').eq('status', 'new').then(({ data }) => {
      setNewRegCount(data?.length ?? 0);
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ez-cream)' }}>
      {/* Header */}
      <div className="bg-white border-b border-orange-100 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: 'var(--ez-primary)' }}>
            EZ
          </div>
          <span className="font-bold text-gray-800 text-sm sm:text-base truncate">EZ English — Staff Dashboard</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {newRegCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold animate-pulse"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              <ClipboardList className="w-3.5 h-3.5" />
              {newRegCount} mới
            </span>
          )}
          <Link href={`/${locale}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors whitespace-nowrap">
            ← Về trang chủ
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Xin chào! 👋</h1>
        <p className="text-gray-500 mb-8">Chọn chức năng bạn muốn quản lý:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MENU.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all flex items-center gap-4"
            >
              <div className="text-4xl">{item.icon}</div>
              <div>
                <div className="font-semibold text-gray-800">{item.label}</div>
                <div className="text-sm text-gray-400 mt-0.5">Quản lý nội dung</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Registrations */}
        <RegistrationsManager />

        {/* Super Star manager */}
        <SuperStarManager />

        {/* Chat manager */}
        <ChatManager />

      </div>
    </div>
  );
}

export default function DashboardPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('staff_auth') === '1';
    }
    return false;
  });

  const handleLogin = () => {
    sessionStorage.setItem('staff_auth', '1');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard locale={locale} />;
}
