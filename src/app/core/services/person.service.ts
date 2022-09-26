import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Confirmation, ConfirmationImpl, Contact } from '../../models/entity/contact';
import { ImplService } from '../../service/impl.service';
import { Person } from '../models/entity/person';

@Injectable({
    providedIn: 'root'
})
export class PersonService extends ImplService{

    constructor(
        private http: HttpClient
        // private _hubService: HubService
    ) {
        super('/api/v1.0/persons/');
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

    save(person: Person): Observable<{ person: Person}>{
        const endpointUrl = this.RS + 'save';
        const dataStr = JSON.stringify(person);
        return this.http.post<{ person: Person}>(endpointUrl, dataStr, {headers: this.getHeaders()});

        // let ret_subj = new AsyncSubject() as AsyncSubject<Person>;
        // let _resourceUrl = this.RS + "save";
        //
        // delete person["selected"];
        // let data_str = JSON.stringify(person);
        //
        // this._http.post(_resourceUrl, data_str, {withCredentials: true}).pipe(
        //     map((res: Response) => res)).subscribe(
        //     raw => {
        //         let p: Person = JSON.parse(JSON.stringify(raw)).person;
        //         ret_subj.next(p);
        //         ret_subj.complete();
        //     },
        //     err => {
        //         this._sessionService.handle_errors(err);
        //     }
        // );
        //
        // return ret_subj;
    }
    list(page: number, perPage: number, filter: any, sort: any, searchQuery: string, source: string = 'local'): AsyncSubject<Person[]>{
        const retSubj = new AsyncSubject() as AsyncSubject<Person[]>;
        const query = [];
        query.push('source=' + source);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        if (searchQuery != null) {
            query.push('searchQuery=' + searchQuery);
        }
        query.push('filter=' + JSON.stringify(filter));
        query.push('sort=' + JSON.stringify(sort));

        const endpointUrl = this.RS + 'list?' + query.join('&');

        this.http.get<Person[]>(encodeURI(endpointUrl), {headers: this.getHeaders()})
            // .pipe(map((res: Person[]) => res))
            .subscribe(
            raw => {
                const data = JSON.parse(JSON.stringify(raw));
                const persons: Person[] = [];
                for (const hit of data.list.searchHits.reverse()){
                    persons.push(hit.content);
                }
                retSubj.next(persons);
                retSubj.complete();
            }
        );

        return retSubj;
    }

    delete(id: string): Observable<{ person: Person}> {
        const endpointUrl = this.RS + `delete/${id}`;
        return this.http.delete<{ person: Person }>(endpointUrl, {headers: this.getHeaders()});
    }
}
