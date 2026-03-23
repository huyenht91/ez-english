export interface NewsItem {
  id: number;
  type: 'event' | 'announcement' | 'news';
  title: string;
  date: string;        // display string e.g. '21/07/2025'
  sortDate: string;    // ISO date for sorting e.g. '2025-07-21'
  description: string;
  tag: string;
  image?: string;
  fullContent?: string;
}

export const MOCK_EVENTS: Record<string, NewsItem[]> = {
  vi: [
    {
      id: 10,
      type: 'announcement',
      title: 'THÔNG BÁO LỊCH NGHỈ LỄ QUỐC KHÁNH 2/9 📣',
      date: '28/08/2025',
      sortDate: '2025-08-28',
      tag: 'Thông báo',
      image: '/quoc-khanh-2025.png',
      description: 'EZ English thông báo lịch nghỉ Quốc khánh 2/9: nghỉ 4 ngày từ Thứ Bảy 30/8 đến hết Thứ Ba 2/9/2025. Học lại từ Thứ Tư 3/9/2025.',
      fullContent: `🇻🇳🇻🇳🇻🇳 Nhân dịp kỷ niệm 80 năm ngày Quốc khánh nước Cộng hoà xã hội chủ nghĩa Việt Nam, EZ English xin trân trọng thông báo lịch nghỉ lễ:\n\n🎉 Thời gian nghỉ: 4 ngày\nTừ Thứ Bảy 30/8 đến hết Thứ Ba 2/9/2025\n\n💌 Thời gian làm việc trở lại: Thứ Tư 3/9/2025\n\nEZ English kính chúc Quý phụ huynh và gia đình có một kỳ nghỉ nhiều niềm vui và ý nghĩa!`,
    },
    {
      id: 0,
      type: 'announcement',
      title: 'THÔNG BÁO LỊCH NGHỈ TẾT DƯƠNG LỊCH 2026 🌸',
      date: '26/12/2025',
      sortDate: '2025-12-26',
      tag: 'Thông báo',
      image: '/tet-duong-2026.png',
      description: 'EZ ENGLISH trân trọng thông báo lịch nghỉ Tết Dương lịch 2026: nghỉ từ 01/01 đến 04/01/2026. Học lại từ thứ Hai 05/01/2026.',
      fullContent: `🎉 EZ ENGLISH trân trọng thông báo đến Quý phụ huynh lịch nghỉ Tết Dương lịch 2026 như sau:\n\n🎏 Thời gian nghỉ lễ: (04 ngày)\nTừ Thứ Năm, ngày 01/01/2026 đến hết Chủ Nhật, ngày 04/01/2026.\n\n⏰ Thời gian học tập và làm việc trở lại:\nThứ Hai, ngày 05/01/2026.\n\n❣️ EZ ENGLISH kính chúc Quý phụ huynh, các con và gia đình một kỳ nghỉ lễ vui vẻ, an lành và hạnh phúc.\nTrân trọng!`,
    },
    {
      id: 7,
      type: 'event',
      title: '🏖️ PICNIC TIME! TWINKLE SUMMER 2025',
      date: '21/07/2025',
      sortDate: '2025-07-21',
      tag: 'Sự kiện',
      image: '/twinkle-summer-2025.png',
      description: 'Chuyến dã ngoại hè đặc biệt dành cho học viên EZ English tại Khách sạn Oakwood, Bãi Cháy.',
      fullContent: `🎉 PICNIC TIME! TWINKLE SUMMER 2025\n\n📅 Ngày đi: Thứ Hai, 21/07/2025\n📝 Đăng ký trước: Thứ Ba, 15/07/2025\n\n💰 Học phí:\n• Học viên EZ: 560.000đ\n• Ngoài EZ: 680.000đ\n\n👧 Chỉ dành cho học viên 4 tuổi trở lên\n(Không nhận kèm phụ huynh)\n\n📍 Địa điểm: Khách sạn Oakwood (Bãi Cháy)\n\n📞 Hotline: 0943. 906. 204`,
    },
    {
      id: 9,
      type: 'event',
      title: 'Chương trình thi thử Cambridge 2025 🎓',
      date: 'Tháng 3/2025',
      sortDate: '2025-03-01',
      tag: 'Sự kiện',
      image: '/cambridge-mocktest-2025.png',
      description: 'Chương trình thi thử Cambridge phiên bản 2025 sẽ diễn ra vào tháng 3. Các học viên EZ lên tinh thần!',
      fullContent: `🎓 Chương trình thi thử Cambridge phiên bản 2025 sẽ diễn ra vào tháng 3 tới.\n\nCác học viên EZ lên tinh thần vì một mùa hè vẫn học mà vẫn chơi hết mình nhé 🤩🤩🤩\n\nChi tiết các thầy cô sẽ nhắn bố mẹ ạ 😇\n\n📞 Hotline: 0943. 906. 204`,
    },
    {
      id: 8,
      type: 'announcement',
      title: 'Thông báo lịch nghỉ lễ Giỗ tổ Hùng Vương 2025 🇻🇳',
      date: '04/04/2025',
      sortDate: '2025-04-04',
      tag: 'Thông báo',
      description: 'EZ ENGLISH thông báo lịch nghỉ lễ Giỗ tổ Hùng Vương 2025: nghỉ 2 ngày, Chủ nhật 06/4 và thứ Hai 07/4/2025.',
      fullContent: `🎉 EZ ENGLISH trân trọng thông báo đến Quý phụ huynh lịch nghỉ lễ Giỗ tổ Hùng Vương 2025 🎉\n\n⏰ Thời gian nghỉ lễ: 2 ngày\nChủ nhật 06/4 và Thứ Hai 07/4/2025\n\n❣️ Kính chúc Quý phụ huynh, các con cùng gia đình có một kỳ nghỉ lễ vui vẻ và hạnh phúc.\n\nTrân trọng!`,
    },
    {
      id: 11,
      type: 'news',
      title: 'Nhận chứng chỉ Cambridge 10/2025 🎉🎉🎉',
      date: 'Tháng 10/2025',
      sortDate: '2025-10-01',
      tag: 'Tin tức nổi bật',
      image: '/cambridge-cert-2025.png',
      description: 'Sau một mùa hè miệt mài ôn luyện và kỳ thi đầy hồi hộp, chứng chỉ Cambridge đã chính thức về tay các con.',
      fullContent: `🎉 Chứng chỉ Cambridge đã về tay!\n\nMột mùa hè ôn luyện nghiêm túc với ít nhất 4 tiết mỗi tuần, rồi đến ngày thi căng thẳng giữa buổi sáng mưa to tầm tã — thế mà các con vẫn bước vào phòng thi với tinh thần thép và hoàn thành xuất sắc.\n\nChứng chỉ đã về tay là minh chứng xứng đáng cho sự kiên trì, nỗ lực và kỷ luật của từng bạn. 🧑🏻‍🎓👨🏻‍🎓\n\nThầy cô ghi lại khoảnh khắc đáng nhớ này để chúng mình cùng lưu giữ mãi nhé! 🎁🎁🎁`,
    },
  ],
  en: [
    {
      id: 10,
      type: 'announcement',
      title: 'National Day Holiday 2/9 📣',
      date: 'Aug 28, 2025',
      sortDate: '2025-08-28',
      tag: 'Announcement',
      image: '/quoc-khanh-2025.png',
      description: 'EZ English announces the National Day holiday: 4 days off from Saturday Aug 30 to Tuesday Sep 2, 2025. Classes resume Wednesday Sep 3, 2025.',
      fullContent: `🇻🇳🇻🇳🇻🇳 On the occasion of the 80th anniversary of the National Day of the Socialist Republic of Vietnam, EZ English would like to announce the holiday schedule:\n\n🎉 Holiday period: 4 days\nFrom Saturday, August 30 to Tuesday, September 2, 2025\n\n💌 Return to work/classes: Wednesday, September 3, 2025\n\nEZ English wishes all parents and families a joyful and meaningful holiday!`,
    },
    {
      id: 0,
      type: 'announcement',
      title: 'New Year Holiday Schedule 2026 🌸',
      date: 'Dec 26, 2025',
      sortDate: '2025-12-26',
      tag: 'Announcement',
      image: '/tet-duong-2026.png',
      description: 'EZ ENGLISH announces the New Year 2026 holiday: off from Jan 1–4, 2026. Classes resume Monday Jan 5, 2026.',
      fullContent: `🎉 EZ ENGLISH would like to inform parents of the New Year 2026 holiday schedule:\n\n🎏 Holiday period: (4 days)\nFrom Thursday, January 1, 2026 to Sunday, January 4, 2026.\n\n⏰ Classes and work resume:\nMonday, January 5, 2026.\n\n❣️ EZ ENGLISH wishes all parents, students, and families a joyful, safe, and happy holiday.\nWarm regards!`,
    },
    {
      id: 7,
      type: 'event',
      title: '🏖️ PICNIC TIME! TWINKLE SUMMER 2025',
      date: 'Jul 21, 2025',
      sortDate: '2025-07-21',
      tag: 'Event',
      image: '/twinkle-summer-2025.png',
      description: 'A special summer picnic for EZ English students at Oakwood Hotel, Bai Chay.',
      fullContent: `🎉 PICNIC TIME! TWINKLE SUMMER 2025\n\n📅 Trip date: Monday, July 21, 2025\n📝 Registration deadline: Tuesday, July 15, 2025\n\n💰 Fees:\n• EZ students: 560,000 VND\n• Non-EZ students: 680,000 VND\n\n👧 For students aged 4 and above only\n(Parents are not permitted to join)\n\n📍 Venue: Oakwood Hotel (Bai Chay)\n\n📞 Hotline: 0943. 906. 204`,
    },
    {
      id: 9,
      type: 'event',
      title: 'Cambridge Mock Test 2025 🎓',
      date: 'March 2025',
      sortDate: '2025-03-01',
      tag: 'Event',
      image: '/cambridge-mocktest-2025.png',
      description: 'Cambridge Mock Test 2025 is happening in March. EZ students, get ready for a summer of learning and fun!',
      fullContent: `🎓 The Cambridge Mock Test 2025 program is coming this March!\n\nEZ students, get excited — because it's a summer where you learn AND have a great time 🤩🤩🤩\n\nTeachers will send details to parents soon 😇\n\n📞 Hotline: 0943. 906. 204`,
    },
    {
      id: 8,
      type: 'announcement',
      title: 'Hung Kings Commemoration Day Holiday 2025 🇻🇳',
      date: 'Apr 04, 2025',
      sortDate: '2025-04-04',
      tag: 'Announcement',
      description: 'EZ ENGLISH announces the Hung Kings holiday 2025: 2 days off on Sunday Apr 6 and Monday Apr 7, 2025.',
      fullContent: `🎉 EZ ENGLISH would like to inform parents of the Hung Kings Commemoration Day 2025 holiday schedule 🎉\n\n⏰ Holiday period: 2 days\nSunday, April 6 and Monday, April 7, 2025\n\n❣️ EZ ENGLISH wishes all parents, students, and families a joyful and happy holiday.\n\nWarm regards!`,
    },
    {
      id: 11,
      type: 'news',
      title: 'Cambridge Certificates Received — October 2025 🎉🎉🎉',
      date: 'October 2025',
      sortDate: '2025-10-01',
      tag: 'News',
      image: '/cambridge-cert-2025.png',
      description: 'After a summer of dedicated study and a nerve-wracking exam day, our students have officially received their Cambridge certificates.',
      fullContent: `🎉 Cambridge Certificates Are In!\n\nA whole summer of focused study — at least 4 lessons a week — leading up to an exam morning that was nothing short of nerve-wracking (pouring rain and all!). Yet our students walked in with confidence and came out with flying colours.\n\nThose certificates are the well-deserved reward for every late night, every grammar drill, and every ounce of discipline. 🧑🏻‍🎓👨🏻‍🎓\n\nYour teachers are sharing these photos to capture this milestone — a memory worth keeping forever! 🎁🎁🎁`,
    },
  ],
};

export const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'Thông báo': { bg: '#fff3e0', text: '#F47920' },
  Announcement: { bg: '#fff3e0', text: '#F47920' },
  'Sự kiện': { bg: '#FFF3EE', text: '#FF6B35' },
  Event: { bg: '#FFF3EE', text: '#FF6B35' },
  Workshop: { bg: '#F0FFF0', text: '#4CAF50' },
  'Tin tức nổi bật': { bg: '#FFF9EE', text: '#F5A623' },
  News: { bg: '#FFF9EE', text: '#F5A623' },
};
