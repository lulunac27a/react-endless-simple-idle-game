import { render, screen } from '@testing-library/react';
import App from './App';

test('displays title correctly', () => {
  render(<App />);
  const titleElement = screen.getByText(/endless simple idle game/i);
  expect(titleElement).toBeInTheDocument();
});
test('displays points value', () => {
  render(<App />);
  const pointsElement = screen.getByText((content, element) => {
    const hasText = (node) => node.textContent.match(/points: [\d.\w]+/i);
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(
      (child) => !hasText(child),
    );
    return elementHasText && childrenDontHaveText;
  });
  expect(pointsElement).toBeInTheDocument();
});
