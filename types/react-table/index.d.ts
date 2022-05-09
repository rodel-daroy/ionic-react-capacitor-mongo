import { UseFiltersInstanceProps } from 'react-table';

declare module 'react-table' {
    type Filter<T, K extends keyof T = keyof T> = {
        id: K;
        value: T[K] | undefined;
    };
    interface TableInstance<D> extends UseFiltersInstanceProps<D> {
        setFilter: <K extends keyof D>(
            columnId: K,
            updater:
                | ((filterValue: Partial<D[K]>) => D[K] | Partial<D[K]> | undefined)
                | D[K]
                | Partial<D[K]>
                | string // TODO: This needs to be removed and cardStats filter improved to work for arrays
                | undefined,
        ) => void;
        setAllFilters: (updater: Filter<D>[] | ((filters: Filter<D>[]) => Filter<D>[])) => void;
        setGlobalFilter: (value: string) => void;
        state: TableState<D>;
    }

    interface TableState<D, K extends keyof D = keyof D> {
        filters: Array<{ id: K; value: typeof D[K] }>;
        globalFilter?: string;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface TableOptions<D extends Record<string, unknown> = Record<string, unknown>> extends UseFiltersOptions<D> {}
}
