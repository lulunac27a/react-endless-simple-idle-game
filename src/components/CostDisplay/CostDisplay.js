import React from 'react';
import PropTypes from 'prop-types';
import styles from './CostDisplay.module.css';

const CostDisplay = ({ cost }) => (
  <div className={styles.CostDisplay} data-testid="CostDisplay">
    Cost: <div id="cost-value">{cost}</div>
  </div>
);

CostDisplay.propTypes = { cost: PropTypes.number.isRequired };

CostDisplay.defaultProps = {};

export default CostDisplay;
