import BlogCard from "./components/BlogCard";

async function getPosts() {
  const res = await fetch('http://localhost:1337/api/posts?populate=*');
  const data = await res.json();
return data.data.map((item: any) => ({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-lg:grid-cols-4 gap-2 w-[1100px] mx-auto">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
 