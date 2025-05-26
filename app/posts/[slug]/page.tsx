import Image from 'next/image';
import Link from 'next/link';

interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  description?: { children: { text: string }[] }[];
  coverImage?: string | null;
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
    const item = data.data[0];

    if (!item) return null;

    return {
      title: item.title,
      slug: item.slug,
      publishedAt: item.publishedAt,
      description: item.description,
      coverImage: item.coverImage?.url
        ? `http://localhost:1337${item.coverImage.url}`
        : null,
      author: item.author,
    };
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

  const defaultImage = "/4.jpg";
  const imageUrl = post.coverImage || defaultImage;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
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
      <div className="mt-8 text-right">
        <Link href={`/edit/${params.slug}`}>
          <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Düzenle
          </button>
        </Link>
      </div>
    </div>
  );
}
