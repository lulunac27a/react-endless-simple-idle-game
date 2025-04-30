import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumericDisplay.module.css';

function formatNumber(number = 0, shortForm = true) {
  //format number to short form with numeric prefixes
  if (shortForm) {
    //if short form is true
    const exponent = Math.floor(Math.log10(Math.abs(Math.max(number, 1)))); //exponent component of number
    const exponent3 = Math.floor(exponent / 3) * 3; //exponent with multiple of 3 integer numeric digits for engineering notation
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
      'UD',
      'DD',
      'TD',
      'QaD',
      'QiD',
      'SxD',
      'SpD',
      'OD',
      'ND',
      'V',
    ]; //numeric prefixes for large numbers
    if (Math.abs(number) < 1000) {
      //if number is less than 1 thousand
      return Math.min(
        999,
        Math.max(-999, Math.round(Math.abs(number) * Math.sign(number))),
      ).toString(); //return number rounded to nearest integer
    } else {
      //if number is 1 thousand or more
      const mantissa = parseFloat(number.toString()) / Math.pow(10, exponent3); //get the mantissa value from 1 to 999
      const roundedNumber = mantissa.toPrecision(3); //round number to 3 significant figures
      return (
        Math.min(
          999,
          Math.max(
            -999,
            Number(
              Math.abs(Number(roundedNumber)) *
                Math.sign(Number(roundedNumber)),
            ),
          ),
        ).toPrecision(3) + prefixes[exponent3 / 3]
      ); //return coefficient of engineering notation with numeric prefix
    }
  } else {
    //if short form is false
    return Math.round(number).toString(); //return the number rounded to nearest integer
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
