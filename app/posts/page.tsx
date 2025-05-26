import BlogCard from '../components/BlogCard';
import Link from 'next/link';

const POSTS_PER_PAGE = 6;

async function getPosts(page: number) {
    const res = await fetch(`http://localhost:1337/api/posts?pagination[page]=${page}&pagination[pageSize]=${POSTS_PER_PAGE}&populate=*`, {
        cache: 'no-store'
    });

    if (!res.ok) throw new Error('Veriler alınamadı.');

    const data = await res.json();
    return {
        posts: data.data,
        pagination: data.meta.pagination
    };
}

export default async function BlogList({ searchParams }: { searchParams: { page?: string } }) {
    const page = parseInt(searchParams.page || '1');
    const { posts, pagination } = await getPosts(page);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Tüm Bloglar</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                    <BlogCard
                        key={post.id}
                        post={{
                            slug: post.slug,
                            title: post.title,
                            excerpt: post.excerpt,
                            coverImage: post.coverImage?.url
                                ? `http://localhost:1337${post.coverImage?.url}`
                                : null,
                            publishedAt: post.publishedAt,
                            author: post.author
                        }}
                    />
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pagination.pageCount }, (_, i) => (
                    <Link
                        key={i}
                        href={`?page=${i + 1}`}
                        className={`px-4 py-2 rounded ${i + 1 === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                    >
                        {i + 1}
                    </Link>
                ))}
            </div>
        </div>
    );
}
