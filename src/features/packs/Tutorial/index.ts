import React from 'react';

export * from './Tutorial';

export { default as Tutorial } from './Tutorial';
export const LazyTutorial = React.lazy(() => import('./Tutorial'));
