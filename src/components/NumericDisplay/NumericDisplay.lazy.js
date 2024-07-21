import React, { lazy, Suspense } from 'react';

const LazyNumericDisplay = lazy(() => import('./NumericDisplay'));

const NumericDisplay = props => (
  <Suspense fallback={null}>
    <LazyNumericDisplay {...props} />
  </Suspense>
);

export default NumericDisplay;
