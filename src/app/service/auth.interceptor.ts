import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { logout } from '../store/actions/auth.actions';
import { AppState } from '../store/states/app.states';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('idToken');
        let handl: Observable<HttpEvent<any>>;
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken)
                    .append('Content-Type', 'application/json')
            });

            handl = next.handle(cloned);
        } else {
            handl = next.handle(req);
        }
        return handl.pipe(
            catchError(error => {
                if (error.status === 401 || error.status === 403) {
                    localStorage.removeItem('idToken');
                    this.store.dispatch(logout());
                    throw error;
                    // return concat(this.refreshToken$, throwError(new RetryRequestError()));
                } else {
                    throw error;
                }
            })
        );
    }

}
