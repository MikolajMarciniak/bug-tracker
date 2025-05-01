"use client";
import React, { useState } from "react";

interface AddBoardFormProps {
  onAddBoard: (name: string) => void;
}

const AddBoardForm: React.FC<AddBoardFormProps> = ({ onAddBoard }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddBoard(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter board name"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Add Board
      </button>
    </form>
  );
};

export default AddBoardForm;
