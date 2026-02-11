import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { Icons } from './Icon';

interface ProfileTabProps {
  onClearData: () => void;
}

type ViewState = 'main' | 'account' | 'notifications';

const ProfileTab: React.FC<ProfileTabProps> = ({ onClearData }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    studentId: '20230001',
    major: '计算机科学与技术',
    email: 'student@university.edu.cn',
    phone: '13800138000',
    notifications: {
      courseReminder: true,
      dailySummary: false,
      taskDeadlines: true
    }
  });
  
  const [view, setView] = useState<ViewState>('main');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from local storage
  useEffect(() => {
    const savedProfile = localStorage.getItem('academic-timetable-profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        // Merge with defaults to ensure new fields exist
        setProfile(prev => ({
          ...prev,
          ...parsed,
          notifications: { ...prev.notifications, ...parsed.notifications }
        }));
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    }
  }, []);

  // Save profile to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('academic-timetable-profile', JSON.stringify(profile));
  }, [profile]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNotification = (key: keyof NonNullable<UserProfile['notifications']>) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications!,
        [key]: !prev.notifications![key]
      }
    }));
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto relative">
      {view === 'main' && (
        <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-left duration-300">
          {/* Header Profile Card */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#193ce6] to-purple-500 flex items-center justify-center text-2xl font-bold shadow-xl shrink-0 overflow-hidden border-2 border-transparent group-hover:border-white/50 transition-all">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Icons.Plus className="text-white" size={24} /> 
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold truncate">{profile.name}</h2>
              <p className="text-slate-400 truncate">{profile.major}</p>
              <p className="text-slate-500 text-xs mt-1">ID: {profile.studentId}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => setView('account')}
              className="w-full bg-surface rounded-xl p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"><Icons.User size={20}/></div>
              <div className="flex-1">
                <h3 className="font-semibold">账户设置</h3>
                <p className="text-xs text-slate-400">修改姓名、专业、联系方式</p>
              </div>
              <Icons.Back className="rotate-180 text-slate-500" size={16} />
            </button>
            
            <button 
              onClick={() => setView('notifications')}
              className="w-full bg-surface rounded-xl p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"><Icons.Bell size={20}/></div>
              <div className="flex-1">
                <h3 className="font-semibold">通知提醒</h3>
                <p className="text-xs text-slate-400">课程提醒、每日摘要</p>
              </div>
              <Icons.Back className="rotate-180 text-slate-500" size={16} />
            </button>
            
            {/* Clear Data Button */}
            <button 
              onClick={onClearData}
              className="w-full bg-surface rounded-xl p-4 flex items-center gap-4 hover:bg-red-900/20 transition-colors mt-8 border border-red-500/10 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-red-400"><Icons.Delete size={20}/></div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-400">清除数据</h3>
                <p className="text-xs text-slate-400">重置课表缓存</p>
              </div>
            </button>
            
            <div className="text-center mt-8">
                <p className="text-slate-600 text-xs">Academic Timetable v1.1.0</p>
            </div>
          </div>
        </div>
      )}

      {view === 'account' && (
        <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-right duration-300">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setView('main')}
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700 active:scale-95 transition-all"
            >
              <Icons.Back size={20} />
            </button>
            <h2 className="text-2xl font-bold">账户设置</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">姓名</label>
              <input 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full bg-surface border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">学号</label>
              <input 
                value={profile.studentId}
                onChange={e => setProfile({...profile, studentId: e.target.value})}
                className="w-full bg-surface border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">专业</label>
              <input 
                value={profile.major}
                onChange={e => setProfile({...profile, major: e.target.value})}
                className="w-full bg-surface border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">邮箱</label>
              <input 
                value={profile.email || ''}
                onChange={e => setProfile({...profile, email: e.target.value})}
                className="w-full bg-surface border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="example@school.edu"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 ml-1">电话</label>
              <input 
                value={profile.phone || ''}
                onChange={e => setProfile({...profile, phone: e.target.value})}
                className="w-full bg-surface border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="+86..."
              />
            </div>
          </div>
        </div>
      )}

      {view === 'notifications' && (
        <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-right duration-300">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setView('main')}
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700 active:scale-95 transition-all"
            >
              <Icons.Back size={20} />
            </button>
            <h2 className="text-2xl font-bold">通知设置</h2>
          </div>

          <div className="space-y-4">
            {/* Toggle Item */}
            <div className="bg-surface rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#193ce6]/20 flex items-center justify-center text-[#2f54eb]"><Icons.Bell size={20}/></div>
                <div>
                  <h3 className="font-semibold">上课提醒</h3>
                  <p className="text-xs text-slate-400">课前 15 分钟推送通知</p>
                </div>
              </div>
              <button 
                onClick={() => toggleNotification('courseReminder')}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${profile.notifications?.courseReminder ? 'bg-[#2f54eb]' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${profile.notifications?.courseReminder ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-surface rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500"><Icons.Calendar size={20}/></div>
                <div>
                  <h3 className="font-semibold">每日摘要</h3>
                  <p className="text-xs text-slate-400">每晚 8 点推送明日课表</p>
                </div>
              </div>
              <button 
                onClick={() => toggleNotification('dailySummary')}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${profile.notifications?.dailySummary ? 'bg-[#2f54eb]' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${profile.notifications?.dailySummary ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-surface rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500"><Icons.Tasks size={20}/></div>
                <div>
                  <h3 className="font-semibold">任务截止</h3>
                  <p className="text-xs text-slate-400">任务到期提醒</p>
                </div>
              </div>
              <button 
                onClick={() => toggleNotification('taskDeadlines')}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${profile.notifications?.taskDeadlines ? 'bg-[#2f54eb]' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${profile.notifications?.taskDeadlines ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
