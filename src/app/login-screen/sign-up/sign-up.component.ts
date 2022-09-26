import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionService } from '../../service/session.service';
import { signup } from '../../store/actions/auth.actions';
import { AppState } from '../../store/states/app.states';

export interface ISignupForm {
    isOrg: boolean;
    userName: string | null;
    userLastName: string | null;
    email: string | null;
    phone: string | null;
    orgName: string | null;
    agreement: boolean;
}

export class SignupForm implements ISignupForm{
    isOrg = false;
    userName = null;
    userLastName = null;
    email = null;
    phone = null;
    orgName = null;
    agreement = false;
}

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
    signupForm: SignupForm = new SignupForm();

    constructor(private sessionService: SessionService,
                private store: Store<AppState>) { }

    ngOnInit(): void {
    }

    registr(): void {
        if (!this.signupForm.email || !this.signupForm.phone) {
            // this.hubService.getProperty("modal-window").showMessage("Не указаны контактные данные", null);
            return;
        }

        if (!this.signupForm.userName) {
            // this.hubService.getProperty("modal-window").showMessage("Не указано Имя Отчество", null);
            return;
        }

        if (!this.signupForm.userLastName) {
            // this.hubService.getProperty("modal-window").showMessage("Не указана Фамилия", null);
            return;
        }

        if (!this.signupForm.agreement) {
            // this.hubService.getProperty("modal-window").showMessage("Необходимо принять соглашение", null);
            return;
        }

        this.store.dispatch(signup(this.signupForm));

        // this.sessionService.registering(this.signupForm).subscribe((res: any) => {
        //     if (res) {
        //         // this.hubService.getProperty("modal-window").showMessage("Регистрация прошла успешно! Для подтвержения номера телефона и
        //         // задания пароля используйте код, отправленный Вам в SMS сообщении.", null);
        //         // this.checkCodeForm.userId = res;
        //         // this.checkCodeForm.phone = this.signupForm.phone;
        //         // this.typeWindow = 2;
        //     }
        // });
    }

}
