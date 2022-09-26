import { createReducer, on } from '@ngrx/store';
import { IMessage, Message, MessageType } from '../../models/message';
import { closeMessage, openMessage } from '../actions/message.actions';

export interface MessageState {
    message: IMessage;
}

export const initialState: MessageState = {
    message: {
        text: null,
        type: MessageType.INFO
    },
};

export const messageReducer = createReducer(
    initialState,
    // @ts-ignore-all
    on(openMessage, (state: State, data: any) => (
        { ...state,  message: new Message(data.error.errorMessage, MessageType.ERROR)})
    ),
    // @ts-ignore-all
    on(closeMessage, (state: State) => (initialState)
    ),
);
