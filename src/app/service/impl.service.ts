import { Inject, Injectable } from '@angular/core';
import { InterfaceService } from './interface-service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImplService implements InterfaceService{
    headers: HttpHeaders;
    RS: string;

    protected getHeaders(): HttpHeaders{
        return this.headers;
    }

    constructor(@Inject(String) path = '') {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.RS = environment.RESTServer + path;
    }
}
