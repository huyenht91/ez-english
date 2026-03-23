'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const ICONS = ['🎯', '🏆', '⭐', '📚', '🎓', '🌟', '✏️', '🎨'];

interface Course {
  key: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  levels: string;
  icon: string;
}

const INITIAL: Course[] = [
  {
    key: 'grammar',
    nameVi: 'Lớp Ngữ pháp',
    nameEn: 'Grammar Class',
    descVi: 'Chương trình Ngữ pháp tiếng Anh từ cơ bản đến nâng cao, giúp học viên nắm vững nền tảng và tự tin giao tiếp',
    descEn: 'English grammar from beginner to advanced, building a strong foundation for confident communication',
    levels: 'Lớp 3, Lớp 4, Lớp 5, Lớp 6, Lớp 7',
    icon: '🎯',
  },
  {
    key: 'cambridge',
    nameVi: 'Cambridge',
    nameEn: 'Cambridge',
    descVi: 'Chứng chỉ Cambridge quốc tế, được công nhận toàn cầu',
    descEn: 'International Cambridge certificates recognized worldwide',
    levels: 'Starters, Movers, Flyers, KET, PET',
    icon: '🏆',
  },
  {
    key: 'kids',
    nameVi: 'Câu lạc bộ tiếng Anh',
    nameEn: 'Kids Speaking Club',
    descVi: 'Môi trường học vui vẻ, giúp trẻ tự tin giao tiếp tiếng Anh',
    descEn: 'A fun environment helping children speak English confidently',
    levels: '5–7 tuổi, 8–10 tuổi, 11–12 tuổi',
    icon: '⭐',
  },
];

export default function StaffCoursesPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ez_courses');
      if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length > 0) return p; } catch {} }
    }
    return INITIAL;
  });
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const savedSnapshot = useRef(
    typeof window !== 'undefined' && localStorage.getItem('ez_courses')
      ? localStorage.getItem('ez_courses')!
      : JSON.stringify(INITIAL)
  );

  useEffect(() => {
    setHasChanges(JSON.stringify(courses) !== savedSnapshot.current);
  }, [courses]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<Omit<Course, 'key'>>({
    nameVi: '', nameEn: '', descVi: '', descEn: '', levels: '', icon: '🎯',
  });

  const update = (key: string, field: string, value: string) =>
    setCourses(courses.map((c) => c.key === key ? { ...c, [field]: value } : c));

  const handleDelete = (key: string) => {
    setCourses(courses.filter((c) => c.key !== key));
    if (expanded === key) setExpanded(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const key = `course-${Date.now()}`;
    setCourses([...courses, { key, ...newCourse }]);
    setNewCourse({ nameVi: '', nameEn: '', descVi: '', descEn: '', levels: '', icon: '🎯' });
    setAddOpen(false);
    setExpanded(key);
  };

  const handleSave = () => {
    localStorage.setItem('ez_courses', JSON.stringify(courses));
    savedSnapshot.current = JSON.stringify(courses);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ez-cream)' }}>
      {/* Header */}
      <div className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push(`/${locale}/dashboard`)} className="text-gray-400 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-gray-800">📚 Chỉnh sửa Khóa học</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
            ← Về trang chủ
          </Link>
          <button onClick={handleSave}
            disabled={!hasChanges}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--ez-primary)' }}>
            <Save className="w-4 h-4" />
            {saved ? '✅ Đã lưu!' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {/* Existing courses */}
        {courses.map((course) => (
          <div key={course.key} className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
            {/* Course row */}
            <div className="flex items-center justify-between px-5 py-4">
              <button
                className="flex items-center gap-3 flex-1 text-left"
                onClick={() => setExpanded(expanded === course.key ? null : course.key)}
              >
                <span className="text-2xl">{course.icon}</span>
                <span className="font-semibold text-gray-800">{course.nameVi}</span>
                {expanded === course.key
                  ? <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />}
              </button>
              <button onClick={() => handleDelete(course.key)}
                className="ml-4 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Expanded edit form */}
            {expanded === course.key && (
              <div className="border-t border-gray-100 p-5">
                {/* Icon picker */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-500 mb-2">Biểu tượng</label>
                  <div className="flex gap-2 flex-wrap">
                    {ICONS.map((ic) => (
                      <button key={ic} type="button"
                        onClick={() => update(course.key, 'icon', ic)}
                        className={`w-9 h-9 rounded-lg text-xl flex items-center justify-center transition-all ${
                          course.icon === ic ? 'ring-2 ring-offset-1' : 'bg-gray-50 hover:bg-orange-50'
                        }`}
                        style={course.icon === ic ? { ringColor: 'var(--ez-primary)', backgroundColor: '#fff3e0' } : {}}>
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tên (Tiếng Việt)</label>
                    <input value={course.nameVi} onChange={(e) => update(course.key, 'nameVi', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Name (English)</label>
                    <input value={course.nameEn} onChange={(e) => update(course.key, 'nameEn', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Mô tả (Tiếng Việt)</label>
                    <textarea value={course.descVi} onChange={(e) => update(course.key, 'descVi', e.target.value)}
                      rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Description (English)</label>
                    <textarea value={course.descEn} onChange={(e) => update(course.key, 'descEn', e.target.value)}
                      rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Cấp độ / Nhóm tuổi (phân cách bằng dấu phẩy)</label>
                    <input value={course.levels} onChange={(e) => update(course.key, 'levels', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add new course */}
        <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
          {courses.length >= 10 ? (
            <div className="px-5 py-4 text-sm text-gray-400 text-center">
              Đã đạt tối đa 10 khóa học.
            </div>
          ) : (
          <button onClick={() => setAddOpen(!addOpen)}
            className="w-full flex items-center gap-2 px-5 py-4 text-left font-semibold"
            style={{ color: 'var(--ez-primary)' }}>
            <PlusCircle className="w-5 h-5" />
            Thêm khóa học mới ({courses.length}/10)
          </button>
          )}

          {addOpen && courses.length < 10 && (
            <form onSubmit={handleAdd} className="border-t border-gray-100 p-5 space-y-4">
              {/* Icon picker */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Biểu tượng</label>
                <div className="flex gap-2 flex-wrap">
                  {ICONS.map((ic) => (
                    <button key={ic} type="button"
                      onClick={() => setNewCourse({ ...newCourse, icon: ic })}
                      className={`w-9 h-9 rounded-lg text-xl flex items-center justify-center transition-all ${
                        newCourse.icon === ic ? 'ring-2 ring-offset-1 bg-orange-50' : 'bg-gray-50 hover:bg-orange-50'
                      }`}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tên (Tiếng Việt) *</label>
                  <input required value={newCourse.nameVi} onChange={(e) => setNewCourse({ ...newCourse, nameVi: e.target.value })}
                    placeholder="Ví dụ: Lớp Ngữ pháp"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Name (English)</label>
                  <input value={newCourse.nameEn} onChange={(e) => setNewCourse({ ...newCourse, nameEn: e.target.value })}
                    placeholder="e.g. Grammar Class"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Mô tả (Tiếng Việt)</label>
                  <textarea value={newCourse.descVi} onChange={(e) => setNewCourse({ ...newCourse, descVi: e.target.value })}
                    rows={2} placeholder="Mô tả ngắn về khóa học..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description (English)</label>
                  <textarea value={newCourse.descEn} onChange={(e) => setNewCourse({ ...newCourse, descEn: e.target.value })}
                    rows={2} placeholder="Short course description..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Cấp độ / Nhóm tuổi (phân cách bằng dấu phẩy)</label>
                  <input value={newCourse.levels} onChange={(e) => setNewCourse({ ...newCourse, levels: e.target.value })}
                    placeholder="Ví dụ: Lớp 3, Lớp 4, Lớp 5"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setAddOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all">
                  Huỷ
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all"
                  style={{ backgroundColor: 'var(--ez-primary)' }}>
                  Thêm khóa học
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
