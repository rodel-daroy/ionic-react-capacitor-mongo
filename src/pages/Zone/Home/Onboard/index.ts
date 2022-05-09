import React from 'react';

export * from './Onboard';

export { default as Tutorial } from './Onboard';
export const LazyOnboard = React.lazy(() => import('./Onboard'));
