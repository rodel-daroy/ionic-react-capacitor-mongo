export * from './createReducers';
export * from './getDayDifference';
export * from './ProtectedRoute';

export * from './types';

export function parseQueryString(search: string): Record<string, string> {
    if (!search) {
        return {} as Record<string, string>;
    }

    return search
        .substr(1)
        .split('&')
        .reduce((q, v) => {
            const [name, value] = v.split('=');
            return {
                ...q,
                [name]: value,
            };
        }, {} as Record<string, string>);
}

export type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps;
