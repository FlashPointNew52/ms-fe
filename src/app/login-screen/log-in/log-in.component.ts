import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/entity/user';
import { AppState, selectUser } from '../../store/states/app.states';
import { login } from '../../store/actions/auth.actions';

export interface ISigninForm {
    phone: string | null;
    password: string | null;
}

export class SigninForm implements ISigninForm{
    phone: string | null = null;
    password = null;
}

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
    signinForm: SigninForm = new SigninForm();

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.store.select(selectUser).subscribe((state) => {
            setTimeout(() => {
                if (state && (state as User).phones) {
                    this.signinForm.phone = (state as User).phones[0].data;
                } else{
                    this.signinForm.phone = localStorage.getItem('phone');
                }
            }, 10);
        });
        // const cuStr = localStorage.getItem('currentUser');
        // if (cuStr) {
        //     const cu = JSON.parse(cuStr);
        //     this.signinForm.phone = cu.phone;
        // } else{
        //
        // }
        // this.checkSession();
    }

    login(): void {
        this.store.dispatch(login(this.signinForm));
        // localStorage.setItem('currentUser', JSON.stringify({phone: this.signinForm.phone}));
        /*this.sessionService.login(this.signinForm).subscribe(result => {
            if (result == "OK")
                this._userService.cacheUserAndOrg();
        });*/
    }

    checkKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.login();
        }
    }

}
