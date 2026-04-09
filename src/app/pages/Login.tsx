import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../lib/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { GraduationCap, AlertCircle, BookOpen, Users, Award, TrendingUp, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = login(email, password);
      
      if (user) {
        if (user.role === 'student') {
          navigate('/student/dashboard');
        } else if (user.role === 'teacher') {
          navigate('/teacher/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        }
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#73A5CA] rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent mb-2">
              Chào mừng trở lại
            </h1>
            <p className="text-gray-600">
              Đăng nhập vào hệ thống quản lý học tập
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#73A5CA] hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                "Đang đăng nhập..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Đăng nhập
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              Tài khoản demo
            </h3>
            <div className="space-y-3 text-sm">
              <div
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer"
                onClick={() => {
                  setEmail("student@lms.com");
                  setPassword("password");
                }}
              >
                <p className="font-medium text-gray-900 mb-1">Học sinh</p>
                <p className="text-gray-600">student@lms.com / password</p>
              </div>
              <div
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                onClick={() => {
                  setEmail("teacher@lms.com");
                  setPassword("password");
                }}
              >
                <p className="font-medium text-gray-900 mb-1">Giáo viên</p>
                <p className="text-gray-600">teacher@lms.com / password</p>
              </div>
              <div
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-pink-300 transition-colors cursor-pointer"
                onClick={() => {
                  setEmail("admin@lms.com");
                  setPassword("password");
                }}
              >
                <p className="font-medium text-gray-900 mb-1">Quản trị viên</p>
                <p className="text-gray-600">admin@lms.com / password</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img alt="Students learning" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#5E7AC4] to-pink-600/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Nền tảng học tập
            <br />
            hiện đại
          </h2>
          <p className="text-xl mb-12 text-white/90 max-w-lg">
            Hệ thống quản lý học tập toàn diện cho học sinh và giáo viên
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Khóa học đa dạng</h3>
                <p className="text-sm text-white/80">
                  Hàng trăm khóa học chất lượng cao
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Cộng đồng học tập</h3>
                <p className="text-sm text-white/80">
                  Kết nối với bạn bè và giáo viên
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Chứng chỉ uy tín</h3>
                <p className="text-sm text-white/80">
                  Được công nhận trong ngành
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Theo dõi tiến độ</h3>
                <p className="text-sm text-white/80">
                  Báo cáo chi tiết và phân tích
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            <div>
              <div className="text-4xl font-bold mb-1">10K+</div>
              <div className="text-white/80">Học sinh</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">500+</div>
              <div className="text-white/80">Khóa học</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">98%</div>
              <div className="text-white/80">Hài lòng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}