import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from '../../store/states/app.states';
import { TabComponent } from './tab.component';

@Component({
    template: ''
})

export abstract class TabListComponent extends TabComponent{
    protected page: number;
    protected perPage: number;

    protected constructor(protected store: Store<CoreState>) {
        super(store);
        this.page = 1;
        this.perPage = 50;
    }
}
