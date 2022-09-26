import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../../../service/session.service';
import { TabActionTypes } from '../actions/tab.actions';


@Injectable()
export class TabEffects {
    /*newTab: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(TabActionTypes.NEW_TAB),
            switchMap((payload) => {
                /*return this.sessionService.login(payload).pipe(
                    map((data) =>  loginSuccess(data)),
                    catchError((err) => {
                        return of(loginFailure(err));
                    })
                );
            })));
*/
    /*closeTab: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.LOGIN_SUCCESS),
            tap((data: any) => {
                localStorage.setItem('idToken', data.token);
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
    );*/

    constructor(private actions$: Actions,
                private sessionService: SessionService,
                private router: Router) {}

}
