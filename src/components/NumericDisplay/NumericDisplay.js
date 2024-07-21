import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumericDisplay.module.css';

const NumericDisplay = ({ value }) => (
  <div className={styles.NumericDisplay} data-testid="NumericDisplay">
    {value}
  </div>
);

NumericDisplay.propTypes = {};

NumericDisplay.defaultProps = {};

export default NumericDisplay;
