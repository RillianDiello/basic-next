import { getByAltText, render, screen } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts/index';
import { mocked } from 'ts-jest/utils';
import { createClient } from '../../services/prismic';

const posts = [
  {
    slug: 'test-new-post',
    title: 'Title for new post',
    excerpt: 'Post excerpt',
    updateAt: '15 de maio 2023',
  },
];
jest.mock('../../services/createClient');
describe('Posts page ', () => {
  it('renders correctly', () => {
    const { getByText, debug } = render(<Posts posts={posts} />);
    debug();
    expect(getByText('Title for new post')).toBeInTheDocument();
  });
  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(createClient);
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'My new Post' }],
              content: [{ type: 'paragraph', text: 'Post excerpt' }],
            },
            last_publication_date: '12-25-2023',
          },
        ],
      }),
    });
    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new Post',
              excerpt: 'Post excerpt',
              updatedAt: '25 de dezembro de 2021',
            },
          ],
        },
      }),
    );
  });
});
