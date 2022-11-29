import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    forwardRef,
    Input,
    OnInit, Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-simple-input',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SimpleInputComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './simple-input.component.html',
    styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;

    @Input() value: string = '';
    @Output() remove: EventEmitter<any> = new EventEmitter<any>();
    public onChange = (val: any) => { };
    public onTouched = (val: any) => { };

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit(): void {

    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        this.value = obj;
        this.cd.markForCheck();
    }

    onInput(value: any): void {
        this.value = typeof value === 'object' ? value.value : value;
        this.onTouched(true);
        this.onChange(this.value);
        if(value == ''){
            this.remove.emit(true);
        }
    }
}
