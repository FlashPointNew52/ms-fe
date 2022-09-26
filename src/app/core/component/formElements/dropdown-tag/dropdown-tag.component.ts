import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TagInterface, Tags } from '../../../models/tags';

@Component({
    selector: 'app-dropdown-tag',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownTagComponent),
        multi: true
    }],
    templateUrl: './dropdown-tag.component.html',
    styleUrls: ['./dropdown-tag.component.scss']
})
export class DropdownTagComponent implements OnInit, ControlValueAccessor {
    public value: any[] = [];
    @Input() label: string = 'Выберите теги ...';
    @Input() onlyDropdown = false;
    @Input() appendTo: any = null;
    tags: TagInterface[] = Tags.tagArray;

    public onChange = (val: any[]) => { };
    public onTouched = (val: any) => { };

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }

    writeValue(obj: any): void {
        this.value = obj;
        this.cd.markForCheck();
    }

    change($event: any): void{
        this.onTouched(true);
        this.onChange($event.value);
    }
}
