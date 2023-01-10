import {Component, Input, OnInit} from '@angular/core';
import {FieldConfig} from "../../../services/field-customizer.service";

@Component({
    selector: 'app-dropdown-form',
    templateUrl: './dropdown-form.component.html',
    styleUrls: ['./dropdown-form.component.scss']
})
export class DropdownFormComponent implements OnInit {
    @Input() options: FieldConfig[] = [];
    @Input() label: string = "Установка значения";

    constructor() { }

    ngOnInit(): void {
    }
}
