import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tab, TabType } from '../../../models/tab';
import { newTab } from '../../../store/actions/tab.actions';
import { CoreState, selectTabState } from '../../../store/states/app.states';

@Component({
    selector: 'app-main-tab',
    templateUrl: './main-tab.component.html',
    styleUrls: ['./main-tab.component.scss']
})
export class MainTabComponent implements OnInit {
    tabs = TabType;

    constructor(private store: Store<CoreState>) {

    }

    ngOnInit(): void {

    }

    addTab(): void {

    }

    turnTo(name: string = 'Loading', daily: TabType, param2: {}): void {
        this.store.dispatch(newTab({tab: new Tab(name, daily)}));
    }
}
