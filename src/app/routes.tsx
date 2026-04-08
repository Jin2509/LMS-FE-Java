import { createBrowserRouter, Navigate, redirect } from 'react-router';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import StudentCourses from './pages/StudentCourses';
import StudentClasses from './pages/StudentClasses';
import StudentAssignments from './pages/StudentAssignments';
import StudentGrades from './pages/StudentGrades';
import StudentHistory from './pages/StudentHistory';
import StudentSchedule from './pages/StudentSchedule';
import StudentSettings from './pages/StudentSettings';
import StudentDiscussions from './pages/StudentDiscussions';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCourses from './pages/TeacherCourses';
import TeacherClasses from './pages/TeacherClasses';
import TeacherStudents from './pages/TeacherStudents';
import TeacherAssignments from './pages/TeacherAssignments';
import TeacherHistory from './pages/TeacherHistory';
import TeacherSettings from './pages/TeacherSettings';
import TeacherDiscussions from './pages/TeacherDiscussions';
import CoursePage from './pages/CoursePage';
import ClassDetail from './pages/ClassDetail';
import Profile from './pages/Profile';
import CreateCourse from './pages/CreateCourse';
import CreateExam from './pages/CreateExam';
import ExamDetail from './pages/ExamDetail';
import TakeExam from './pages/TakeExam';
import AssignmentDetail from './pages/AssignmentDetail';
import AssignmentSubmissions from './pages/AssignmentSubmissions';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCreateUser from './pages/AdminCreateUser';
import AdminClasses from './pages/AdminClasses';
import AdminDiscussions from './pages/AdminDiscussions';
import AdminCourses from './pages/AdminCourses';
import AdminAssignments from './pages/AdminAssignments';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import { isAuthenticated, getCurrentUser } from './lib/auth';

// Auth loader function
function authLoader(requiredRole?: 'student' | 'teacher' | 'admin') {
  return () => {
    if (!isAuthenticated()) {
      throw redirect('/');
    }

    if (requiredRole) {
      const user = getCurrentUser();
      if (user?.role !== requiredRole) {
        const redirectPath = 
          user?.role === 'student' 
            ? '/student/dashboard' 
            : user?.role === 'teacher' 
            ? '/teacher/dashboard' 
            : '/admin/dashboard';
        throw redirect(redirectPath);
      }
    }

    return null;
  };
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/profile',
      element: <Profile />,
      loader: authLoader(),
    },
    {
      path: '/student',
      children: [
        {
          path: 'dashboard',
          element: <StudentDashboard />,
          loader: authLoader('student'),
        },
        {
          path: 'courses',
          element: <StudentCourses />,
          loader: authLoader('student'),
        },
        {
          path: 'courses/:courseId',
          element: <CoursePage />,
          loader: authLoader('student'),
        },
        {
          path: 'classes',
          element: <StudentClasses />,
          loader: authLoader('student'),
        },
        {
          path: 'classes/:classId',
          element: <ClassDetail />,
          loader: authLoader('student'),
        },
        {
          path: 'assignments',
          element: <StudentAssignments />,
          loader: authLoader('student'),
        },
        {
          path: 'assignments/:assignmentId',
          element: <AssignmentDetail />,
          loader: authLoader('student'),
        },
        {
          path: 'exams/:examId',
          element: <ExamDetail />,
          loader: authLoader('student'),
        },
        {
          path: 'exams/:examId/take',
          element: <TakeExam />,
          loader: authLoader('student'),
        },
        {
          path: 'grades',
          element: <StudentGrades />,
          loader: authLoader('student'),
        },
        {
          path: 'history',
          element: <StudentHistory />,
          loader: authLoader('student'),
        },
        {
          path: 'schedule',
          element: <StudentSchedule />,
          loader: authLoader('student'),
        },
        {
          path: 'settings',
          element: <StudentSettings />,
          loader: authLoader('student'),
        },
        {
          path: 'discussions',
          element: <StudentDiscussions />,
          loader: authLoader('student'),
        },
      ],
    },
    {
      path: '/teacher',
      children: [
        {
          path: 'dashboard',
          element: <TeacherDashboard />,
          loader: authLoader('teacher'),
        },
        {
          path: 'courses',
          element: <TeacherCourses />,
          loader: authLoader('teacher'),
        },
        {
          path: 'courses/create',
          element: <CreateCourse />,
          loader: authLoader('teacher'),
        },
        {
          path: 'courses/:courseId',
          element: <CoursePage />,
          loader: authLoader('teacher'),
        },
        {
          path: 'courses/:courseId/create-exam',
          element: <CreateExam />,
          loader: authLoader('teacher'),
        },
        {
          path: 'exams/:examId',
          element: <ExamDetail />,
          loader: authLoader('teacher'),
        },
        {
          path: 'classes',
          element: <TeacherClasses />,
          loader: authLoader('teacher'),
        },
        {
          path: 'classes/:classId',
          element: <ClassDetail />,
          loader: authLoader('teacher'),
        },
        {
          path: 'students',
          element: <TeacherStudents />,
          loader: authLoader('teacher'),
        },
        {
          path: 'assignments',
          element: <TeacherAssignments />,
          loader: authLoader('teacher'),
        },
        {
          path: 'assignments/:assignmentId',
          element: <AssignmentDetail />,
          loader: authLoader('teacher'),
        },
        {
          path: 'assignments/:assignmentId/submissions',
          element: <AssignmentSubmissions />,
          loader: authLoader('teacher'),
        },
        {
          path: 'history',
          element: <TeacherHistory />,
          loader: authLoader('teacher'),
        },
        {
          path: 'settings',
          element: <TeacherSettings />,
          loader: authLoader('teacher'),
        },
        {
          path: 'discussions',
          element: <TeacherDiscussions />,
          loader: authLoader('teacher'),
        },
      ],
    },
    {
      path: '/admin',
      children: [
        {
          path: 'dashboard',
          element: <AdminDashboard />,
          loader: authLoader('admin'),
        },
        {
          path: 'users',
          element: <AdminUsers />,
          loader: authLoader('admin'),
        },
        {
          path: 'users/create',
          element: <AdminCreateUser />,
          loader: authLoader('admin'),
        },
        {
          path: 'classes',
          element: <AdminClasses />,
          loader: authLoader('admin'),
        },
        {
          path: 'classes/:classId',
          element: <ClassDetail />,
          loader: authLoader('admin'),
        },
        {
          path: 'discussions',
          element: <AdminDiscussions />,
          loader: authLoader('admin'),
        },
        {
          path: 'courses',
          element: <AdminCourses />,
          loader: authLoader('admin'),
        },
        {
          path: 'assignments',
          element: <AdminAssignments />,
          loader: authLoader('admin'),
        },
        {
          path: 'reports',
          element: <AdminReports />,
          loader: authLoader('admin'),
        },
        {
          path: 'settings',
          element: <AdminSettings />,
          loader: authLoader('admin'),
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
    },
  }
);