"use client";
import { useState } from "react";

interface Props {
  onSubmit: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
  submitLabel?: string;
}

export default function PostForm({
  onSubmit,
  initialTitle = "",
  initialContent = "",
  submitLabel = "Add Post",
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    if (!title || !content) return;
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="mb-6 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Add New Post</h1>
      <label className="block mb-2 text-gray-700">Title</label>
      <input
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="block mb-2 text-gray-700">Description</label>
      <textarea
        className="w-full border rounded px-3 py-2 mb-4 h-24"
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        {submitLabel}
      </button>
    </div>
  );
}
