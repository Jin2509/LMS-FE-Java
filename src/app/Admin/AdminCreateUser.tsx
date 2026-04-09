import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Layout from "../components/Layout";
import { PageHeader } from "../components/shared/PageHeader";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  ArrowLeft,
  Download,
  Upload,
  UserPlus,
  FileSpreadsheet,
} from "lucide-react";

import { UserAccount } from "../lib/adminData";
import { readExcelFile, createExcelTemplate } from "../../lib/excelUtils";

export default function AdminCreateUser() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("single");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [parsedUsers, setParsedUsers] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    phone: "",
    bio: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    const newUser: UserAccount = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role as "student" | "teacher",
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
      coursesEnrolled: formData.role === "student" ? 0 : undefined,
      coursesTeaching: formData.role === "teacher" ? 0 : undefined,
    };

    const existingUsers = localStorage.getItem("createdUsers");
    const createdUsers = existingUsers ? JSON.parse(existingUsers) : [];
    createdUsers.push(newUser);
    localStorage.setItem("createdUsers", JSON.stringify(createdUsers));

    toast.success("Tạo tài khoản thành công!");
    setTimeout(() => navigate("/admin/users"), 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExcelFile(file);
      parseExcelFile(file);
    }
  };

  const parseExcelFile = async (file: File) => {
    try {
      const parsedData = await readExcelFile(file);
      setParsedUsers(parsedData.slice(1));
      toast.success(`Đã đọc ${parsedData.length - 1} tài khoản từ file Excel`);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đọc file Excel");
    }
  };

  const handleImportUsers = () => {
    if (parsedUsers.length === 0) return;

    const newUsers: UserAccount[] = parsedUsers
      .filter((row: any[]) => row[0] && row[1])
      .map((row: any[], index: number) => ({
        id: (Date.now() + index).toString(),
        name: row[0],
        email: row[1],
        role:
          row[2]?.toLowerCase() === "teacher" || row[2] === "Giáo viên"
            ? "teacher"
            : "student",
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
        coursesEnrolled: 0,
      }));

    const existingUsers = JSON.parse(
      localStorage.getItem("createdUsers") || "[]",
    );
    localStorage.setItem(
      "createdUsers",
      JSON.stringify([...existingUsers, ...newUsers]),
    );

    toast.success(`Đã nhập thành công ${newUsers.length} tài khoản!`);
    setTimeout(() => navigate("/admin/users"), 1000);
  };

  const downloadTemplate = async () => {
    const templateData = [
      ["Họ và tên", "Email", "Vai trò"],
      ["Nguyễn Văn A", "nguyenvana@example.com", "student"],
    ];
    await createExcelTemplate(
      templateData,
      "Mau_tao_tai_khoan.xlsx",
      "Users",
      [20, 30, 15],
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/users")}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </Button>

        <PageHeader
          title="Tạo tài khoản mới"
          description="Thêm học sinh hoặc giáo viên vào hệ thống"
          gradient="from-blue-600 via-indigo-600 to-purple-600"
        />

        <Tabs
          defaultValue="single"
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="single">Tạo đơn lẻ</TabsTrigger>
            <TabsTrigger value="bulk">Nhập hàng loạt</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6 mt-6">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Vai trò *</Label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="w-full p-2 border rounded-md bg-white text-sm"
                    >
                      <option value="student">🎓 Học sinh</option>
                      <option value="teacher">👨‍🏫 Giáo viên</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Bảo mật</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mật khẩu *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/users")}
                >
                  Hủy bỏ
                </Button>
                <Button type="submit">
                  <UserPlus className="w-4 h-4 mr-2" /> Tạo tài khoản
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="bulk" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-4 border rounded-lg bg-blue-50">
                    <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                      <Download className="w-4 h-4" /> Bước 1: Tải file mẫu
                    </h3>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={downloadTemplate}
                      className="mt-2"
                    >
                      Tải file mẫu .xlsx
                    </Button>
                  </div>
                  <div className="flex-1 p-4 border rounded-lg bg-green-50">
                    <h3 className="font-semibold text-green-900 flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Bước 2: Tải lên dữ liệu
                    </h3>
                    <Input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileChange}
                      className="mt-2 bg-white"
                    />
                  </div>
                </div>

                {parsedUsers.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 text-left">Tên</th>
                          <th className="p-2 text-left">Email</th>
                          <th className="p-2 text-left">Vai trò</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedUsers.slice(0, 5).map((u, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-2">{u[0]}</td>
                            <td className="p-2">{u[1]}</td>
                            <td className="p-2">{u[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin/users")}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    onClick={handleImportUsers}
                    disabled={parsedUsers.length === 0}
                  >
                    Nhập {parsedUsers.length} người dùng
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
