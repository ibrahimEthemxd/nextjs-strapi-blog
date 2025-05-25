// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const res = await fetch('http://localhost:1337/api/posts');
  const data = await res.json();
  return data.data.map((item: any) => ({
    slug: item.slug,
  }));
}

async function getPost(slug: string) {
  const res = await fetch(`http://localhost:1337/api/posts?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();
  return data.data[0];
}

export default async function PostDetail({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        {new Date(post.publishedAt).toISOString().split('T')[0]}
      </p>
      <p className="text-lg">{post.description?.[0]?.children?.[0]?.text}</p>
    </div>
  );
}
