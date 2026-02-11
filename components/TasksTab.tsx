import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { Icons } from './Icon';

interface TasksTabProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
}

const TasksTab: React.FC<TasksTabProps> = ({ tasks, setTasks, isAddModalOpen, setIsAddModalOpen }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      dueDate: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setIsAddModalOpen(false);
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="flex-1 flex flex-col p-6 animate-in fade-in zoom-in duration-300 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">待办任务</h2>
        <span className="text-sm text-slate-400">{activeTasks.length} 个未完成</span>
      </div>

      {tasks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60 mt-20">
          <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 text-slate-500">
            <Icons.Tasks size={40} />
          </div>
          <p className="text-slate-400">暂无任务</p>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 text-blue-400 text-sm font-medium hover:text-blue-300"
          >
            点击右下角添加
          </button>
        </div>
      ) : (
        <div className="space-y-6 pb-24">
          {/* Active Tasks */}
          <div className="space-y-3">
            {activeTasks.map(task => (
              <div key={task.id} className="group flex items-center gap-3 bg-surface p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="w-6 h-6 rounded-full border-2 border-slate-500 flex items-center justify-center hover:border-blue-500 transition-colors"
                >
                  {/* Empty circle */}
                </button>
                <span className="flex-1 font-medium">{task.title}</span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                >
                  <Icons.Delete size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">已完成</h3>
              <div className="space-y-3 opacity-60">
                {completedTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-transparent">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="w-6 h-6 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-500"
                    >
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    </button>
                    <span className="flex-1 font-medium line-through text-slate-500">{task.title}</span>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="text-slate-600 hover:text-red-400 p-2"
                    >
                      <Icons.Delete size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Task Modal (Simple Overlay) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#1e2235] rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <h3 className="text-xl font-bold mb-4">新建任务</h3>
            <input
              autoFocus
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="请输入任务内容..."
              className="w-full bg-[#111421] border border-slate-700 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-blue-500 transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleAddTask}
                className="flex-1 py-3 rounded-xl bg-[#193ce6] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/30"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTab;
