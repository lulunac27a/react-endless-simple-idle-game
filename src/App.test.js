import { render, screen } from '@testing-library/react';
import App from './App';

test('displays title correctly', () => {
  render(<App />);
  const titleElement = screen.getByText(/endless simple idle game/i);
  expect(titleElement).toBeInTheDocument();
});
