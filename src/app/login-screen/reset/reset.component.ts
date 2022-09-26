import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/entity/user';
import { reset, signup } from '../../store/actions/auth.actions';
import { AppState, selectUser } from '../../store/states/app.states';

export interface ICheckCodeForm {
    userId: string  | null;
    checkCode: string | null;
    phone: string | null;
    password: string | null;
    confirmPassword: string | null;
}

export class CheckCodeForm implements ICheckCodeForm{
    userId: string | null = null;
    checkCode = null;
    phone: string | null = null;
    password = null;
    confirmPassword = null;
}

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})

export class ResetComponent implements OnInit {
    checkCodeForm: CheckCodeForm = new CheckCodeForm();
    isAuth: boolean = false;

    constructor(private store: Store<AppState>,
                private activatedRoute: ActivatedRoute,
                private router: Router
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.isAuth = params.signup;
        });
    }

    ngOnInit(): void {
        this.store.select(selectUser).subscribe((state) => {
            setTimeout(() => {
                if (state){
                    this.checkCodeForm.userId = (state as User).id || null;
                    if ((state as User).phones){
                        this.checkCodeForm.phone = (state as User).phones[0].data || null;
                    }
                }
            }, 10);
        });


    }

    check_code(): void {
        this.store.dispatch(reset(this.checkCodeForm));
        if ((this.checkCodeForm.checkCode || '').length < 1) {
            // this.hubService.getProperty("modal-window").showMessage("Не указан код восстановления", null);
            return;
        }
        if ((this.checkCodeForm.password || '').length < 6) {
            // this.hubService.getProperty("modal-window").showMessage("Длина пароля должна быть не менее 6 символов", null);
            return;
        }
        if (this.checkCodeForm.password !== this.checkCodeForm.confirmPassword) {
            // this.hubService.getProperty("modal-window").showMessage("Пароли не совпадают", null);
            return;
        }
        /* this.sessionService.check_code(this.checkCodeForm).subscribe(result => {
             if (result) {
                 //this.hubService.getProperty("modal-window").showMessage("Пароль успешно установлен", null);
                 this.typeWindow = 1;
                 this.signinForm.phone = this.checkCodeForm.phone;
                 this.signupForm = {isOrg: false, userName: "", userLastName: "", email: "", phone: "", orgName:"", agreement: false};
                 this.checkCodeForm = {userId: null, checkCode: null, phone: null, password: null, confirmPassword: null};
             }
         });*/

    }

    get_code(): void {
        this.store.dispatch(reset(this.checkCodeForm));
        /*this.sessionService.get_code(this.checkCodeForm).subscribe(result => {
            if (result) {
                this.checkCodeForm.userId = result;
                this.checkCodeForm.password = "";
            }
        });*/
    }

    cancel(): void {
        // this.typeWindow = 1;
        this.router.navigateByUrl('/login');
    }

}
