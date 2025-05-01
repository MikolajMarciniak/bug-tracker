import React, { useState } from 'react';

interface AddCardFormProps {
  onAddCard: (title: string) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onAddCard }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddCard(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter card title"
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Add Card
      </button>
    </form>
  );
};

export default AddCardForm;