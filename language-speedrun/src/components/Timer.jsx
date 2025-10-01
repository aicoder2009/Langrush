import React from 'react';

export default function Timer({ time }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-3xl">⏱️</span>
      <span className="text-2xl font-mono font-bold text-gray-800">
        {time}
      </span>
    </div>
  );
}
