import React from 'react';

export { default as Zone } from './Zone';
export const LazyZone = React.lazy(() => import('./Zone'));
