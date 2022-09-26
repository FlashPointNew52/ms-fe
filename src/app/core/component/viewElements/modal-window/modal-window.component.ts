import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

    constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }

    ngOnInit(): void {
    }

    close(): void {
        this.ref.close();
    }

}
