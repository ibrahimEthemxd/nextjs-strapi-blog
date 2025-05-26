import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }: { post: any }) {
  const defaultImage = "/4.jpg";
  const imageUrl = post.coverImage || defaultImage;

  return (
    <div className="mx-auto w-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 h-[300px] w-full flex flex-col">
        <Link href={`/posts/${post.slug}`}>
          <div className="relative w-full h-40 cursor-pointer">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-xl"
            />
          </div>
        </Link>

        {/* İçerik */}
        <div className="p-3 flex flex-col flex-1 justify-between">
          <div>
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-lg text-cyan-900 font-semibold mb-2 line-clamp-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 text-sm line-clamp-2">
              {post.excerpt?.slice(0, 100) || "No excerpt available"}...
            </p>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-gray-400 text-xs">
              <span>{new Date(post.publishedAt).toISOString().split('T')[0]}</span>
              <span> • {post.author || "Unknown"}</span>
            </div>

            {/* Daha Fazla butonu */}
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-600 text-m hover:underline"
            >
              Daha Fazla →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
