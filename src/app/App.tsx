import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConsoleWarningFilter } from './components/ConsoleWarningFilter';

// Main App component - LMS System
export default function App() {
  return (
    <ErrorBoundary>
      <ConsoleWarningFilter />
      <RouterProvider router={router} />
      <Toaster />
    </ErrorBoundary>
  );
}