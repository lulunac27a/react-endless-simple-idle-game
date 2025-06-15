import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumericDisplay, { formatNumber } from './NumericDisplay';

describe('<NumericDisplay />', () => {
  test('it should mount', () => {
    render(<NumericDisplay />);

    const numericDisplay = screen.getByTestId('NumericDisplay');

    expect(numericDisplay).toBeInTheDocument();
  });
  test('it should format number with default values', () => {
    const defaultNumericValue = formatNumber();
    expect(defaultNumericValue).toBe('0');
  });
  test('it should render with large number', () => {
    const largeNumericValue = formatNumber(9876);
    const bigNumericValue = formatNumber(19283);
    const veryLargeNumericValue = formatNumber(7654321);
    expect(largeNumericValue).toBe('9.88K');
    expect(bigNumericValue).toBe('19.28K');
    expect(veryLargeNumericValue).toBe('7.65M');
  });
  test('it should render with large number without short format', () => {
    const largeNumericValue = formatNumber(9876.543, false);
    const smallNumericValue = formatNumber(654.321, false);
    expect(largeNumericValue).toBe('9877');
    expect(smallNumericValue).toBe('654');
  });
  test('it should render with non-integer number', () => {
    const smallDecimalNumericValue = formatNumber(3.456);
    const bigDecimalNumericValue = formatNumber(987.65);
    expect(smallDecimalNumericValue).toBe('3');
    expect(bigDecimalNumericValue).toBe('988');
  });
});
