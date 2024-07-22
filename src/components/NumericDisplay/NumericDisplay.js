import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumericDisplay.module.css';

function formatNumber(number) {
  //format number to short form with numeric prefixes
  const exponent = Math.floor(Math.log10(number));
  const exponent3 = Math.floor(exponent / 3) * 3;
  const prefixes = ['', 'K', 'M', 'B', 'T'];
  if (number < 1000) {
    return number.toString();
  } else {
    const roundedNumber = number.toPrecision(3);
    return (
      (parseFloat(roundedNumber) / Math.pow(10, exponent3)).toPrecision(3) +
      prefixes[exponent3 / 3]
    );
  }
}
const NumericDisplay = (
  { value }, //display numeric values
) => (
  <span className={styles.NumericDisplay} data-testid="NumericDisplay">
    {/*display numeric values with specified styles*/}
    {formatNumber(value)}
    {/*bold the numeric value with short exponential form (engineering notation)*/}
  </span>
);

NumericDisplay.propTypes = { value: PropTypes.number.isRequired };

NumericDisplay.defaultProps = {};

export default NumericDisplay;
