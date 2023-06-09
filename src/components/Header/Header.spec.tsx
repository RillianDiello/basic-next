import { getByAltText, render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('Header component', () => {
  // it('renders correctly', () => {
  //   const { getByText } = render(
  //     <Header href="/" activeClassName="active">
  //       <a>Home</a>
  //     </Header>,
  //   );

  //   expect(getByText('Home')).toBeInTheDocument();
  //   expect(getByText('Posts')).toBeInTheDocument();
  // });

  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<Header />);

    screen.logTestingPlaygroundURL();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
    expect(getByAltText('DevNews!')).toBeInTheDocument();
  });
});
