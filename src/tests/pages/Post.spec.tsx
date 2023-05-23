import { getByAltText, render, screen } from '@testing-library/react';
import Post, { getStaticProps } from '../../pages/posts/[slug]';
import { mocked } from 'ts-jest/utils';
import { createClient } from '../../services/prismic';

const post = {
  slug: 'test-new-post',
  title: 'Title for new post',
  content: 'Post excerpt',
  updatedAt: '25 de dezembro de 2021',
};

jest.mock('../../services/prismic');
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        isFallback: false,
      };
    },
  };
});

describe('Posts page ', () => {
  it('renders correctly', () => {
    const { getByText, debug } = render(<Post post={post} />);
    debug();
    expect(getByText('Title for new post')).toBeInTheDocument();
  });
  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(createClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new Post' }],
          content: [{ type: 'paragraph', text: 'Post content' }],
        },
        last_publication_date: '12-25-2021',
      }),
    });
    const response = await getStaticProps({
      params: { sluge: 'test-new-post' },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'test-new-post',
            title: 'Title for new post',
            content: 'Post excerpt',
            updatedAt: '25 de dezembro de 2021',
          },
        },
        revalidate: 43200,
      }),
    );
  });
});
