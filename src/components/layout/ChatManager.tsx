'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Plus, Trash2, X, Save } from 'lucide-react';

import { loadChatConfig, saveChatConfig, type ChatConfig, type ChatKeyword } from '@/data/chatConfig';

export default function ChatManager() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // New keyword form
  const [newKeyword, setNewKeyword] = useState('');
  const [newReply, setNewReply] = useState('');

  // New quick reply
  const [newQuick, setNewQuick] = useState('');

  useEffect(() => {
    const cfg = loadChatConfig();
    setConfig(cfg);
  }, []);

  if (!config) return null;

  const update = (updated: ChatConfig) => {
    setConfig(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    saveChatConfig(config);
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newReply.trim()) return;
    const kw: ChatKeyword = { id: Date.now(), keyword: newKeyword.trim(), reply: newReply.trim() };
    update({ ...config, keywords: [...config.keywords, kw] });
    setNewKeyword('');
    setNewReply('');
  };

  const deleteKeyword = (id: number) =>
    update({ ...config, keywords: config.keywords.filter((k) => k.id !== id) });

  const updateKeyword = (id: number, field: 'keyword' | 'reply', value: string) =>
    update({ ...config, keywords: config.keywords.map((k) => k.id === id ? { ...k, [field]: value } : k) });

  const addQuickReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuick.trim()) return;
    update({ ...config, quickReplies: [...config.quickReplies, newQuick.trim()] });
    setNewQuick('');
  };

  const deleteQuickReply = (q: string) =>
    update({ ...config, quickReplies: config.quickReplies.filter((r) => r !== q) });

  return (
    <div className="mt-6 bg-white rounded-2xl border border-orange-100 p-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-bold text-gray-800">
          <MessageCircle className="w-5 h-5" style={{ color: 'var(--ez-primary)' }} />
          Chat Bubble
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
        <div className="mt-5 space-y-8">

          {/* Welcome message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tin nhắn chào</label>
            <textarea
              value={config.welcomeMessage}
              onChange={(e) => update({ ...config, welcomeMessage: e.target.value })}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
            />
          </div>

          {/* Default reply */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Trả lời mặc định (khi không khớp từ khoá)</label>
            <textarea
              value={config.defaultReply}
              onChange={(e) => update({ ...config, defaultReply: e.target.value })}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
            />
          </div>

          {/* Quick replies */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Nút gợi ý nhanh</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {config.quickReplies.map((q) => (
                <span key={q} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border"
                  style={{ borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' }}>
                  {q}
                  <button onClick={() => deleteQuickReply(q)} className="hover:text-red-400 transition-colors ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={addQuickReply} className="flex gap-2">
              <input
                value={newQuick}
                onChange={(e) => setNewQuick(e.target.value)}
                placeholder="Thêm gợi ý..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
              <button type="submit"
                className="px-3 py-2 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: 'var(--ez-primary)' }}>
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Keywords */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Từ khoá & Câu trả lời tự động</p>
            <div className="space-y-3">
              {config.keywords.map((kw) => (
                <div key={kw.id} className="rounded-xl border border-gray-100 p-3 space-y-2 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <input
                      value={kw.keyword}
                      onChange={(e) => updateKeyword(kw.id, 'keyword', e.target.value)}
                      placeholder="Từ khoá..."
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-orange-400 bg-white font-medium"
                    />
                    <button onClick={() => deleteKeyword(kw.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={kw.reply}
                    onChange={(e) => updateKeyword(kw.id, 'reply', e.target.value)}
                    rows={2}
                    placeholder="Câu trả lời..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-orange-400 resize-none bg-white"
                  />
                </div>
              ))}
            </div>

            {/* Add keyword form */}
            <form onSubmit={addKeyword} className="mt-4 rounded-xl border border-dashed border-orange-200 p-4 space-y-2 bg-orange-50/40">
              <p className="text-xs font-semibold text-gray-500 mb-1">Thêm từ khoá mới</p>
              <input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Từ khoá (vd: cambridge)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Câu trả lời khi người dùng nhắn từ khoá này..."
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
              />
              <button type="submit"
                className="w-full py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--ez-primary)' }}>
                <Plus className="w-4 h-4" /> Thêm từ khoá
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}
