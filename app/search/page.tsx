'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!query) {
      setPosts([]);
      return;
    }

    fetch(`http://localhost:1337/api/posts?filters[title][$containsi]=${query}&populate=coverImage`)
      .then(res => res.json())
      .then(data => {
        if (data.data) setPosts(data.data);
        else setPosts([]);
      });
  }, [query]);

  return (
    <div className="p-4">
      {posts.length === 0 && <p>Sonuç bulunamadı.</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
       {posts.map(post => {
  const { id, title, slug, coverImage, description, author, publishedAt } = post;

  const imageUrl = coverImage && coverImage.url
    ? `http://localhost:1337${coverImage.url}`
    : '/4.jpg';

  const excerpt =
    post.excerpt ||
    description?.[0]?.children?.[0]?.text?.slice(0, 100) || 'Açıklama yok';

  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Tarih yok';

  return (
    <li key={id} className="border rounded p-2 shadow hover:shadow-md transition">
      <Link href={`/posts/${slug}`}>
        <div>
          {/* Görsel */}
          <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center rounded overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Başlık */}
          <h2 className="mt-2 text-lg font-semibold">{title}</h2>

          {/* Açıklama */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{excerpt}</p>

          {/* Yazar ve Tarih */}
          <div className="text-xs text-gray-400 mt-2 flex justify-between">
            <span>{author || 'Bilinmeyen yazar'}</span>
            <span>{dateStr}</span>
          </div>
        </div>
      </Link>
    </li>
  );
})}

      </ul>
    </div>
  );
}
