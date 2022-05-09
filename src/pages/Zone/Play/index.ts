import React from 'react';

export { default as Play } from './Play';
export const LazyPlay = React.lazy(() => import('./Play'));
