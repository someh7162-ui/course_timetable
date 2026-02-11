import React, { useState, useRef, useEffect } from 'react';
import { DAYS, COURSES } from './constants';
import { Course, Task } from './types';
import { Icons } from './components/Icon';
import TimeGrid from './components/TimeGrid';
import CourseDetailModal from './components/CourseDetailModal';
import TasksTab from './components/TasksTab';
import ProfileTab from './components/ProfileTab';
import InstallPrompt from './components/InstallPrompt';
import { parseExcelData } from './utils/excelParser';

const App: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // Default Week starts with index 0
  const [activeTab, setActiveTab] = useState('Timetable');
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(20);

  const [currentWeek, setCurrentWeek] = useState(() => {
    // Initial calculation to prevent flash
    const now = new Date();
    // Week 1 starts March 2, 2026 (Monday)
    const start = new Date('2026-03-02');
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays >= 0) return Math.floor(diffDays / 7) + 1;
    return 1;
  });
  const [semesterStartDate, setSemesterStartDate] = useState(new Date('2026-03-02')); // Start Date
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to LocalStorage whenever courses change
  useEffect(() => {
    // Only save if we have courses and they are not empty
    if (courses.length > 0) {
       localStorage.setItem('academic-timetable-courses', JSON.stringify(courses));
    }
  }, [courses]);

  // Load/Save Tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem('academic-timetable-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Failed to load tasks', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('academic-timetable-tasks', JSON.stringify(tasks));
  }, [tasks]);


  useEffect(() => {
    // Initial load and setup
    
    // 1. Load courses
    try {
      const savedCourses = localStorage.getItem('academic-timetable-courses');
      if (savedCourses) {
        const parsed = JSON.parse(savedCourses);
        if (Array.isArray(parsed) && parsed.length > 0) {
           setCourses(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load saved courses', e);
    }
    
    // 2. Set current week and day based on today's date
    const now = new Date();
    // Week 1 starts March 2, 2026
    const startDate = new Date(2026, 2, 2); // March is 2, Day is 2
    startDate.setHours(0,0,0,0);
    
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0) {
      const week = Math.floor(diffDays / 7) + 1;
      setCurrentWeek(Math.min(20, Math.max(1, week)));
    } else {
      setCurrentWeek(1);
    }
    
    // Select correct day tab (Mon=0...Sun=6)
    // getDay returns 0 for Sunday.
    let dayIndex = now.getDay(); 
    // Convert to Mon=0, Sun=6
    if (dayIndex === 0) dayIndex = 6;
    else dayIndex = dayIndex - 1;
    
    setSelectedDayIndex(dayIndex);
  }, []);

  useEffect(() => {
    // Auto adjust time based on courses
    if (courses.length > 0) {
      let minH = 24;
      let maxH = 0;
      courses.forEach(c => {
        const start = parseInt(c.startTime.split(':')[0]);
        const end = parseInt(c.endTime.split(':')[0]) + (parseInt(c.endTime.split(':')[1]) > 0 ? 1 : 0);
        if (start < minH) minH = start;
        if (end > maxH) maxH = end;
      });
      // Add padding
      setStartHour(Math.max(0, minH - 1));
      setEndHour(Math.min(24, maxH + 1));
    }
  }, [courses]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 300);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const newCourses = await parseExcelData(file);
        setCourses(newCourses);
        alert(`成功导入 ${newCourses.length} 门课程！`);
      } catch (error) {
        console.error(error);
        alert('导入失败，请确保文件格式正确。');
      }
    }
  };

  const handleClearData = () => {
    if (confirm('确定要清除所有课程数据吗？')) {
      localStorage.removeItem('academic-timetable-courses');
      setCourses([]); // or set to COURSES if you want defaults
      alert('数据已清除');
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-background text-white font-sans flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="pt-2 pb-0 px-4 md:px-6 z-30 bg-background sticky top-0 border-b border-white/5">
        <div className="flex justify-between items-center mb-4 pt-4">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {activeTab === 'Timetable' ? '课程表' : activeTab === 'Tasks' ? '任务' : '我的'}
            </h1>
            {activeTab === 'Timetable' && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-slate-400">第 {currentWeek} 周</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setCurrentWeek(p => Math.max(1, p - 1))}
                    className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400 active:scale-90"
                  >
                    <Icons.Back size={14} />
                  </button>
                  <button 
                    onClick={() => setCurrentWeek(p => Math.min(20, p + 1))}
                    className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400 active:scale-90"
                  >
                    <Icons.Back size={14} className="rotate-180"/>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="hidden"> {/* Hidden inputs/controls */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".xls,.xlsx" 
              className="hidden" 
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {activeTab === 'Timetable' && (
          <TimeGrid 
            days={DAYS} 
            courses={courses} 
            onCourseClick={handleCourseClick}
            startHour={startHour}
            endHour={endHour}
            selectedDayIndex={selectedDayIndex}
            onDayClick={setSelectedDayIndex}
            currentWeek={currentWeek}
            semesterStartDate={semesterStartDate}
          />
        )}
        
        {activeTab === 'Tasks' && (
           <TasksTab 
             tasks={tasks}
             setTasks={setTasks}
             isAddModalOpen={isAddTaskModalOpen}
             setIsAddModalOpen={setIsAddTaskModalOpen}
           />
        )}

        {activeTab === 'Profile' && (
           <ProfileTab onClearData={handleClearData} />
        )}
      </div>

      {/* Floating Action Button (Dynamic) */}
      {activeTab === 'Timetable' && (
        <button 
          onClick={handleImportClick}
          className="fixed right-4 md:right-6 w-14 h-14 bg-[#193ce6] hover:bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-900/50 flex items-center justify-center z-40 active:scale-90 transition-all duration-200"
          style={{ bottom: 'max(calc(env(safe-area-inset-bottom) + 80px), 96px)' }}
        >
          <Icons.Plus size={28} />
        </button>
      )}
      
      {activeTab === 'Tasks' && (
        <button 
          onClick={() => setIsAddTaskModalOpen(true)}
          className="fixed right-4 md:right-6 w-14 h-14 bg-[#193ce6] hover:bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-900/50 flex items-center justify-center z-40 active:scale-90 transition-all duration-200"
          style={{ bottom: 'max(calc(env(safe-area-inset-bottom) + 80px), 96px)' }}
        >
          <Icons.Plus size={28} />
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111421]/90 backdrop-blur-xl border-t border-white/5 z-40" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}>
         <div className="flex justify-around items-center h-16 px-2">
            <button 
              onClick={() => setActiveTab('Timetable')}
              className={`flex flex-col items-center gap-1 w-20 py-2 rounded-xl transition-colors ${activeTab === 'Timetable' ? 'text-[#2f54eb]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Icons.Dashboard size={22} strokeWidth={activeTab === 'Timetable' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">课程表</span>
            </button>

            <button 
              onClick={() => setActiveTab('Tasks')}
              className={`flex flex-col items-center gap-1 w-20 py-2 rounded-xl transition-colors ${activeTab === 'Tasks' ? 'text-[#2f54eb]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <div className="relative">
                <Icons.Tasks size={22} strokeWidth={activeTab === 'Tasks' ? 2.5 : 2} />
                {tasks.filter(t => !t.completed).length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#111421]"></span>
                )}
              </div>
              <span className="text-[10px] font-medium">任务</span>
            </button>

            <button 
               onClick={() => setActiveTab('Profile')}
               className={`flex flex-col items-center gap-1 w-20 py-2 rounded-xl transition-colors ${activeTab === 'Profile' ? 'text-[#2f54eb]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Icons.Profile size={22} strokeWidth={activeTab === 'Profile' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">我的</span>
            </button>
         </div>
      </nav>

      {/* Detail Modal */}
      <CourseDetailModal 
        course={selectedCourse} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
      
      {/* PWA Install Prompt */}
      <InstallPrompt />
      
    </div>
  );
};

export default App;
