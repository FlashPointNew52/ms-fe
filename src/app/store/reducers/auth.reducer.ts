import { createReducer, on } from '@ngrx/store';
import { Confirmation, ConfirmationImpl } from '../../models/entity/contact';
import { User } from '../../models/entity/user';
import {
    check, checkSuccess,
    loginFailure,
    loginSuccess, logout,
    resetFailure,
    resetGetCodeSuccess,
    resetSuccess,
    signupFailure,
    signupSuccess
} from '../actions/auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null
};

export const authReducer = createReducer(
    initialState,
    on(checkSuccess, (state: AuthState, data: any) => (
        { isAuthenticated: true, user: (data as User)})
    ),
    on(loginSuccess, (state: AuthState, data: any) => (
        { isAuthenticated: true, user: (data.user as User)})
    ),
    on(loginFailure, (state: AuthState, data: any) => (initialState)
    ),
    on(signupSuccess, (state: AuthState, data: any) => ({isAuthenticated: false,
            user: {... new User(), id: data.id, phones: [new ConfirmationImpl(data.phone, false, 'SELF')]}
    })),
    on(signupFailure, (state: AuthState, data: any) => ({isAuthenticated: false,
        user: {... new User(), phones: [new ConfirmationImpl(data.phone, false, 'SELF')]}
    })),
    on(resetGetCodeSuccess, (state: AuthState, data: any) => ({...state, user: {...state.user, id: data.id} as User
    })),
    on(resetSuccess, (state: AuthState, data: any) => ({...state})),

    on(resetFailure, (state: AuthState, data: any) => ({...state})),

    on(logout, (state: AuthState) => ({...state, isAuthenticated: false}))
);


