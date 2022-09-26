import { createAction, props } from '@ngrx/store';

export enum TabActionTypes {
    NEW_TAB = '[Tab] New tab',
    CLOSE_TAB = '[Tab] Close tab'
}

export const newTab = createAction(
    TabActionTypes.NEW_TAB,
    props<{data: any}>()
);

export const closeTab = createAction(
    TabActionTypes.CLOSE_TAB,
    props<{ data: any }>()
);
