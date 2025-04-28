import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CourseManagement from './pages/CourseManagement';
import StudentProfiles from './pages/StudentProfiles';
import QuizCreation from './pages/QuizCreation';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="students" element={<StudentProfiles />} />
              <Route path="quiz" element={<QuizCreation />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;