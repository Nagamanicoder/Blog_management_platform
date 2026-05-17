import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicBlogById } from "../../utils/api/adminApi/blogs.api";
import type { BlogItem } from "../../utils/api/adminApi/blogs.api";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogItem | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const data = await getPublicBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <span className="animate-pulse text-teal-600 text-sm">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-teal-50/40">

      {/* Top Bar */}
      <div className="px-6 py-4 border-b border-teal-100 bg-white/70 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div>
            <p className="font-bold text-[#1F0954] text-sm leading-tight">INSCRIBE</p>
            <p className="text-[10px] text-teal-600 leading-tight">Craft your digital literacy</p>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Image */}
        {blog.image && (
          <div className="w-full overflow-hidden rounded-2xl mb-8 shadow-md">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[420px] object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#1F0954] mb-2 leading-snug">
          {blog.title}
        </h1>

        {/* Author */}
        <p className="text-sm text-[#1F0954] font-medium mb-6 text-right">
          Author -  {blog.creator_username?.charAt(0).toUpperCase() + blog.creator_username?.slice(1)}
        </p>

        {/* Rich Text Content */}
        <div
          className="prose prose-slate max-w-none
            prose-headings:text-[#1F0954] prose-headings:font-bold
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-strong:text-[#1F0954]
            prose-li:text-gray-700
            prose-img:rounded-xl prose-img:w-full prose-img:object-cover prose-img:my-4
            prose-a:text-teal-600 prose-a:underline"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;