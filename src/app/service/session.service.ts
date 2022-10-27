import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ImplService } from './impl.service';
import { map } from 'rxjs/operators';
import { SigninForm } from '../login-screen/log-in/log-in.component';
import { CheckCodeForm } from '../login-screen/reset/reset.component';
import { SignupForm } from '../login-screen/sign-up/sign-up.component';
import { AsyncSubject, BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService extends ImplService{
   //  authorized: Observable<boolean>;
   //  msg: Observable<string>;
   // // user: Observable<User>;
   //  account: Observable<Account>;
   //  authorized: BehaviorSubject<boolean>;
   //  msg: BehaviorSubject<string>;
   //  // user: BehaviorSubject<User>;

    private dataStore = {
        // authorized: false,
        // msg: "",
        // user: null,
        // account: null
    };

    constructor(
                private http: HttpClient
                // private _hubService: HubService
    ) {
        super('/auth');
        /*this.dataStore.authorized = false;
        this.dataStore.user = null;
        this.dataStore.account = null;

        this._authorized = new BehaviorSubject(false) as BehaviorSubject<boolean>;
        this.authorized = this._authorized.asObservable();

        this._msg = new BehaviorSubject("") as BehaviorSubject<string>;
        this.msg = this._msg.asObservable();

        this._user = new BehaviorSubject(null) as BehaviorSubject<User>;
        this.user = this._user.asObservable();*/

    }

    getUser(): void {
        // return this.dataStore.user;
    }

    getAccount(): void{
        // return this.dataStore.account;
    }

    login(signinForm: SigninForm): Observable<any> {

        const endpointUrl = this.RS + '/signin';
        const dataStr = JSON.stringify(signinForm);
        // let ret_subj = new AsyncSubject() as AsyncSubject<string>;
        //
        // this._http.post(_endpointUrl, data_str, {headers: SessionService.headers}).pipe(
        //     map((res: Response) => res)).subscribe(raw => {
        //
        //     let data = JSON.parse(JSON.stringify(raw));
        //     this.setSession(data);
        //     if (data.token) {
        //         this.dataStore.authorized = true;
        //         this._authorized.next(this.dataStore.authorized);
        //         this.dataStore.msg = "logged in";
        //         ret_subj.next("OK");
        //
        //         this.dataStore.user = data.user;
        //         this._user.next(this.dataStore.user);
        //     } else {
        //
        //         this.dataStore.msg = data.msg;
        //         if (data.msg == "302:Wrong password")
        //             this._hubService.getProperty("modal-window").showMessage("Не правильный пароль",  null);
        //         else if (data.msg == "301:User not found")
        //             this._hubService.getProperty("modal-window").showMessage("Пользователь не найден",  null);
        //         else if (data.msg == "000:User is lock")
        //             this._hubService.getProperty("modal-window").showMessage("Пользователь заблокирован,
        //             обратитесь к своему руководителю",  null);
        //         else this._hubService.getProperty("modal-window").showMessage("Ошибка. Обратитесь в службу поддержки MaklerSoft",  null);
        //     }
        //     ret_subj.complete();
        // }, (err: any) => {
        //     this.dataStore.authorized = false;
        //     this._authorized.next(this.dataStore.authorized);
        //     this.handle_errors(err);
        // });
        // return ret_subj;
        return this.http.post(endpointUrl, dataStr, {headers: this.getHeaders(), withCredentials: true});
    }

    private setSession(authResult: any): void {
        // const expiresAt = DateTime.local().add(3600,'second');

        localStorage.setItem('idToken', authResult.token);
    }

    get_code(checkCodeForm: CheckCodeForm): Observable<any>  {
        const endpointUrl = this.RS + '/resetPassword';
        const dataStr = JSON.stringify(checkCodeForm);
        return this.http.post(endpointUrl, dataStr, {headers: this.getHeaders()});
        // let _resourceUrl = this.RS + "/resetPassword";
        // let ret_subj = new AsyncSubject() as AsyncSubject<string>;
        // let data_str = JSON.stringify(checkCodeForm);
        //
        // this._http.post(_resourceUrl, data_str, {withCredentials: true, headers: SessionService.headers}).pipe(
        //     map((res: Response) => res)).subscribe(raw => {
        //     let data = JSON.parse(JSON.stringify(raw));
        //     if (data.userId){
        //         this._hubService.getProperty("modal-window").showMessage("На ваш номер телефон выслан код",  null);
        //         ret_subj.next(data.userId);
        //     }
        //     ret_subj.complete();
        // }, err => this.handle_errors(err));
        //
        // return ret_subj;
    }

    check_code(checkCodeForm: CheckCodeForm): Observable<any> {
        const endpointUrl = this.RS + '/checkCode';
        const dataStr = JSON.stringify(checkCodeForm);
        return this.http.post(endpointUrl, dataStr, {headers: this.getHeaders()});
        // let _resourceUrl = this.RS + "/checkCode";
        // let ret_subj = new AsyncSubject() as AsyncSubject<boolean>;
        // let data_str = JSON.stringify(checkCodeForm);
        //
        // this._http.post(_resourceUrl, data_str, {headers: SessionService.headers}).pipe(
        //     map((res: Response) => res)).subscribe(raw => {
        //         console.log(raw, JSON.parse(JSON.stringify(raw)))
        //         let data = JSON.parse(JSON.stringify(raw));
        //         if (data.result == "OK"){
        //             ret_subj.next(true);
        //         }else
        //             this._hubService.getProperty("modal-window").showMessage("Системная ошибка! Обратитесь в службу поддержки",  null);
        //         ret_subj.complete();
        //     }, err => this.handle_errors(err)
        // );
        //
        // return ret_subj;
    }

    registering(signupForm: SignupForm): Observable<any> {
        const endpointUrl = this.RS + '/signup';
        const dataStr = JSON.stringify(signupForm);
        return this.http.post(endpointUrl, dataStr, {headers: this.getHeaders()});
    }

    logout(): void {
        // const _endpointUrl = this.RS + "/logout";
        //
        // this._http.post(_endpointUrl, "", {withCredentials: true}).pipe(
        //     map((res: Response) => res))
        //     .subscribe(
        //         () => {
        //             this.dataStore.authorized = false;
        //             this._authorized.next(this.dataStore.authorized);
        //
        //             this.dataStore.msg = "logged out";
        //             this._msg.next(this.dataStore.msg);
        //         },
        //         err => this.handle_errors(err)
        //     );

    }

    check(): Observable<any> {
        const endpointUrl = this.RS + '/check';
        return this.http.get(endpointUrl, {headers: this.getHeaders()});
        // let ret_subj = new AsyncSubject() as AsyncSubject<boolean>;
        // let _endpointUrl = this.RS + "/check";
        //
        // this._http.get(_endpointUrl, {withCredentials: true, headers: SessionService.headers}).pipe(
        //     map((res: Response) => res)).subscribe(raw => {
        //         this.dataStore.authorized = true;
        //         this._authorized.next(this.dataStore.authorized);
        //         this.dataStore.msg = "logged in";
        //         this.dataStore.user = raw;
        //         ret_subj.complete();
        //     },
        //     err => {
        //         this.dataStore.authorized = false;
        //         this._authorized.next(this.dataStore.authorized);
        //         this.dataStore.msg = "logged out";
        //         localStorage.removeItem('idToken');
        //     }
        // );
        // return ret_subj;
    }

    handle_errors(err: any): void {
        // let needSupport = false;
        // let errMsg = "Ошибка " + err.status + ": " + err.statusText + "\n";
        // if (err.status == 403) {
        //     this.dataStore.authorized = false;
        //     this._authorized.next(this.dataStore.authorized);
        //     this.dataStore.msg = "logged out";
        //     localStorage.removeItem('idToken');
        //     errMsg = err.error;
        // } else if(err.status == 502){
        //     errMsg = "Сервер временно не доступен, попробуйте позднее или обратитесь в службу поддержки";
        // } else{
        //     try {
        //         let data = JSON.parse(err.error);
        //         errMsg += data.message;
        //         err.message = data.message;
        //         err.error = data.error;
        //         needSupport = data.type == 0;
        //     } catch (e) {
        //         if(typeof err.error == 'object'){
        //             errMsg += err.error.message;
        //             err.message = err.error.message;
        //             err.error = err.error.error;
        //             needSupport = err.error.type == 0;
        //         } else{
        //             errMsg += err.error;
        //             err.message = err.error;
        //             err.error = "";
        //             needSupport = true;
        //         }
        //
        //     }
        // }
        //
        // this._hubService.getProperty("modal-window").showMessage(errMsg, needSupport ? err : null);
    }

    sendMsg(err: any): void {
        // let data_str = JSON.stringify(err);
        //
        // let ret_subj = new AsyncSubject() as AsyncSubject<any>;
        //
        // this._http.post(this._configService.getConfig().RESTServer + "/service/v1/report/err", data_str, {withCredentials: true}).pipe(
        //     map((res: Response) => res)).subscribe(
        //     raw => {
        //         let data = JSON.parse(JSON.stringify(raw));
        //         ret_subj.next(data.result);
        //         ret_subj.complete();
        //     },
        //     error => {
        //         this.handle_errors(error);
        //     }
        // );
        //
        // return ret_subj;
    }
}
