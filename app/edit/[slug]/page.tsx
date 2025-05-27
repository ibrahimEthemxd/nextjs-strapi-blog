'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';

interface PostForm {
  title: string;
  author: string;
  description: string;
}

interface EditPageProps {
  params: {
    slug: string;
  };
}

export default function EditPage({ params }: EditPageProps) {
  const { slug } = params;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<PostForm>({
    title: '',
    author: '',
    description: '',
  });
  const [postId, setPostId] = useState<number | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchPostBySlug() {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/posts?filters[slug][$eq]=${slug}&locale=en&populate=*`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const raw = data.data?.[0];

        if (raw) {
          setPostId(raw.id);
          setForm({
            title: raw.title || '',
            author: raw.author || '',
            description:
              raw.description?.[0]?.children?.[0]?.text || '',
          });
        } else {
          setPostId(null);
        }
      } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
        setPostId(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPostBySlug();
  }, [slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId) {
      alert('Gönderi ID’si alınamadı.');
      return;
    }

    setUpdating(true);

    const updatedData = {
      title: form.title,
      author: form.author,
      description: [
        {
          children: [
            {
              text: form.description,
            },
          ],
        },
      ],
    };

    try {
      const res = await fetch(`${API_URL}/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        body: JSON.stringify({ data: updatedData }),
      });

      if (res.ok) {
        alert('Blog başarıyla güncellendi!');
        router.push(`/posts/${slug}`);
      } else {
        const errorData = await res.json();
        console.error('Güncelleme hatası:', errorData);
        alert('Güncelleme başarısız oldu!');
      }
    } catch (error) {
      console.error('Güncelleme sırasında hata oluştu:', error);
      alert('Güncelleme sırasında bir hata oluştu!');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!postId) return <p>Gönderi bulunamadı</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Düzenle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Başlık"
          required
          disabled={updating}
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Yazar"
          disabled={updating}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded h-40"
          placeholder="Açıklama"
          required
          disabled={updating}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={updating}
        >
          Güncelle
        </button>
      </form>
    </div>
  );
}
