import Image from 'next/image';

interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  description?: { children: { text: string }[] }[];
  coverImage?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  author?: string;
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:1337/api/posts');
  const data = await res.json();
  return data.data.map((item: any) => ({
    slug: item.slug,
  }));
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`http://localhost:1337/api/posts?filters[slug][$eq]=${slug}&populate=*`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.data[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Gönderi bulunamadı" };
  }

  return {
    title: post.title,
    description: post.description?.[0]?.children?.[0]?.text || 'Blog gönderisi',
  };
}

export default async function PostDetail({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <p>Gönderi bulunamadı.</p>;
  }

  const imageUrl = post.coverImage?.data?.attributes?.url || '/4.jpg';

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        {new Date(post.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="relative w-full h-64 mb-4 rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.title || 'Post image'}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded"
          priority
        />
      </div>
      <p className="text-lg leading-relaxed">
        {post.description?.[0]?.children?.[0]?.text || 'İçerik bulunamadı.'}
      </p>
      <p className="mt-4 text-sm text-gray-500">Yazar: {post.author || 'Bilinmiyor'}</p>
    </div>
  );
}
