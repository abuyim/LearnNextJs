"use client";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";

interface Props {
  post: Post | null;
  onUpdate: (id: number, title: string, content: string) => void;
  onClose: () => void;
}

export default function EditModal({ post, onUpdate, onClose }: Props) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

 useEffect(() => {
  setTitle(post?.title || "");
  setContent(post?.content || "");
}, [post]);
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 shadow w-full max-w-md">
        <h2 className="text-xl mb-4">Edit Post</h2>
        <input
          className="w-full border px-3 py-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border px-3 py-2 rounded mb-3 h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onUpdate(post.id, title, content);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
