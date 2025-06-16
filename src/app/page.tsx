"use client";
import usePosts from "@/hooks/usePosts";
import PostTable from "@/components/PostTable";
import { Post } from "@/types/post";
import { useState } from "react";
import PostFormModal from "@/components/PostFormModal";

export default function Home() {
  const { posts, createPost, deletePost } = usePosts();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: { id?: number; title: string; content: string }) => {
    if (data.id) {
      // updatePost(data as Post);
    } else {
      createPost(data.title, data.content);
    }
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
       <div className="mb-4 text-right">
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Add Post
        </button>
      </div>
      
       <PostFormModal
        isOpen={isModalOpen}
        post={editingPost}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      <PostTable posts={posts} onDelete={deletePost} onEdit={handleEdit} />
    </main>
  );
}
