'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Job {
  id: number;
  title: string;
  type: string;
  requirements: string[];
  benefits: string[];
}

const DEFAULT_JOBS: Job[] = [
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

export default function HiringSection({ applyLabel, requirementLabel, benefitLabel }: {
  applyLabel: string;
  requirementLabel: string;
  benefitLabel: string;
}) {
  const [jobs, setJobs] = useState<Job[]>(DEFAULT_JOBS);

  useEffect(() => {
    supabase.from('jobs').select('*').order('id').then(({ data }) => {
      if (data && data.length > 0) setJobs(data as Job[]);
    });
  }, []);

  return (
    <div className="space-y-8">
      {jobs.map((job) => (
        <div key={job.id} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
            style={{ backgroundColor: 'var(--ez-cream)' }}>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'var(--ez-primary)', color: 'white' }}>
                {job.type}
              </span>
            </div>
            <a
              href={`mailto:info@ezenglish.vn?subject=Apply: ${job.title}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium text-sm self-start transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--ez-primary)' }}
            >
              <Mail className="w-4 h-4" />
              {applyLabel}
            </a>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">{requirementLabel}</h3>
              <ul className="space-y-2">
                {job.requirements.filter(Boolean).map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-400" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">{benefitLabel}</h3>
              <ul className="space-y-2">
                {job.benefits.filter(Boolean).map((ben, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                    {ben}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
