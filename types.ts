export interface Course {
  id: string;
  title: string;
  type: 'Lecture' | 'Seminar' | 'Lab' | 'Workshop';
  day: string; // 'MON', 'TUE', etc.
  startTime: string; // "08:00"
  endTime: string; // "10:00"
  location: string;
  instructor: string;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'indigo' | 'primary-dark';
  description?: string;
  topic?: string;
  department?: string;
  code?: string;
  weeks?: number[]; // Array of week numbers this course is active (e.g., [1,2,3...16])
}

export interface Day {
  short: string; // 'MON', 'TUE' (Internal key)
  name: string; // '周一', '周二' (Display name)
  date: number; // 12
  fullDate: string; // "2023-10-12"
  month?: number; // Added month
  isToday?: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  courseId?: string; // Optional link to a course
}

export interface UserProfile {
  name: string;
  studentId: string;
  major: string;
  avatar?: string;
  email?: string;
  phone?: string;
  notifications?: {
    courseReminder: boolean;
    dailySummary: boolean;
    taskDeadlines: boolean;
  };
}
