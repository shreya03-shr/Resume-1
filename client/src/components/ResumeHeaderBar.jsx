import React from 'react';

export default function Header({ title, setTitle, onPreview, onDelete, onDownload }) {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-700 p-2 text-white rounded w-1/2"
        placeholder="Enter Resume Title"
      />
      <div className="space-x-2">
        <button onClick={onPreview} className="bg-blue-500 px-4 py-2 rounded">Preview</button>
        <button onClick={onDelete} className="bg-red-500 px-4 py-2 rounded">Delete</button>
        <button onClick={onDownload} className="bg-green-500 px-4 py-2 rounded">Download</button>
      </div>
    </div>
  );
}
