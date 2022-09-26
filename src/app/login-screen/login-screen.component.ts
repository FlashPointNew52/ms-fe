import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { filter } from 'rxjs/operators';
import {SessionService} from '../service/session.service';
import { check } from '../store/actions/auth.actions';
import { AppState, selectAuthenticated, selectAuthState, selectUser } from '../store/states/app.states';

@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrls: ['./login-screen.component.scss']
})

export class LoginScreenComponent implements OnInit {
    public authorized: boolean = false;

    path: string = '';

    constructor(private sessionService: SessionService,
                private store: Store<AppState>,
                private route: Router
                /*private _userService: UserService,
                private _hubService: HubService*/) {
        route.events.pipe(filter(event => event instanceof NavigationEnd)
        ).subscribe(data => {
            this.path = (data as NavigationEnd).url;
        });
    }

    ngOnInit(): void {
        this.store.select(selectAuthenticated).subscribe((state) => {
            setTimeout(() => {
                this.authorized = state;
            }, 10);
        });
        this.checkSession();
    }

    checkSession(): void {
        this.store.dispatch(check());
        /*this.sessionService.check().subscribe(res => {
            if (res)
                this._userService.cacheUserAndOrg();
        });*/
    }

    _logout(): void {
        this.sessionService.logout();
    }





}
