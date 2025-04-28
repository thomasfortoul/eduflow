import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

const Toast: React.FC<ToastProps> = ({ id, type, title, message }) => {
  const { removeToast } = useToast();
  
  // Auto dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);
  
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };
  
  const bgColors = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-amber-50',
    info: 'bg-blue-50',
  };
  
  const borderColors = {
    success: 'border-green-100',
    error: 'border-red-100',
    warning: 'border-amber-100',
    info: 'border-blue-100',
  };
  
  return (
    <div 
      className={`max-w-sm w-full rounded-lg shadow-md border ${bgColors[type]} ${borderColors[type]} animate-slide-up`}
      role="alert"
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {icons[type]}
            <h3 className="ml-2 text-sm font-medium text-gray-800">{title}</h3>
          </div>
          <button 
            onClick={() => removeToast(id)}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {message && <p className="mt-1 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default Toast;