export interface ChatKeyword {
  id: number;
  keyword: string;
  reply: string;
}

export interface ChatConfig {
  keywords: ChatKeyword[];
  quickReplies: string[];
  welcomeMessage: string;
  defaultReply: string;
}

export const DEFAULT_CHAT_CONFIG: ChatConfig = {
  welcomeMessage: 'Xin chào! 👋 Mình là trợ lý EZ English. Mình có thể giúp gì cho bạn?',
  defaultReply: 'Cảm ơn bạn đã nhắn tin cho EZ English! 🎉 Tư vấn viên sẽ phản hồi sớm nhất. Hoặc gọi ngay 📞 0912 345 678 để được hỗ trợ nhanh hơn nhé!',
  quickReplies: ['Học phí các lớp?', 'Lịch học như thế nào?', 'Đăng ký học thử?', 'Liên hệ trung tâm'],
  keywords: [
    { id: 1, keyword: 'học phí', reply: 'Học phí tại EZ English rất cạnh tranh và phù hợp với từng chương trình. Bạn vui lòng để lại số điện thoại, tư vấn viên sẽ liên hệ báo giá chi tiết nhé! 😊' },
    { id: 2, keyword: 'lịch học', reply: 'EZ English có lịch học linh hoạt: buổi sáng, chiều và tối, cả tuần. Bạn muốn đăng ký lớp nào để tư vấn lịch phù hợp?' },
    { id: 3, keyword: 'đăng ký', reply: 'Bạn có thể đăng ký học thử miễn phí! Vui lòng gọi 📞 0912 345 678 hoặc để lại số điện thoại để chúng mình liên hệ nhé!' },
    { id: 4, keyword: 'liên hệ', reply: 'Bạn có thể liên hệ EZ English qua:\n📞 0912 345 678\n📍 Hạ Long, Quảng Ninh\n⏰ 8:00 – 21:00 hàng ngày' },
  ],
};

const STORAGE_KEY = 'ez_chat_config';

export function loadChatConfig(): ChatConfig {
  if (typeof window === 'undefined') return DEFAULT_CHAT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_CHAT_CONFIG, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_CHAT_CONFIG;
}

export function saveChatConfig(config: ChatConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
