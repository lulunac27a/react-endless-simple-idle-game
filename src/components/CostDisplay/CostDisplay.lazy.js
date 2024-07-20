import React, { lazy, Suspense } from 'react';

const LazyCostDisplay = lazy(() => import('./CostDisplay'));

const CostDisplay = (props) => (
  <Suspense fallback={null}>
    <LazyCostDisplay {...props} />
  </Suspense>
);

export default CostDisplay;
