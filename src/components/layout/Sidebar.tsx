import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  FileCheck, 
  Book, 
  Calendar, 
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/courses', icon: <BookOpen size={20} />, label: 'Courses' },
    { to: '/students', icon: <Users size={20} />, label: 'Students' },
    { to: '/quiz', icon: <FileCheck size={20} />, label: 'Quizzes' },
    { to: '/lessons', icon: <Book size={20} />, label: 'Lesson Plans' },
    { to: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">EduBoard</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {user?.name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        <ul className="mt-4 space-y-1">
          <li>
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;