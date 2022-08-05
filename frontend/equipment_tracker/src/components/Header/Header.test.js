import { render, screen } from '@testing-library/react';
import NavMenu from './NavMenu';

test('renders learn react link', () => {
  render(<NavMenu />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
