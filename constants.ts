import { Course, Day } from './types';

export const DAYS: Day[] = [
  { short: 'MON', name: '周一', date: 24, fullDate: '2025-02-24' },
  { short: 'TUE', name: '周二', date: 25, fullDate: '2025-02-25' },
  { short: 'WED', name: '周三', date: 26, fullDate: '2025-02-26' },
  { short: 'THU', name: '周四', date: 27, fullDate: '2025-02-27' },
  { short: 'FRI', name: '周五', date: 28, fullDate: '2025-02-28' },
  { short: 'SAT', name: '周六', date: 1, fullDate: '2025-03-01' },
  { short: 'SUN', name: '周日', date: 2, fullDate: '2025-03-02' },
];

export const COURSES: Course[] = []; // Clear mock data for production-like feel

export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];
