import React, { useRef, useEffect } from 'react';
import { Course, Day } from '../types';
import { TIME_SLOTS } from '../constants';
import { Icons } from './Icon';

interface TimeGridProps {
  days: Day[];
  courses: Course[];
  onCourseClick: (course: Course) => void;
  startHour?: number;
  endHour?: number;
  selectedDayIndex?: number;
  onDayClick?: (index: number) => void;
  currentWeek?: number;
  semesterStartDate?: Date;
}

const GRID_ROW_HEIGHT = 64; // Compressed height for mobile adaptation

const TimeGrid: React.FC<TimeGridProps> = ({ days, courses, onCourseClick, startHour = 8, endHour = 22, selectedDayIndex = 0, onDayClick, currentWeek = 1, semesterStartDate = new Date() }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const now = new Date();
  
  // Calculate display dates based on semesterStartDate and currentWeek
  const displayDays = days.map((day, index) => {
    const date = new Date(semesterStartDate);
    date.setDate(date.getDate() + (currentWeek - 1) * 7 + index);

    return {
      ...day,
      month: date.getMonth() + 1,
      date: date.getDate(),
      fullDate: date.toISOString().split('T')[0],
      isToday: date.toDateString() === now.toDateString()
    };
  });

  const timeSlots = [];
  for (let i = startHour; i <= endHour; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  // Helper to get row start and span
  const getGridPosition = (startTime: string, endTime: string) => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const startOffset = (startH - startHour) + (startM / 60);
    const duration = (endH - startH) + ((endM - startM) / 60);

    return {
      top: startOffset * GRID_ROW_HEIGHT,
      height: duration * GRID_ROW_HEIGHT
    };
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'primary-dark':
      case 'blue':
        return { bg: 'bg-[#193ce6]/20', border: 'border-[#193ce6]', text: 'text-blue-100', accent: 'text-[#193ce6]' };
      case 'green':
        return { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-100', accent: 'text-emerald-500' };
      case 'indigo':
        return { bg: 'bg-indigo-500/20', border: 'border-indigo-500', text: 'text-indigo-100', accent: 'text-indigo-500' };
      case 'amber':
        return { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-100', accent: 'text-amber-500' };
      case 'rose':
        return { bg: 'bg-rose-500/20', border: 'border-rose-500', text: 'text-rose-100', accent: 'text-rose-500' };
      default:
        return { bg: 'bg-slate-700/40', border: 'border-slate-500', text: 'text-slate-100', accent: 'text-slate-400' };
    }
  };

  // Auto scroll logic
  useEffect(() => {
    const selectedDay = displayDays[selectedDayIndex];
    if (selectedDay && selectedDay.isToday) {
       if (containerRef.current) {
          const currentH = now.getHours();
          const scrollPx = (currentH - startHour) * GRID_ROW_HEIGHT;
          containerRef.current.scrollTop = Math.max(0, scrollPx - 100); 
       }
    }
  }, [selectedDayIndex, currentWeek]); 

  return (
    <div className="flex-1 overflow-auto relative no-scrollbar bg-background" ref={containerRef}>
      {/* Responsive Container - Full width on mobile, wider on desktop */}
      <div className="relative w-full pr-1 md:pr-4"> 
        
        {/* Sticky Header Row */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm grid grid-cols-[32px_repeat(7,1fr)] md:grid-cols-[50px_repeat(7,140px)] border-b border-white/5 pb-2 pt-2 mb-2">
           <div className="flex items-end justify-center pb-2">
             <span className="text-[9px] md:text-[10px] text-slate-500 font-medium">时间</span>
           </div>
           {/* Day Headers */}
           <div className="col-span-7 grid grid-cols-7 gap-0.5 md:gap-1">
              {displayDays.map((day, index) => {
                const isSelected = index === selectedDayIndex;
                const isToday = day.isToday;
                
                return (
                  <button
                    key={day.short}
                    onClick={() => onDayClick && onDayClick(index)}
                    className={`
                      flex flex-col items-center justify-center py-1.5 md:py-2 rounded-lg md:rounded-2xl transition-all duration-300 relative
                      ${isSelected 
                        ? 'bg-[#193ce6] text-white shadow-lg shadow-blue-900/40' 
                        : isToday 
                            ? 'bg-slate-800/80 text-blue-400 border border-blue-500/30'
                            : 'bg-transparent text-slate-500 hover:bg-slate-800/50'}
                    `}
                  >
                    <span className={`text-[9px] md:text-[10px] font-bold mb-0.5 ${isSelected ? 'opacity-80' : isToday ? 'opacity-90' : 'opacity-60'}`}>
                      {day.name}
                    </span>
                    <span className={`text-[10px] md:text-[13px] font-semibold ${isSelected ? 'font-bold' : ''}`}>
                      {day.date}
                    </span>
                    {isToday && !isSelected && (
                      <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)]"></div>
                    )}
                  </button>
                );
              })}
           </div>
        </div>

        <div className="grid grid-cols-[32px_repeat(7,1fr)] md:grid-cols-[50px_repeat(7,140px)]">
          
          {/* Time Labels Column */}
          <div className="flex flex-col pt-4">
             {timeSlots.map((time) => (
                <div key={time} style={{ height: GRID_ROW_HEIGHT }} className="text-[9px] md:text-[10px] text-slate-500 font-medium text-center -mt-2">
                   {time.split(':')[0]}
                </div>
             ))}
          </div>

          {/* Day Columns Background Lines */}
          <div className="col-span-7 grid grid-cols-7 relative">
            {/* Horizontal Lines */}
            <div className="absolute inset-0 flex flex-col pt-4">
               {timeSlots.map((_, i) => (
                 <div key={i} style={{ height: GRID_ROW_HEIGHT }} className="border-b border-slate-800/50 w-full"></div>
               ))}
            </div>

            {/* Vertical Lines */}
            {displayDays.map((day, i) => {
              const dayCourses = courses.filter(c => {
                 const isSameDay = c.day === day.short;
                 const isCurrentWeek = c.weeks && c.weeks.length > 0 ? c.weeks.includes(currentWeek) : true;
                 return isSameDay && isCurrentWeek;
              });

              // Sort by start time
              const sortedCourses = [...dayCourses].sort((a, b) => {
                 const startA = parseInt(a.startTime.replace(':', ''));
                 const startB = parseInt(b.startTime.replace(':', ''));
                 if (startA === startB) {
                    const endA = parseInt(a.endTime.replace(':', ''));
                    const endB = parseInt(b.endTime.replace(':', ''));
                    return endB - endA; 
                 }
                 return startA - startB;
              });

              // Group overlaps
              const columns: Course[][] = [];
              sortedCourses.forEach(course => {
                 let placed = false;
                 for (const col of columns) {
                    const overlaps = col.some(c => {
                       const start1 = parseInt(course.startTime.replace(':', ''));
                       const end1 = parseInt(course.endTime.replace(':', ''));
                       const start2 = parseInt(c.startTime.replace(':', ''));
                       const end2 = parseInt(c.endTime.replace(':', ''));
                       return start1 < end2 && end1 > start2;
                    });
                    
                    if (!overlaps) {
                       col.push(course);
                       placed = true;
                       break;
                    }
                 }
                 if (!placed) {
                    columns.push([course]);
                 }
              });

              const totalCols = columns.length;
              const isToday = day.isToday;

              return (
              <div key={day.short} className={`relative h-full border-l border-slate-800/50 ${i === days.length - 1 ? 'border-r' : ''} ${isToday ? 'bg-blue-500/[0.03]' : ''}`}>
                 {columns.map((col, colIndex) => (
                    col.map(course => {
                      const style = getGridPosition(course.startTime, course.endTime);
                      const colors = getColorStyles(course.color);
                      const widthPercent = 100 / totalCols;
                      const leftPercent = colIndex * widthPercent;

                      return (
                        <button
                          key={course.id}
                          onClick={() => onCourseClick(course)}
                          className={`absolute rounded-md md:rounded-xl p-1.5 md:p-3 text-left transition-transform active:scale-95 flex flex-col justify-between overflow-hidden border-l-2 md:border-l-[3px] ${colors.bg} ${colors.border} z-20 hover:brightness-110 hover:z-30 shadow-sm`}
                          style={{ 
                            top: `${style.top + 16}px`, 
                            height: `${style.height - 4}px`,
                            left: `${leftPercent}%`,
                            width: `${widthPercent}%`,
                            paddingLeft: totalCols > 1 ? '2px' : undefined,
                            paddingRight: totalCols > 1 ? '2px' : undefined,
                          }}
                        >

                          <div>
                            <p className={`text-[7px] md:text-[9px] font-bold uppercase tracking-wider mb-0.5 ${colors.accent} truncate`}>
                              {course.type}
                            </p>
                            <h3 className={`font-bold leading-tight text-white mb-0.5 line-clamp-2 ${totalCols > 1 ? 'text-[9px] md:text-[10px]' : 'text-[10px] md:text-[13px]'}`}>
                              {course.title}
                            </h3>
                            
                            <div className="flex items-center gap-0.5 md:gap-1 mt-0.5 opacity-90">
                                <Icons.MapPin size={9} className="text-slate-300 shrink-0" />
                                <span className={`text-slate-200 truncate font-medium ${totalCols > 1 ? 'text-[7px] md:text-[8px]' : 'text-[8px] md:text-[10px]'}`}>
                                  {course.location}
                                </span>
                            </div>
                          </div>
                          
                          {/* Only show instructor on larger screens or long slots */}
                          {style.height > 80 && (
                            <div className="hidden md:flex items-center gap-1 opacity-60 mt-0.5">
                               <Icons.User size={10} className="text-slate-400 shrink-0" />
                               <span className="text-[9px] text-slate-400 truncate">{course.instructor}</span>
                            </div>
                          )}
                        </button>
                      );
                   })
                 ))}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeGrid;
