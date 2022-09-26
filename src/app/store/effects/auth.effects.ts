import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CheckCodeForm } from '../../login-screen/reset/reset.component';
import { SignupForm } from '../../login-screen/sign-up/sign-up.component';
import { SessionService } from '../../service/session.service';
import { Router } from '@angular/router';
import {
    AuthActionTypes,
    loginSuccess,
    loginFailure,
    signupFailure,
    signupSuccess,
    resetFailure, resetGetCodeSuccess, resetSuccess, checkSuccess, checkFailure
} from '../actions/auth.actions';
import { openMessage } from '../actions/message.actions';


@Injectable()
export class AuthEffects {
    check: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.CHECK),
            switchMap((payload) => {
                return this.sessionService.check().pipe(
                    map((data) =>  checkSuccess(data)),
                    catchError((err) => {
                        return of(checkFailure(err));
                    })
                );
            })));

    checkSuccess: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.CHECK_SUCCESS),
            tap((data: any) => {
                // localStorage.setItem('idToken', data.token);
                this.router.navigateByUrl('/core');
            })
        ), { dispatch: false }
        );

    checkFailure: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.CHECK_FAILURE),
            tap((data: any) => {
                localStorage.removeItem('idToken');
            })
        ), { dispatch: false }
    );

    login: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN),
            switchMap((payload) => {
                return this.sessionService.login(payload).pipe(
                    map((data) =>  loginSuccess(data)),
                    catchError((err) => {
                        return of(loginFailure(err));
                    })
                );
            })));

    loginSuccess: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN_SUCCESS),
            tap((data: any) => {
                localStorage.setItem('idToken', data.token);
                localStorage.setItem('phone', data.phone);
                this.router.navigateByUrl('/core');
            })
        ), { dispatch: false }
    );

    loginFailure: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN_FAILURE),
            switchMap((payload) => {
                localStorage.removeItem('idToken');
                this.router.navigateByUrl('/login');
                return of(openMessage(payload));
            })
        ),
    );

    signup: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.SIGNUP),
            switchMap((payload) => {
                return this.sessionService.registering(payload).pipe(
                    map((data) => signupSuccess({id: data.userId, phone: (payload as SignupForm).phone || ''})),
                    tap((data: any) => {
                        this.router.navigateByUrl('/reset?signup=true');
                    }),
                    catchError((err) => {
                        return of(signupFailure({err, phone: (payload as SignupForm).phone || ''}));
                    })
                );
            })));

    signupSuccess: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.SIGNUP_SUCCESS),
        ), { dispatch: false }
    );

    signupFailure: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.SIGNUP_FAILURE),
            switchMap((payload: any)  => {
                if (payload.err.error.error.message.indexOf('already exist') > -1 ){
                    this.router.navigateByUrl('/login');
                }
                return of(openMessage(payload.err));
            })
        ),
    );

    reset: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.RESET),
            switchMap((payload: CheckCodeForm) => {
                if (payload.userId == null){
                    return this.sessionService.get_code(payload).pipe(
                        map((data) => resetGetCodeSuccess({ id: data.userId})),
                        catchError((err) => {
                            return of(resetFailure({err, phone: payload.phone || ''}));
                        })
                    );
                } else{
                    return this.sessionService.check_code(payload).pipe(
                        map((data) => resetSuccess(data)),
                        catchError((err) => {
                            return of(resetFailure({err, phone: payload.phone || ''}));
                        })
                    );
                }
            })));

    resetGetCodeSuccess: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.RESET_GET_CODE_SUCCESS),
            switchMap((payload: any)  => {
                const data: any = {error: {errorMessage: 'На ваш телефон выслан код'}};
                return of(openMessage(data));
            })
        ),
    );

    resetSuccess: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.RESET_SUCCESS),
            switchMap((payload) => {
                this.router.navigateByUrl('/login');
                const data: any = {error: {errorMessage: 'Пароль успешно установлен'}};
                return of(openMessage(data));
            })
        ),
    );

    resetFailure: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.RESET_FAILURE),
            switchMap((payload: any)  => {
                return of(openMessage(payload.err));
            })
        ),
    );

    logout: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGOUT),
            tap((data: any) => {
                localStorage.removeItem('idToken');
                this.router.navigateByUrl('/login');
            })
        ), { dispatch: false }
    );

    constructor(private actions$: Actions,
                private sessionService: SessionService,
                private router: Router) {}

}
