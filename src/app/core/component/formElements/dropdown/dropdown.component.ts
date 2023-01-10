import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, forwardRef,
    Input,
    OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-dropdown',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
    @Input() options: Array<any> = [];
    @Input() value: any = '';
    @Input() filter: boolean = false;
    @Input() usePrefix: boolean = false;
    @Input() placeholder: string = '';
    @Input() scrollHeight: string = '315px';
    @Input() headerText: string | null = null;
    @Input() showClear: boolean = false;
    @Input() appendTo: any = null;
    @Input() group: boolean = false;
    @Input() optionValue: string = 'code';
    @Input() onlyDropdown: boolean = false;
    @Input() editable: boolean = false;

    public onChange = (val: any) => { };
    public onTouched = (val: any) => { };

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
    }

    change($event: any): void{
        this.onTouched(true);
        this.onChange($event.value);
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }

    writeValue(obj: any): void {
        this.value = obj;
        this.cd.detectChanges();
    }



}
