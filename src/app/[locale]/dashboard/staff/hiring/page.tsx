'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Trash2, PlusCircle, ChevronDown, ChevronUp, Plus, X, Save } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  type: string;
  requirements: string[];
  benefits: string[];
}

const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    title: 'Giáo viên Ngữ pháp',
    type: 'Toàn thời gian',
    requirements: [
      'IELTS 7.0 trở lên hoặc bằng cấp tương đương',
      'Có ít nhất 1 năm kinh nghiệm dạy Ngữ pháp tiếng Anh',
      'Kỹ năng giao tiếp và thuyết trình tốt',
      'Nhiệt tình, trách nhiệm',
    ],
    benefits: [
      'Lương cạnh tranh, trao đổi khi phỏng vấn',
      'Môi trường làm việc chuyên nghiệp',
      'Được đào tạo nội bộ',
      'Thưởng theo kết quả học viên',
    ],
  },
  {
    id: 2,
    title: 'Giáo viên Cambridge (Thiếu nhi)',
    type: 'Bán thời gian / Toàn thời gian',
    requirements: [
      'Bằng cấp Cambridge TKT hoặc CELTA là lợi thế',
      'Yêu thích và có kinh nghiệm dạy trẻ em',
      'Sáng tạo, vui vẻ, kiên nhẫn',
      'IELTS 7.0 trở lên',
    ],
    benefits: [
      'Lương cạnh tranh, trao đổi khi phỏng vấn',
      'Lịch dạy linh hoạt',
      'Tài liệu giảng dạy được cung cấp đầy đủ',
      'Cơ hội thăng tiến',
    ],
  },
  {
    id: 3,
    title: 'Nhân viên Tư vấn Tuyển sinh',
    type: 'Toàn thời gian',
    requirements: [
      'Kỹ năng giao tiếp, thuyết phục tốt',
      'Tiếng Anh giao tiếp cơ bản',
      'Ưu tiên có kinh nghiệm tư vấn giáo dục',
      'Nhiệt tình, chủ động',
    ],
    benefits: [
      'Lương cơ bản + hoa hồng hấp dẫn, trao đổi khi phỏng vấn',
      'Thưởng KPI hàng tháng',
      'Được học tiếng Anh miễn phí',
      'Bảo hiểm đầy đủ',
    ],
  },
];

function ListEditor({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const add = () => onChange([...items, '']);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, val: string) => onChange(items.map((v, idx) => idx === i ? val : v));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
          />
          <button type="button" onClick={() => remove(i)} className="text-gray-300 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={add}
        className="flex items-center gap-1 text-xs font-medium mt-1 hover:opacity-80 transition-opacity"
        style={{ color: 'var(--ez-primary)' }}>
        <Plus className="w-3.5 h-3.5" /> Thêm dòng
      </button>
    </div>
  );
}

export default function StaffHiringPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newJob, setNewJob] = useState<Omit<Job, 'id'>>({
    title: '', type: 'Toàn thời gian', requirements: [''], benefits: [''],
  });
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const savedSnapshot = useRef(JSON.stringify(INITIAL_JOBS));

  useEffect(() => {
    setHasChanges(JSON.stringify(jobs) !== savedSnapshot.current);
  }, [jobs]);

  const updateJob = (id: number, field: keyof Job, value: string | string[]) =>
    setJobs(jobs.map((j) => j.id === id ? { ...j, [field]: value } : j));

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((j) => j.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setJobs([...jobs, { id: Date.now(), ...newJob }]);
    setNewJob({ title: '', type: 'Toàn thời gian', requirements: [''], benefits: [''] });
    setAddOpen(false);
  };

  const handleSave = () => {
    savedSnapshot.current = JSON.stringify(jobs);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ez-cream)' }}>
      <div className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push(`/${locale}/dashboard`)} className="text-gray-400 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-gray-800">💼 Tuyển dụng</span>
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
        {/* Existing jobs */}
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <button
                className="flex items-center gap-3 flex-1 text-left"
                onClick={() => setExpanded(expanded === job.id ? null : job.id)}
              >
                <span className="font-semibold text-gray-800 text-sm">{job.title}</span>
                <span className="text-xs text-gray-400 ml-1">· {job.type}</span>
                {expanded === job.id
                  ? <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />}
              </button>
              <button onClick={() => handleDelete(job.id)}
                className="ml-4 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {expanded === job.id && (
              <div className="border-t border-gray-100 p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tên vị trí</label>
                    <input value={job.title} onChange={(e) => updateJob(job.id, 'title', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Loại công việc</label>
                    <select value={job.type} onChange={(e) => updateJob(job.id, 'type', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400">
                      <option>Toàn thời gian</option>
                      <option>Bán thời gian</option>
                      <option>Bán thời gian / Toàn thời gian</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">✅ Yêu cầu</label>
                  <ListEditor
                    items={job.requirements}
                    onChange={(v) => updateJob(job.id, 'requirements', v)}
                    placeholder="Nhập yêu cầu..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">🎁 Quyền lợi</label>
                  <ListEditor
                    items={job.benefits}
                    onChange={(v) => updateJob(job.id, 'benefits', v)}
                    placeholder="Nhập quyền lợi..."
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add new job */}
        <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
          <button onClick={() => setAddOpen(!addOpen)}
            className="w-full flex items-center gap-2 px-5 py-4 font-semibold text-left"
            style={{ color: 'var(--ez-primary)' }}>
            <PlusCircle className="w-5 h-5" />
            Thêm vị trí tuyển dụng
          </button>

          {addOpen && (
            <form onSubmit={handleAdd} className="border-t border-gray-100 p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tên vị trí *</label>
                  <input required value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="Ví dụ: Giáo viên Ngữ pháp"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Loại công việc</label>
                  <select value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400">
                    <option>Toàn thời gian</option>
                    <option>Bán thời gian</option>
                    <option>Bán thời gian / Toàn thời gian</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">✅ Yêu cầu</label>
                <ListEditor
                  items={newJob.requirements}
                  onChange={(v) => setNewJob({ ...newJob, requirements: v })}
                  placeholder="Nhập yêu cầu..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">🎁 Quyền lợi</label>
                <ListEditor
                  items={newJob.benefits}
                  onChange={(v) => setNewJob({ ...newJob, benefits: v })}
                  placeholder="Nhập quyền lợi..."
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setAddOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all">
                  Huỷ
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all"
                  style={{ backgroundColor: 'var(--ez-primary)' }}>
                  Thêm vị trí
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
