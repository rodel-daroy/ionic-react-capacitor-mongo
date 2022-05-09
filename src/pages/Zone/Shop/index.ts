import React from 'react';

export { default as Shop } from './Shop';
export const LazyShop = React.lazy(() => import('./Shop'));
