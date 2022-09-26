import { createAction, props } from '@ngrx/store';

export enum MessageActionTypes {
    OPEN_MESSAGE = '[Message] Open message',
    CLOSE_MESSAGE = '[Message] Close message',
}

export const openMessage = createAction(
    MessageActionTypes.OPEN_MESSAGE,
    props<{ data: any }>()
);

export const closeMessage = createAction(
    MessageActionTypes.CLOSE_MESSAGE
);
