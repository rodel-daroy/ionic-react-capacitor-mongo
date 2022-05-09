import React from 'react';

export { default as Collect } from './Collect';
export const LazyCollect = React.lazy(() => import('./Collect'));
