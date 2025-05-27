'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    slug: string;
    publishedAt: string;
    description?: { type: string; children: { type: string; text: string }[] }[];
    author?: string | null;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';



export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: '',
        author: '',
        description: '',
    });
    const [postId, setPostId] = useState<number | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchPostBySlug = async () => {
            try {
                const res = await fetch(`${API_URL}/api/posts?filters[slug][$eq]=${slug}&locale=en&populate=*`);
                const data = await res.json();
                const raw = data.data[0];
                console.log('raw:', raw);


                if (raw) {
                    setPostId(raw.id);
                    console.log("raw id değer : " + raw.id);
                    setForm({
                        title: raw.title,
                        author: raw.author || '',
                        description: raw.description?.[0]?.children?.[0]?.text || '',
                    });
                }
            } catch (error) {
                console.error('Veri alınırken hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostBySlug();
    }, [slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postId) {
            alert('Gönderi ID’si alınamadı.');
            return;
        }

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

        const res = await fetch(`${API_URL}/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify({ data: updatedData }),

        });

        if (res.ok) {
            alert('Blog başarıyla güncellendi!');
            router.push(`/posts/${slug}`);
        } else {
            alert('Güncelleme başarısız oldu!');
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
                />
                <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Yazar"
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded h-40"
                    placeholder="Açıklama"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Güncelle
                </button>
            </form>
        </div>
    );
}
