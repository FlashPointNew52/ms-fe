import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tab, TabType } from '../../models/tab';
import { Utils } from '../../models/utils';
import { newTab, updateTab, closeTab } from '../../store/actions/tab.actions';
import { CoreState } from '../../store/states/app.states';

@Component({
    template: '',
    styleUrls: [
    ],
})
export abstract class TabComponent{
    @Input() tab: Tab;
    utils = Utils;

    protected constructor(protected store: Store<CoreState>) {
        this.tab = new Tab();
    }

    openTab(title: string, type: keyof typeof TabType, args: any): void {
        this.store.dispatch(
            newTab({tab: new Tab(title, TabType[type], args)}));
    }

    updateTab(): void{
        this.store.dispatch(updateTab(this.tab));
    }

    closeTab(): void{
        this.store.dispatch(closeTab({id: this.tab.id}));
    }
}
