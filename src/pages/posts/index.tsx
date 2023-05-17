import SEO from '@/src/components/SEO';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import styles from './Posts.module.scss';
import { createClient } from '@/src/services/prismic';

/**
 * Paginas Staticas:
 * São geradas no momento de build de producão. Ou quando eu build a pagina
 * o Next cria tudo que é necessário (html, css, js) para renderizar a pagina
 */
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
}

export interface PostsProps {
  posts: Post[];
}
export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <SEO title="Post" />
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug} legacyBehavior>
              <a>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async previewData => {
  const client = createClient({ previewData });
  const response = await client.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
  });
  // response.map(item => console.log(item));

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt:
        post.data.content.find(
          (content: { type: string }) => content.type === 'paragraph',
        )?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    };
  });

  return {
    props: {
      posts,
    }, // will be passed to the page component as props
    revalidate: 60 * 60 * 12, // In Seconds
  };
};
