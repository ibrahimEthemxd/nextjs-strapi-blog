import BlogCard from "./components/BlogCard";
import Link from "next/link"

async function getPosts() {
  const res = await fetch('http://localhost:1337/api/posts?populate=*');
  const data = await res.json();
return data.data.slice(0,9).map((item: any) => ({
  id: item.id,
  title: item.title,
  slug: item.slug,
  publishedAt: item.publishedAt,
  excerpt: item.excerpt,
  coverImage: item.coverImage?.url
    ? `http://localhost:1337${item.coverImage?.url}`
    : null,
  author: item.author || "Bilinmeyen"
}));
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
 <main className="max-w-[1100px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/posts">
          <button className=" cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Tüm Blogları Gör
          </button>
        </Link>
      </div>
    </main>
  );
}
 