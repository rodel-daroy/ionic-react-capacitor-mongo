import React from 'react';

export * from './CardDetailsCollectOpenPack';
export { default as CardDetails } from './CardDetails';
export const LazyCardDetails = React.lazy(() => import('./CardDetails'));
