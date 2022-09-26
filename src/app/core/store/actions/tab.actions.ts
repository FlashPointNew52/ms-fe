import { createAction, props } from '@ngrx/store';
import { Tab } from '../../models/tab';

export enum TabActionTypes {
    NEW_TAB = '[Tab] New tab',
    UPDATE_TAB = '[Tab] Update tab',
    SELECT_TAB = '[Tab] Select tab',
    CLOSE_TAB = '[Tab] Close tab'
}

export const newTab = createAction(
    TabActionTypes.NEW_TAB,
    props<{tab: Tab}>()
);

export const updateTab = createAction(
    TabActionTypes.UPDATE_TAB,
    props<Tab>()
);

export const selectTab = createAction(
    TabActionTypes.SELECT_TAB,
    props<{index: number}>()
);

export const closeTab = createAction(
    TabActionTypes.CLOSE_TAB,
    props<{ id: number }>()
);
