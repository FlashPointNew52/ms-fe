import { createAction, props } from '@ngrx/store';
import { SigninForm } from '../../login-screen/log-in/log-in.component';
import { CheckCodeForm } from '../../login-screen/reset/reset.component';
import { SignupForm } from '../../login-screen/sign-up/sign-up.component';

export enum AuthActionTypes {
    CHECK = '[Auth] Check',
    CHECK_SUCCESS = '[Auth] Check Success',
    CHECK_FAILURE = '[Auth] Check FAIL',
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login FAIL',
    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] SIGNUP Success',
    SIGNUP_FAILURE = '[Auth] SIGNUP FAIL',
    RESET = '[Auth] Reset',
    RESET_GET_CODE_SUCCESS = '[Auth] RESET Get code Success',
    RESET_SUCCESS = '[Auth] RESET Success',
    RESET_FAILURE = '[Auth] RESET FAIL',
    LOGOUT = '[Auth] LOGOUT',
}

export const check = createAction(
    AuthActionTypes.CHECK
);

export const checkSuccess = createAction(
    AuthActionTypes.CHECK_SUCCESS,
    props<{ data: any }>()
);

export const checkFailure = createAction(
    AuthActionTypes.CHECK_FAILURE,
    props<{ data: any }>()
);

export const login = createAction(
    AuthActionTypes.LOGIN,
    props<SigninForm>()
);

export const logout = createAction(
    AuthActionTypes.LOGOUT
);

export const loginSuccess = createAction(
    AuthActionTypes.LOGIN_SUCCESS,
    props<{ data: any }>()
);

export const loginFailure = createAction(
    AuthActionTypes.LOGIN_FAILURE,
    props<{ data: any }>()
);

export const signup = createAction(
    AuthActionTypes.SIGNUP,
    props<SignupForm>()
);

export const signupFailure = createAction(
    AuthActionTypes.SIGNUP_FAILURE,
    props<{ err: any, phone: string }>()
);

export const signupSuccess = createAction(
    AuthActionTypes.SIGNUP_SUCCESS,
    props<{id: string, phone: string}>()
);

export const reset = createAction(
    AuthActionTypes.RESET,
    props<CheckCodeForm>()
);

export const resetGetCodeSuccess = createAction(
    AuthActionTypes.RESET_GET_CODE_SUCCESS,
    props<{ id: any }>()
);

export const resetSuccess = createAction(
    AuthActionTypes.RESET_SUCCESS,
    props<{ data: any }>()
);

export const resetFailure = createAction(
    AuthActionTypes.RESET_FAILURE,
    props<{ err: any, phone: string }>()
);
