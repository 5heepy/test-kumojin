import { render, screen } from '@testing-library/react';
import HomePage from './Home';

describe('HomePage', () => {
  test('renders title', () => {
    render(<HomePage />);
    const title = screen.getByText(/Test Solutions Kumojin/i);
    expect(title).toBeInTheDocument();
  });
});
