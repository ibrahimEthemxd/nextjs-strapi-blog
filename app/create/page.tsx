'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postBody = {
      data: {
        title,
        description: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: description }],
          },
        ],
        author,
        excerpt,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
      },
    };

    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(postBody),
      });

      if (res.ok) {
        setMessage('Blog başarıyla oluşturuldu!');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        const error = await res.json();
        console.error('Hata:', error);
        alert('Blog oluşturulamadı.');
      }
    } catch (err) {
      console.error('Hata:', err);
      alert('Sunucu hatası!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Yeni Blog Oluştur</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        />

        <textarea
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-4 py-2 h-32"
          required
        />

        <input
          type="text"
          placeholder="Yazar"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="text"
          placeholder="Özet"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
        >
          Blogu Oluştur
        </button>
      </form>

      {message && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-200 text-green-800 px-6 py-3 rounded shadow-lg z-50 font-semibold"
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}
