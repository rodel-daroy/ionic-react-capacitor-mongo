import React from 'react';

export { default as Register } from './Register';
export const LazyRegister = React.lazy(() => import('./Register'));
