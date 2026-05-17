import { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard";
import type { BlogItem } from "../../utils/api/adminApi/blogs.api";
import { getHomeBlogs, deleteBlog } from "../../utils/api/adminApi/blogs.api";

export default function HomePage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getHomeBlogs();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch home content", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1F0954] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F0954]">
          Popular Blogs
        </h1>
        <p className="text-gray-400 mt-1 text-xs sm:text-sm">
          Explore blogs to skill up...
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-24">
          <span className="animate-pulse text-gray-400 text-sm">Loading...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center px-4">
          <p className="text-lg sm:text-xl font-medium text-[#1F0954]">No content yet</p>
          <p className="text-xs sm:text-sm mt-1 text-gray-400">Start writing something amazing!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              image={item.image || ""}
              title={item.title}
              username={item.creator_username}
              onDeleteConfirm={handleDelete}
              showEdit={false}
              showDelete={false}
              onClick={() => window.open(`/blog/${item.id}`, "_blank")}
            />
          ))}
        </div>
      )}

    </div>
  );
}