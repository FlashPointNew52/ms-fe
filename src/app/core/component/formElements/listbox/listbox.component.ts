import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-listbox',
    templateUrl: './listbox.component.html',
    styleUrls: ['./listbox.component.scss']
})
export class ListboxComponent implements OnInit {
    @Input() options: any[] = [];
    @Input() value: any[] = [];

    @Output() valueChange = new EventEmitter<any[]>();

    constructor() { }

    ngOnInit(): void {

    }
}
