'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, Download, Trash2, FileSpreadsheet, CheckCircle, X, Save } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import * as XLSX from 'xlsx';

interface Question {
  number: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
}

interface TestSheet {
  id: number;
  fileName: string;
  date: string;
  questions: Question[];
  timeLimit: number; // minutes
}

function QuestionsTable({ questions }: { questions: Question[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-orange-50 text-left">
            <th className="px-4 py-2 font-semibold text-gray-600 w-10">#</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Câu hỏi</th>
            <th className="px-4 py-2 font-semibold text-gray-600">A</th>
            <th className="px-4 py-2 font-semibold text-gray-600">B</th>
            <th className="px-4 py-2 font-semibold text-gray-600">C</th>
            <th className="px-4 py-2 font-semibold text-gray-600">D</th>
            <th className="px-4 py-2 font-semibold text-gray-600 w-20 text-center">Đúng</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, i) => (
            <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 text-gray-400 text-center">{q.number || i + 1}</td>
              <td className="px-4 py-2 text-gray-800">{q.question}</td>
              {(['a', 'b', 'c', 'd'] as const).map((opt) => (
                <td key={opt} className={`px-4 py-2 text-sm ${q.correct === opt.toUpperCase() ? 'text-green-700 font-semibold' : 'text-gray-600'}`}>
                  {q[opt]}
                </td>
              ))}
              <td className="px-4 py-2 text-center">
                <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: 'var(--ez-primary)' }}>
                  {q.correct}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StaffTestsPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'vi';
  const router = useRouter();
  const [sheets, setSheets] = useState<TestSheet[]>([]);
  const [pending, setPending] = useState<TestSheet | null>(null);
  const [pendingTimeLimit, setPendingTimeLimit] = useState(5);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const savedSnapshot = useRef<string>('');

  // Load active test from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem('ez_mock_test');
    if (!raw) return;
    try {
      const { questions, timeLimit } = JSON.parse(raw);
      if (!Array.isArray(questions) || questions.length === 0) return;
      const sheet: TestSheet = {
        id: 1,
        fileName: 'Bài thi đang hoạt động',
        date: '',
        questions,
        timeLimit: timeLimit ?? 5,
      };
      setSheets([sheet]);
      setExpanded(1);
      savedSnapshot.current = JSON.stringify(sheet.timeLimit);
    } catch { /* ignore */ }
  }, []);

  const parseExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      // Row 0: "Thoi gian lam bai (phut):" | <number>
      // Row 1: column headers
      // Rows 2+: questions
      const timeLimitRaw = rows[0]?.[1];
      const timeLimit = timeLimitRaw ? Math.max(1, parseInt(String(timeLimitRaw), 10) || 5) : 5;

      const questions: Question[] = rows.slice(2)
        .filter((row) => row[1]?.toString().trim())
        .map((row) => ({
          number: row[0]?.toString().trim() ?? '',
          question: row[1]?.toString().trim() ?? '',
          a: row[2]?.toString().trim() ?? '',
          b: row[3]?.toString().trim() ?? '',
          c: row[4]?.toString().trim() ?? '',
          d: row[5]?.toString().trim() ?? '',
          correct: row[6]?.toString().trim().toUpperCase() ?? '',
        }));

      setPendingTimeLimit(timeLimit);
      setPending({
        id: Date.now(),
        fileName: file.name,
        date: new Date().toLocaleDateString('vi-VN'),
        questions,
        timeLimit,
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) parseExcel(file);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseExcel(file);
    e.target.value = '';
  };

  const handleConfirm = () => {
    if (!pending) return;
    const finalTimeLimit = Math.max(1, pendingTimeLimit);
    localStorage.setItem('ez_mock_test', JSON.stringify({ questions: pending.questions, timeLimit: finalTimeLimit }));
    setSheets([{ ...pending, timeLimit: finalTimeLimit }]);
    setExpanded(pending.id);
    savedSnapshot.current = JSON.stringify(finalTimeLimit);
    setHasChanges(false);
    setPending(null);
  };

  const handleCancel = () => setPending(null);

  const handleSave = () => {
    if (sheets.length === 0) return;
    const sheet = sheets[0];
    const existing = localStorage.getItem('ez_mock_test');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        localStorage.setItem('ez_mock_test', JSON.stringify({ ...parsed, timeLimit: sheet.timeLimit }));
      } catch {}
    }
    savedSnapshot.current = JSON.stringify(sheet.timeLimit);
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: number) => {
    setSheets(sheets.filter((s) => s.id !== id));
    if (expanded === id) setExpanded(null);
    localStorage.removeItem('ez_mock_test');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ez-cream)' }}>
      <div className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push(`/${locale}/dashboard`)} className="text-gray-400 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-gray-800">📝 Bài thi thử</span>
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

      <div className="mx-auto px-4 py-10 space-y-6" style={{ maxWidth: '818px' }}>

        {/* Download template */}
        <div className="bg-white rounded-2xl border border-orange-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Mẫu Excel soạn đề</p>
              <p className="text-xs text-gray-400 mt-0.5">A: Số câu · B: Câu hỏi · C/D/E/F: Lựa chọn 1–4 · G: Đáp án đúng (A/B/C/D)</p>
            </div>
          </div>
          <a
            href="/mau-bai-thi-thu.xlsx"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: 'var(--ez-primary)' }}
          >
            <Download className="w-4 h-4" />
            Tải mẫu
          </a>
        </div>

        {/* Upload zone — hide when previewing */}
        {!pending && (
          <div className="bg-white rounded-2xl border border-orange-100 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" style={{ color: 'var(--ez-primary)' }} />
              Tải lên bài thi thử
            </h2>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                dragging ? 'border-orange-400 bg-orange-50' : 'border-orange-200 hover:border-orange-400'
              }`}
            >
              <FileSpreadsheet className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500">Kéo thả file Excel vào đây hoặc click để chọn</p>
              <p className="text-xs text-gray-400 mt-1">.xlsx · .xls</p>
              <input ref={inputRef} type="file" accept=".xlsx,.xls" onChange={handleInput} className="hidden" />
            </div>
          </div>
        )}

        {/* Preview pending upload */}
        {pending && (
          <div className="bg-white rounded-2xl border-2 border-orange-300 overflow-hidden">
            <div className="px-6 py-4 border-b border-orange-100 flex items-center justify-between bg-orange-50">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{pending.fileName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{pending.questions.length} câu hỏi · Xem lại trước khi tải lên</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mx-4">
                <label className="text-xs text-gray-500 whitespace-nowrap">⏱ Thời gian (phút)</label>
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={pendingTimeLimit}
                  onChange={(e) => setPendingTimeLimit(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:border-orange-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Huỷ
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--ez-primary)' }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Xác nhận tải lên
                </button>
              </div>
            </div>
            <QuestionsTable questions={pending.questions} />
          </div>
        )}

        {/* Confirmed sheets */}
        {sheets.map((sheet) => (
          <div key={sheet.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <button
                onClick={() => setExpanded(expanded === sheet.id ? null : sheet.id)}
                className="flex items-center gap-3 flex-1 text-left"
              >
                <FileSpreadsheet className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{sheet.fileName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sheet.questions.length} câu hỏi{sheet.date ? ` · ${sheet.date}` : ''}</p>
                </div>
                <span className="text-gray-400 text-xs ml-2">{expanded === sheet.id ? '▲' : '▼'}</span>
              </button>
              {/* Editable time limit */}
              <div className="flex items-center gap-2 mx-4">
                <label className="text-xs text-gray-500 whitespace-nowrap">⏱ phút</label>
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={sheet.timeLimit}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    const updated = sheets.map((s) => s.id === sheet.id ? { ...s, timeLimit: val } : s);
                    setSheets(updated);
                    setHasChanges(JSON.stringify(val) !== savedSnapshot.current);
                  }}
                  className="w-14 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:border-orange-400"
                />
              </div>
              <button onClick={() => handleDelete(sheet.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {expanded === sheet.id && <QuestionsTable questions={sheet.questions} />}
          </div>
        ))}

      </div>
    </div>
  );
}
