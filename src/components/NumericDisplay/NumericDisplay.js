import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumericDisplay.module.css';

const NumericDisplay = (
  { value }, //display numeric values
) => (
  <div className={styles.NumericDisplay} data-testid="NumericDisplay">
    {/*display numeric values with specified styles*/}
    {value}
    {/*bold the numeric value*/}
  </div>
);

NumericDisplay.propTypes = { value: PropTypes.number.isRequired };

NumericDisplay.defaultProps = {};

export default NumericDisplay;
