import { Semester } from "../../lib/semesterData";
// 1. Thêm import Badge và Calendar từ thư mục ui
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react"; // Hoặc từ ../ui/calendar nếu bạn dùng component riêng
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// 2. Import dữ liệu semesters và hàm bổ trợ (giả định bạn để trong semesterData)
import { semesters } from "../../lib/semesterData";

interface SemesterSelectorProps {
  selectedSemester: Semester;
  onSemesterChange: (semester: Semester) => void;
}

// 3. Hàm bổ trợ hiển thị tên kỳ học (nếu chưa có trong file này)
const getSemesterDisplayName = (semester: Semester) => {
  return `${semester.name} ${semester.year}`;
};

export function SemesterSelector({
  selectedSemester,
  onSemesterChange,
}: SemesterSelectorProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            Đang diễn ra
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            Sắp tới
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-300">
            Đã kết thúc
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-gray-700">
        {/* Lỗi phát sinh ở đây vì chưa import Calendar */}
        <Calendar className="w-5 h-5" />
        <span className="font-medium">Kỳ học:</span>
      </div>
      <Select
        value={selectedSemester.id}
        onValueChange={(value) => {
          // Lỗi phát sinh ở đây vì biến 'semesters' chưa được import
          const semester = semesters.find((s) => s.id === value);
          if (semester) onSemesterChange(semester);
        }}
      >
        <SelectTrigger className="w-[200px] border border-gray-300 rounded-lg bg-white font-medium">
          <SelectValue>
            {getSemesterDisplayName(selectedSemester)}
            {selectedSemester.status === "active" ? " (Hiện tại)" : ""}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {semesters.map((semester) => (
            <SelectItem key={semester.id} value={semester.id}>
              {getSemesterDisplayName(semester)}
              {semester.status === "active" ? " (Hiện tại)" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {getStatusBadge(selectedSemester.status)}
    </div>
  );
}
