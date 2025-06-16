"use client";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import toast from "react-hot-toast";

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const createPost = async (title: string, content: string) => {
    const result = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if(result.ok)
        toast.success("Post created successfully!");
    else
        toast.error("Failed to create post");
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if(res.ok)
        toast.success("Post deleted");
    else    
        toast.error("Delete failed");
    fetchPosts();
  };

  const updatePost = async ({id, title, content} : Post) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    toast.success("Post updated");
    fetchPosts();
  } catch {
    toast.error("Update failed");
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    createPost,
    deletePost,
    fetchPosts,
    updatePost
  };
}
