import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  counter?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  helperText,
  error,
  counter = false,
  className = '',
  id,
  maxLength,
  value = '',
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={`
          block w-full rounded-md shadow-sm text-sm
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-description` : undefined}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      
      <div className="flex justify-between items-start mt-1">
        <div>
          {helperText && !error && (
            <p className="text-sm text-gray-500" id={`${textareaId}-description`}>
              {helperText}
            </p>
          )}
          
          {error && (
            <p className="text-sm text-red-600" id={`${textareaId}-error`}>
              {error}
            </p>
          )}
        </div>
        
        {counter && maxLength && (
          <p className={`text-xs ${String(value).length >= (maxLength * 0.9) ? 'text-amber-600' : 'text-gray-500'}`}>
            {String(value).length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;