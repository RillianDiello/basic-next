import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SEO from '../../components/SEO';
import styles from './Post.module.scss';
import { createClient } from '@/src/services/prismic';
import { RichText } from 'prismic-dom';

export interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SEO title="Post" />

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params ?? {};

  if (!slug) {
    return {
      props: {},
      revalidate: 60 * 60 * 12, // 12 horas
    };
  }
  const client = createClient({});
  const response = await client.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asText(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 12, // 12 horas
  };
};
