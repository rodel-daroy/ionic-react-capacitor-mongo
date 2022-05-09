import React from 'react';

export { default as Home } from './Home';
export const LazyHome = React.lazy(() => import('./Home'));
