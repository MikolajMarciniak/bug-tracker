import React, { useState } from 'react';

interface AddColumnFormProps {
  onAddColumn: (title: string) => void;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onAddColumn }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddColumn(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-64 bg-gray-100 p-4 rounded">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter column title"
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add Column
      </button>
    </form>
  );
};

export default AddColumnForm;