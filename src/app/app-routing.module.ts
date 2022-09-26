import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
    { path: '',   redirectTo: '/core', pathMatch: 'full' },
    { path: 'login', component: LoginScreenComponent },
    { path: 'signup', component: LoginScreenComponent },
    { path: 'reset', component: LoginScreenComponent },
    {
        path: 'core',
        canActivate: [AppGuard],
        canActivateChild: [AppGuard],
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule),

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
