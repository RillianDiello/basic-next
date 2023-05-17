import Posts from '../../pages/posts';
import { render } from '@testing-library/react';

const posts = [
  {
    slug: 'test-new-post',
    title: 'Title for new post',
    excerpt: 'Post excerpt',
    updateAt: '15 de maio 2023',
  },
];

describe('Posts page ', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Posts posts={posts} />);

    expect(getByText('Title for new post')).toBeInTheDocument();
  });
});
