import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticated } from './store/states/app.states';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements  CanActivate, CanActivateChild{
    authorized: boolean = false;

    constructor(private store: Store<AppState>,
                private router: Router){
        this.store.select(selectAuthenticated).subscribe((state) => {
            this.authorized = state;
        });
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authorized){
            return this.router.parseUrl('/login');
        }
        return true;

    }

    canActivateChild(childRoute: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authorized){
            return this.router.parseUrl('/login');
        }
        return true;
    }
  
}
