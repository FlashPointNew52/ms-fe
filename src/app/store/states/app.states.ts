import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { MessageState } from '../reducers/message.reducer';

export interface AppState {
    authState: AuthState;
    messageState: MessageState;
}

export const selectMessageState = createFeatureSelector<MessageState>('messageState');

export const selectAuthState = createFeatureSelector<AuthState>('authState');

export const selectAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);
