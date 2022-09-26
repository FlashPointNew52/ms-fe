import { Component, OnInit } from '@angular/core';
import { Deal } from '../../../models/entity/deal';
import { CoreState } from '../../../store/states/app.states';
import { TabComponent } from '../tab.component';
import { Store } from '@ngrx/store';
import { PersonService } from '../../../services/person.service';

@Component({
    selector: 'app-deal-tab',
    templateUrl: './deal-tab.component.html',
    styleUrls: [
        '../tab.component.scss',
        './deal-tab.component.scss']
})
export class DealTabComponent extends TabComponent implements OnInit {
    entity: Deal = new Deal();

    constructor(protected store: Store<CoreState>,
                public personService: PersonService) {
        super(store);
    }

    ngOnInit(): void {
    }

    save(entity: any): void {
        this.tab = {...this.tab, args: {...this.tab.args, entity}};
        this.updateTab();
    }

    delete(): void {
        this.closeTab();
    }

}
