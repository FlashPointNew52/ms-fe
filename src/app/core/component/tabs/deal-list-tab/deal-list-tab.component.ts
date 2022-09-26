import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Deal } from '../../../models/entity/deal';
import { CompanyService } from '../../../services/company.service';
import { CoreState } from '../../../store/states/app.states';
import { TabListComponent } from '../tab-list.component';

import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-deal-list-tab',
    templateUrl: './deal-list-tab.component.html',
    styleUrls: ['../tab.component.scss',
        '../tab-list.component.scss',
        './deal-list-tab.component.scss']
})
export class DealListTabComponent extends TabListComponent implements OnInit {

    constructor(protected store: Store<CoreState>,
                public entityService: CompanyService,
                private changeDetectorRef: ChangeDetectorRef) {
        super(store);

    }

    ngOnInit(): void {
    }

    createDeal(): void {
        this.openTab('Новая сделка', 'DEAL', {entity: new Deal()});
    }

}
