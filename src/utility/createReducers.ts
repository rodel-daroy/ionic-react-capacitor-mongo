import { CaseReducers, ActionReducerMapBuilder, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';

type NoInfer<T> = [T][T extends any ? 0 : never];
export type ExtraReducers<S extends any> =
    | CaseReducers<NoInfer<S>, any>
    | ((builder: ActionReducerMapBuilder<NoInfer<S>>) => void);

export const createReducers = <S extends any>() => <
    CP extends SliceCaseReducers<S>,
    R extends ValidateSliceCaseReducers<S, CP>
>(
    reducers: R,
): R => {
    return reducers;
};
