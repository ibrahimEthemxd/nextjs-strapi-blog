// components/BlogCard.tsx
import Link from 'next/link';

export default function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="border rounded p-4 shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-gray-500 text-sm">
          {new Date(post.publishedAt).toISOString().split('T')[0]}
        </p>
      </div>
    </Link>
  );
}
