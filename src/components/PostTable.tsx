import { Post } from "@/types/post";

interface Props {
  posts: Post[];
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
}

export default function PostTable({ posts, onDelete, onEdit }: Props) {
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b">Title</th>
          <th className="px-4 py-2 border-b">Content</th>
          <th className="px-4 py-2 border-b text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{post.title}</td>
            <td className="px-4 py-2 border-b">{post.content}</td>
            <td className="px-4 py-2 border-b text-center">
              <button
                className="text-blue-600 hover:underline mr-2"
                onClick={() => onEdit(post)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this post?")) {
                    onDelete(post.id);
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
