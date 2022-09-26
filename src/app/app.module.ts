import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { tabReducer } from './core/store/reducers/tab.reducer';
import { ModalWindowComponent } from './modal-window/modal-window.component';

import { LoginScreenComponent } from './login-screen/login-screen.component';
import { LogInComponent } from './login-screen/log-in/log-in.component';
import { SignUpComponent } from './login-screen/sign-up/sign-up.component';
import { ResetComponent } from './login-screen/reset/reset.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from './service/auth.interceptor';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { messageReducer } from './store/reducers/message.reducer';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
        validation: true,
    };
};

const mapConfig: YaConfig = {
    apikey: '1646b2a3-c7e1-47f1-bfc8-b00a34e52f74',
    lang: 'ru_RU',
    // mode: 'debug'
};

@NgModule({
    declarations: [
        AppComponent,
        ModalWindowComponent,
        LoginScreenComponent,
        LogInComponent,
        SignUpComponent,
        ResetComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ButtonModule,
        DialogModule,
        RadioButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputSwitchModule,
        InputMaskModule,
        CheckboxModule,
        PasswordModule,
        StoreModule.forRoot({authState: authReducer, messageState: messageReducer, tabState: tabReducer}, {}),
        EffectsModule.forRoot(),
        EffectsModule.forFeature([AuthEffects, ]),
        NgxMaskModule.forRoot(maskConfigFunction),
        PanelModule,
        SidebarModule,
        TableModule,
        InputTextModule,
        MenubarModule,
        AngularYandexMapsModule.forRoot(mapConfig)
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
