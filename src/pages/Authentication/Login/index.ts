import React from 'react';

export { default as Login } from './Login';
export const LazyLogin = React.lazy(() => import('./Login'));
