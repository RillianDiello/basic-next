import { getByAltText, render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home page ', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText, debug } = render(<Home />);

    expect(getByText('Olá Dev')).toBeInTheDocument();
    expect(getByAltText('Home Image')).toBeInTheDocument();
  });
});
