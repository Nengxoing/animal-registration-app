/* eslint-disable linebreak-style */
import React from 'react';

interface MessageModalProps {
  title: string;
  message: string;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
}

const MessageModal: React.FC<MessageModalProps> = ({ title, message, onClose, type }) => {
  let bgColor = '';
  let borderColor = '';
  let textColor = '';

  switch (type) {
    case 'success':
      bgColor = 'bg-blue-100';
      borderColor = 'border-blue-500';
      textColor = 'text-blue-800';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      borderColor = 'border-red-500';
      textColor = 'text-red-800';
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-100';
      borderColor = 'border-blue-500';
      textColor = 'text-blue-800';
      break;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className={`relative ${bgColor} border-t-4 ${borderColor} rounded-b text-gray-900 px-4 py-3 shadow-lg max-w-sm w-full mx-auto rounded-lg`}>
        <div className="flex justify-between items-center mb-2">
          <p className={`font-bold text-lg ${textColor}`}>{title}</p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200
              ${type === 'success' ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500' : ''}
              ${type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500' : ''}
              ${type === 'info' ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500' : ''}
            `}
          >
            ຕົກລົງ
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
