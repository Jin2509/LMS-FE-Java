import { Semester } from '../../lib/semesterData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SemesterSelectorProps {
  selectedSemester: Semester;
  onSemesterChange: (semester: Semester) => void;
}

export function SemesterSelector({ selectedSemester, onSemesterChange }: SemesterSelectorProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Đang diễn ra</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Sắp tới</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Đã kết thúc</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-gray-700">
        <Calendar className="w-5 h-5" />
        <span className="font-medium">Kỳ học:</span>
      </div>
      <Select
        value={selectedSemester.id}
        onValueChange={(value) => {
          const semester = semesters.find(s => s.id === value);
          if (semester) onSemesterChange(semester);
        }}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
      >
        <SelectTrigger>
          <SelectValue>
            {getSemesterDisplayName(selectedSemester)}
            {selectedSemester.status === 'active' ? ' (Hiện tại)' : ''}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {semesters.map(semester => (
            <SelectItem key={semester.id} value={semester.id}>
              {getSemesterDisplayName(semester)}
              {semester.status === 'active' ? ' (Hiện tại)' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {getStatusBadge(selectedSemester.status)}
    </div>
  );
}