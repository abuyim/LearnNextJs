import { useEffect, useState } from "react";
import { Post } from "@/types/post";

type Props = {
  isOpen: boolean;
  post?: Post | null;
  onSubmit: (data: { title: string; content: string; id?: number }) => void;
  onClose: () => void;
};

export default function PostFormModal({ isOpen, post, onSubmit, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(post?.title || "");
    setContent(post?.content || "");
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const payload = post ? { id: post.id, title, content } : { title, content };
    onSubmit(payload);
    onClose();
  };

  return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">

      <div className="bg-white max-w-lg w-full p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{post ? "Edit Post" : "Add Post"}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post content"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {post ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
