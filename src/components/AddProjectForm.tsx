"use client";
import React, { useState } from "react";

interface AddProjectFormProps {
  onAddProject: (title: string, description: string) => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddProject(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter project title"
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter project description"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
