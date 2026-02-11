import * as XLSX from 'xlsx';
import { Course, Day } from '../types';

export const parseExcelData = (file: File): Promise<Course[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        const courses: Course[] = [];
        const dayMap: { [key: number]: string } = {
          1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT', 7: 'SUN'
        };

        // Find the header row (starting with empty cell, then Mon, Tue...)
        let startRowIndex = -1;
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i] && jsonData[i].some((cell: any) => typeof cell === 'string' && cell.includes('星期一'))) {
            startRowIndex = i + 1; // Data starts after header
            break;
          }
        }

        if (startRowIndex === -1) {
          reject(new Error("Could not find header row with '星期一'"));
          return;
        }

        // Iterate through time slots
        for (let i = startRowIndex; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (!row || row.length < 2) continue;

          // Parse time slot from first column (e.g., "第一二节\n(01,02小节)\n10:00-11:40")
          const timeSlotStr = row[0] as string;

          // Skip "No Timetable Courses" or empty rows
          if (!timeSlotStr || timeSlotStr.includes('无课表课程')) {
             continue;
          }
          
          let startTime = '08:00';
          let endTime = '10:00';
          
          // STRICT parsing: If no valid time match, SKIP the row entirely.
          // This prevents "No Timetable Courses" rows or other metadata rows from being parsed as default 8-10am courses.
          const timeMatch = timeSlotStr.match(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/);
          if (timeMatch) {
            startTime = timeMatch[1];
            endTime = timeMatch[2];
          } else {
             continue; // Skip rows without valid time info
          }

          // Iterate through days (Columns 1-7)
          for (let j = 1; j <= 7; j++) {
            const cellContent = row[j];
            if (!cellContent || typeof cellContent !== 'string' || !cellContent.trim()) continue;

            // Split multiple courses in one cell (separated by double newline usually)
            // But sometimes simple newline. Based on structure, looks like blocks.
            // Let's split by double newline first as a heuristic.
            const courseBlocks = cellContent.split('\n\n').filter(block => block.trim().length > 0);

            courseBlocks.forEach((block, index) => {
               // Parse block
               // Format: "\nCourseName\n任课教师：Teacher\nWeeks\nLocation\n"
               const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
               
               if (lines.length < 1) return;

               let title = lines[0];
               let instructor = '';
               let location = '';
               let weeksInfo = '';
               let weeks: number[] = [];

               // Simple heuristic to identify lines
               lines.forEach(line => {
                 if (line.startsWith('任课教师：')) {
                   instructor = line.replace('任课教师：', '');
                 } else if (line.includes('周') && (line.includes('[') || line.includes('节'))) {
                   weeksInfo = line;
                   try {
                     // Parse weeks: "1-9,11-12,14-15([周])"
                     // We need to be careful. The format is typically: "1-9,11-12,14-15([周])[01-02节]"
                     // Let's extract everything before ([周])
                     let weeksStr = line;
                     if (line.includes('([周])')) {
                       weeksStr = line.split('([周])')[0];
                     } else if (line.includes('周')) {
                       weeksStr = line.split('周')[0];
                     }

                     // Now splits by comma
                     const parts = weeksStr.split(',');
                     parts.forEach(part => {
                       // Remove any non-digit/dash
                       const cleanPart = part.replace(/[^0-9\-]/g, '');
                       if (cleanPart.includes('-')) {
                         const [s, e] = cleanPart.split('-').map(Number);
                         if (!isNaN(s) && !isNaN(e)) {
                           for (let k = s; k <= e; k++) weeks.push(k);
                         }
                       } else {
                         const n = Number(cleanPart);
                         if (!isNaN(n)) weeks.push(n);
                       }
                     });
                   } catch (e) {
                     console.warn('Failed to parse weeks', line);
                   }
                 } else if (line !== title) {
                   // Assume location is the other line
                   location = line;
                 }
               });
               
               // Assign color based on course title hash or random
               const colors: Course['color'][] = ['blue', 'green', 'purple', 'amber', 'rose', 'indigo', 'primary-dark'];
               const colorIndex = Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
               
               courses.push({
                 id: `${i}-${j}-${index}-${Date.now()}`, // Unique ID
                 title,
                 type: 'Lecture', // Default
                 day: dayMap[j],
                 startTime,
                 endTime,
                 location,
                 instructor,
                 color: colors[colorIndex],
                 description: weeksInfo,
                 weeks
               });
            });
          }
        }

        resolve(courses);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
