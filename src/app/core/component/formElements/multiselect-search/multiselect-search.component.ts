import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';

export interface IParams {
    label: string;
    type: string;
    searchService?: any;
    filter?: any;
}

@Component({
    selector: 'app-multiselect',
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
    @Input() params: IParams[] = [];
    @Input() label: string = '';
    @Input() selectedData: any[] = [];
    @Input() placeholder: string = '';
    @Input() onlyDropdown: boolean = false;
    @Input() appendTo: any = null;
    @Input() showToggleAll: boolean = true;
    @Input() showCloseButton: boolean = true;

    parent: any;
    filterValue: string = '';
    showData: SelectItemGroup[] = [];
    @Output() selectedDataChange: EventEmitter<any> = new EventEmitter<any>();
    constructor(elementRef: ElementRef) {
        setTimeout(() => {
            this.parent = elementRef.nativeElement;
        }, 1000);

    }

    ngOnInit(): void {
        this.params.forEach(param => {
            this.showData.push({
                label: param.label,
                value: param.type,
                items: []
            });
        });
    }

    emit($event: any): void {
        $event;
    }
}
