'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, Trash2, PlusCircle, Calendar, ImagePlus, X, Pencil, ChevronDown, ChevronUp, Check, Save } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_EVENTS, type NewsItem } from '@/data/events';

const EZ_NEWS_KEY = 'ez_news';


export default function StaffActivitiesPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';
  const router = useRouter();
  const [items, setItems] = useState<NewsItem[]>(MOCK_EVENTS['vi'] ?? []);

  useEffect(() => {
    const saved = localStorage.getItem(EZ_NEWS_KEY);
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch {}
    }
  }, []);
  const [hasChanges, setHasChanges] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateItems = (updated: NewsItem[]) => {
    setItems(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem(EZ_NEWS_KEY, JSON.stringify(items));
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // New post form state
  const [type, setType] = useState('event');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<NewsItem & { imagePreview?: string }>>({});
  const editFileRef = useRef<HTMLInputElement>(null);

  const tagMap: Record<string, string> = { event: 'Sự kiện', announcement: 'Thông báo', news: 'Tin tức nổi bật' };
  const typeFromTag: Record<string, string> = { 'Sự kiện': 'event', 'Thông báo': 'announcement', 'Tin tức nổi bật': 'news' };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const d = new Date(date);
    const display = d.toLocaleDateString('vi-VN');
    updateItems([
      {
        id: Date.now(),
        type: type as 'event' | 'announcement' | 'news',
        title,
        date: display,
        sortDate: date,
        description,
        tag: tagMap[type],
        image: imagePreview ?? undefined,
      },
      ...items,
    ]);
    setTitle(''); setDate(''); setDescription(''); clearImage();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const handleDelete = (id: number) => {
    updateItems(items.filter((i) => i.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setEditData({
      title: item.title,
      type: item.type,
      date: item.sortDate,
      description: item.description,
      tag: item.tag,
      image: item.image,
      imagePreview: item.image,
    });
  };

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setEditData({ ...editData, imagePreview: URL.createObjectURL(file) });
  };

  const saveEdit = (id: number) => {
    const d = editData.date ? new Date(editData.date) : null;
    const display = d ? d.toLocaleDateString('vi-VN') : '';
    const newType = editData.type as 'event' | 'announcement' | 'news';
    updateItems(items.map((item) =>
      item.id === id ? {
        ...item,
        title: editData.title ?? item.title,
        type: newType ?? item.type,
        date: display || item.date,
        sortDate: editData.date ?? item.sortDate,
        description: editData.description ?? item.description,
        tag: tagMap[editData.type ?? typeFromTag[item.tag]] ?? item.tag,
        image: editData.imagePreview ?? item.image,
      } : item
    ));
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ez-cream)' }}>
      <div className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push(`/${locale}/dashboard`)} className="text-gray-400 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-gray-800">📰 Tin tức & Sự kiện</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
            ← Về trang chủ
          </Link>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--ez-primary)' }}
          >
            <Save className="w-4 h-4" />
            {saved ? '✅ Đã lưu!' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Add form */}
        <div className="bg-white rounded-2xl border border-orange-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5" style={{ color: 'var(--ez-primary)' }} />
            Tạo bài đăng mới
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-orange-400">
                <option value="event">📅 Sự kiện</option>
                <option value="announcement">📣 Thông báo</option>
                <option value="news">📰 Tin tức nổi bật</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                placeholder="Nhập tiêu đề..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" style={{ color: 'var(--ez-primary)' }} />
                Ngày
              </label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3}
                placeholder="Nhập nội dung..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bài đăng (tuỳ chọn)</label>
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-orange-100">
                  <Image src={imagePreview} alt="preview" width={800} height={400} className="w-full h-48 object-cover" />
                  <button type="button" onClick={clearImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-orange-200 rounded-xl p-6 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all">
                  <ImagePlus className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                  <p className="text-sm text-gray-500">Click để chọn ảnh</p>
                  <p className="text-xs text-gray-400 mt-0.5">JPG, PNG — tối đa 5MB</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </div>
            <button type="submit"
              className="w-full py-2.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              {submitted ? '✅ Đã thêm!' : 'Đăng bài'}
            </button>
          </form>
        </div>

        {/* Post list */}
        <div className="bg-white rounded-2xl border border-orange-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Tất cả bài đăng ({items.length})</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl border border-gray-100 overflow-hidden">
                {/* Row */}
                <div className="flex items-center gap-3 p-3 bg-gray-50">
                  {item.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.title} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.tag} · {item.date}</p>
                  </div>
                  <button onClick={() => editingId === item.id ? setEditingId(null) : startEdit(item)}
                    className="text-gray-300 hover:text-orange-400 transition-colors flex-shrink-0">
                    {editingId === item.id ? <ChevronUp className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Edit panel */}
                {editingId === item.id && (
                  <div className="border-t border-gray-100 p-4 space-y-3 bg-white">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Loại</label>
                      <select value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value as NewsItem['type'] })}
                        className="w-full border border-gray-200 rounded-xl px-3 pr-10 py-2 text-sm focus:outline-none focus:border-orange-400">
                        <option value="event">📅 Sự kiện</option>
                        <option value="announcement">📣 Thông báo</option>
                        <option value="news">📰 Tin tức nổi bật</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Tiêu đề</label>
                      <input value={editData.title ?? ''} onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Ngày</label>
                      <input type="date" value={editData.date ?? ''} onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Nội dung</label>
                      <textarea value={editData.description ?? ''} onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Ảnh</label>
                      {editData.imagePreview ? (
                        <div className="relative rounded-xl overflow-hidden border border-orange-100">
                          <Image src={editData.imagePreview} alt="preview" width={800} height={300} className="w-full h-36 object-cover" />
                          <button type="button"
                            onClick={() => { setEditData({ ...editData, imagePreview: undefined }); if (editFileRef.current) editFileRef.current.value = ''; }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-400 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div onClick={() => editFileRef.current?.click()}
                          className="border-2 border-dashed border-orange-200 rounded-xl p-4 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all">
                          <ImagePlus className="w-6 h-6 mx-auto mb-1 text-orange-300" />
                          <p className="text-xs text-gray-500">Click để chọn ảnh</p>
                        </div>
                      )}
                      <input ref={editFileRef} type="file" accept="image/*" onChange={handleEditImage} className="hidden" />
                    </div>
                    <button onClick={() => saveEdit(item.id)}
                      className="w-full py-2 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'var(--ez-primary)' }}>
                      <Check className="w-4 h-4" /> Lưu thay đổi
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
