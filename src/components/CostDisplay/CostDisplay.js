import React from 'react';
import PropTypes from 'prop-types';
import styles from './CostDisplay.module.css';
import NumericDisplay from '../NumericDisplay/NumericDisplay';

const CostDisplay = (
  { cost }, //cost display content
) => (
  <div className={styles.CostDisplay} data-testid="CostDisplay">
    {/*display cost display with specified styles*/}
    Cost:{" "}
    <span id="cost-value">
      <NumericDisplay value={cost} />
    </span>
    {/*bold the cost numeric value*/}
  </div>
);

CostDisplay.propTypes = { cost: PropTypes.number.isRequired };

CostDisplay.defaultProps = {};

export default CostDisplay;
