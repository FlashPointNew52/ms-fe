import { Component, Input, OnInit } from '@angular/core';
import { Confirmation } from '../../../../models/entity/contact';
import { DropdownInterface } from '../../formElements/chips-option/chips-option.component';

@Component({
    selector: 'app-chips-view',
    templateUrl: './chips-view.component.html',
    styleUrls: ['./chips-view.component.scss']
})
export class ChipsViewComponent implements OnInit {
    @Input() value: Array<any> = [];
    @Input() items: any = {};
    @Input() mask: string = '';
    @Input() typeLink: string | null = null;
    @Input() targetLink: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    getValue(item: Confirmation | string): string {
        if ((item as Confirmation).data){
            return (item as Confirmation).data;
        } else {
            return (item as string);
        }
    }
}
