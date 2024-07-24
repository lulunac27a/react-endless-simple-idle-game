import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumericDisplay.module.css';

function formatNumber(number = 0, shortForm = true) {
  //format number to short form with numeric prefixes
  if (shortForm) {
    //if short form is true
    const exponent = Math.floor(Math.log10(Math.abs(Math.max(number, 1)))); //exponent component of number
    const exponent3 = Math.floor(exponent / 3) * 3; //exponent with multiple of 3 for engineering notation
    const prefixes = [
      '',
      'K',
      'M',
      'B',
      'T',
      'Qa',
      'Qi',
      'Sx',
      'Sp',
      'O',
      'N',
      'D',
    ]; //numeric prefixes
    if (Math.abs(number) < 1000) {
      //if number is less than 1 thousand
      return Math.round(number).toString(); //return number rounded to nearest integer
    } else {
      //if number is 1 thousand or more
      const roundedNumber = number.toPrecision(3); //round number to 3 significant figures
      return (
        (parseFloat(roundedNumber) / Math.pow(10, exponent3)).toPrecision(3) +
        prefixes[exponent3 / 3]
      ); //return coefficient of engineering notation with numeric prefix
    }
  } else {
    //if short form is false
    return Math.round(number).toString(); //return number rounded to nearest integer
  }
}
const NumericDisplay = (
  { value, shortForm }, //display numeric values
) => (
  <span className={styles.NumericDisplay} data-testid="NumericDisplay">
    {/*display numeric values with specified styles*/}
    {formatNumber(value, shortForm)}
    {/*bold the numeric value display with short exponential form (engineering notation) if short form is true*/}
  </span>
);

NumericDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  shortForm: PropTypes.bool.isRequired,
};

NumericDisplay.defaultProps = {};

export default NumericDisplay;
