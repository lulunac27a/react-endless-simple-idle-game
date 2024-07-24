import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumericDisplay from './NumericDisplay';

describe('<NumericDisplay />', () => {
  test('it should mount', () => {
    render(<NumericDisplay />);

    const numericDisplay = screen.getByTestId('NumericDisplay');

    expect(numericDisplay).toBeInTheDocument();
  });
});
