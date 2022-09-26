import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../../store/actions/auth.actions';
import { AppState } from '../../../../store/states/app.states';
import { Tab, TabType } from '../../../models/tab';
import { closeTab, newTab, selectTab } from '../../../store/actions/tab.actions';
import { CoreState, selectTabNum, selectTabState } from '../../../store/states/app.states';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-tab-root',
    templateUrl: './tab-root.component.html',
    styleUrls: ['./tab-root.component.scss']
})
export class TabRootComponent implements OnInit {
    tabs: Tab[] = [];
    tabsMenu: MenuItem[] = [];
    tabTypes = TabType;
    selected: number = 0;
    sidebar: number = 0;

    constructor(private store: Store<CoreState>, private appStore: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.select(selectTabState).subscribe((state) => {
            this.tabs = state.tabs;
            this.tabsMenu = state.tabs.map(tab => { return {} as MenuItem; });
            // this.changeDetectorRef.detectChanges();
        });
        this.store.select(selectTabNum).subscribe((state) => {
            setTimeout(() => {
                this.selected = state;

            }, 10);

        });
    }

    closeTab($event: any): void{
        this.store.dispatch(closeTab({id: this.tabs[$event.index - 1].id}));
    }

    changeTab($event: number): void {
        this.store.dispatch(selectTab({index: $event}));
    }

    logout(): void {
        this.appStore.dispatch(logout());
    }

}
