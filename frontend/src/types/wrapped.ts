export interface MonthlyData {
  month: string;
  you: number;
  partner: number;
}

export interface TopWord {
  word: string;
  count: number;
  size: number;
}

export interface RadarItem {
  subject: string;
  A: number;
}

export interface Achievement {
  icon: string;
  title: string;
  desc: string;
  unlocked: boolean;
}

export interface WrappedData {
  totalMessages: number;
  totalWords: number;
  totalMedia: number;
  totalLinks: number;
  totalEmoji: number;

  loveScore: number;

  partner: string;

  favoriteEmoji: string;
  favoriteEmojiCount: number;

  youResponseTime: string;
  partnerResponseTime: string;

  youStartsChat: number;
  partnerStartsChat: number;

  mostActiveTime: string;

  mostRomanticMsg: {
    text: string;
    date: string;
  };

  peakMonth: string;

  monthlyData: MonthlyData[];

  topWords: TopWord[];

  radarData: RadarItem[];

  achievements: Achievement[];

  greenFlags: string[];

  redFlags: string[];
}
