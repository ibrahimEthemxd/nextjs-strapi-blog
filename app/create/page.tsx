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
      const res = await fetch('http://localhost:1337/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 6bb7213a09d24f18385fec74a74af79c8a40df310fc4464b2d4506912c9d1aa2c813f8aa9fec55d40b649c07c19d6faa092d4158a79974076ba4cd70b1a11a7412b592ac480b52e7bce7a2c9d67a9b95ee094bb1fd297499e6c3782d27306a72e16d0c8162efc84bdfd1f44ecb76012e3ba1123c257978f5a3930d8237fed689`,
        },
        body: JSON.stringify(postBody),
      });

      if (res.ok) {
        setMessage('Blog başarıyla oluşturuldu!');
        setTimeout(() => {
          router.push('/'); // Ana sayfaya yönlendir
        }, 1500); // 1.5 saniye bekle sonra yönlendir
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
          placeholder="Açıklama (description)"
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
          placeholder="Alıntı (excerpt)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Blogu Oluştur
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-200 text-green-800 rounded">
          {message}
        </div>
      )}
    </div>
  );
}
