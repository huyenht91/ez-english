export interface SuperStar {
  id: number;
  name: string;
  achievement: string;
  quote: string;
  avatar: string;
  color: string;
  image?: string; // path to photo in /public
}

export const SUPERSTARS_STORAGE_KEY = 'ez_superstars';

export const COLORS =['#F47920', '#F5A623', '#FF6B35', '#4CAF50', '#3B82F6', '#8B5CF6'];

export const SUPER_STARS_VI: SuperStar[] = [
  {
    id: 1,
    name: 'Nguyễn Minh Châu',
    achievement: 'Cambridge Flyers — Pass with Distinction',
    quote: 'Nhờ thầy cô EZ English mà con tự tin nói tiếng Anh hơn rất nhiều!',
    avatar: '👧',
    color: '#F47920',
  },
  {
    id: 2,
    name: 'Trần Gia Bảo',
    achievement: 'Cambridge Movers — Pass with Merit',
    quote: 'Con rất thích các giờ học vui ở EZ English, học mà như chơi!',
    avatar: '👦',
    color: '#F5A623',
  },
  {
    id: 3,
    name: 'Lê Phương Linh',
    achievement: 'Cambridge KET — Grade A',
    quote: 'EZ English giúp con đạt được kết quả mà con không ngờ tới.',
    avatar: '👧',
    color: '#FF6B35',
  },
  {
    id: 4,
    name: 'Phạm Đức Anh',
    achievement: 'Lớp Ngữ pháp — Xuất sắc',
    quote: 'Thầy cô tận tâm, bài học dễ hiểu, con tiến bộ rất nhanh!',
    avatar: '👦',
    color: '#4CAF50',
  },
  {
    id: 5,
    name: 'Nguyễn Bảo Ngọc',
    achievement: 'Cambridge PET — Grade B',
    quote: 'EZ English đã cho con một nền tảng tiếng Anh vững chắc để tự tin bước vào tương lai!',
    avatar: '👧',
    color: '#3B82F6',
  },
];
