import React, { useEffect, useState } from 'react';
import { Course } from '../types';
import { Icons } from './Icon';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-lg bg-[#0f111a] rounded-t-[2.5rem] p-6 pb-10 transition-transform duration-300 ease-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ minHeight: '85vh' }}
      >
        {/* Handle bar */}
        <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-8 opacity-50" />

        {course && (
          <div className="flex flex-col h-full">
            {/* Header Status */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold tracking-wider uppercase border border-blue-500/20">
                进行中
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
              {course.title}
            </h2>
            <p className="text-slate-400 mb-10 text-sm">
              {course.department} • {course.code}
            </p>

            {/* Info Rows */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1c2237] flex items-center justify-center text-blue-500 shrink-0">
                  <Icons.Clock size={20} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">时间</p>
                  <p className="text-white font-semibold">{course.startTime} — {course.endTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1c2237] flex items-center justify-center text-blue-500 shrink-0">
                  <Icons.MapPin size={20} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">地点</p>
                  <p className="text-white font-semibold">{course.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-[#1c2237] overflow-hidden shrink-0">
                   <img 
                    src="https://picsum.photos/100/100?random=1" 
                    alt="Instructor" 
                    className="w-full h-full object-cover"
                   />
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">任课教师</p>
                  <p className="text-white font-semibold">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-[#161b2e] rounded-3xl p-6 mb-8 border border-white/5">
              <h3 className="text-white font-bold mb-3">课程周次</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {course.weeks ? `第 ${course.weeks.join(', ')} 周` : course.description}
              </p>
            </div>

            {/* Spacer to push buttons to bottom */}
            <div className="flex-1" />

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 mt-auto">
              <button className="flex flex-col items-center justify-center gap-2 bg-[#2f54eb] hover:bg-blue-600 text-white rounded-3xl h-20 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
                <Icons.Bell size={24} fill="currentColor" className="text-white" />
                <span className="text-xs font-semibold">提醒</span>
              </button>
              
              <button className="flex flex-col items-center justify-center gap-2 bg-[#1c2237] hover:bg-[#252c45] text-white rounded-3xl h-20 border border-white/5 active:scale-95 transition-all">
                <Icons.Edit size={24} />
                <span className="text-xs font-semibold">编辑</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-2 bg-[#2a1d25] hover:bg-[#3d232c] text-red-400 rounded-3xl h-20 border border-red-500/10 active:scale-95 transition-all">
                <Icons.Delete size={24} />
                <span className="text-xs font-semibold">删除</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailModal;
