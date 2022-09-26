import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TabState } from '../reducers/tab.reducer';

export interface CoreState {
    tabState: TabState;
}

export const selectTabState = createFeatureSelector<TabState>('tabState');

export const selectTabNum = createSelector(
    selectTabState,
    (state: TabState) => state.selectedTab
);

