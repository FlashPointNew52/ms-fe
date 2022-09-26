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
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SearchPanelComponent),
        multi: true
    }],
})
export class SearchPanelComponent implements OnInit, ControlValueAccessor {
    @Input() serviceData: any;
    @Input() minLength = 3;
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() sort: any;
    @Input() field: any;
    @Output() rawData: EventEmitter<any> = new EventEmitter<any>();
    public value: any;

    public onChange = (val: any) => { };
    public onTouched = (val: any) => { };

    public editable: boolean = true;

    timer: any;
    list = [];

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        // this.editable = !this.value;
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }

    writeValue(obj: any): void {
        this.value = obj;
        this.editable = !this.value;
        this.cd.markForCheck();
    }

    getList($event: any): void{
        // $event.stopPropagation();
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            if (this.value.trim().length === 0) {
                return;
            }
            const categoryId =
                this.serviceData.serviceMethod.call(this.serviceData.binder, this.value, ...this.serviceData.params)
                    .subscribe((data: any) => {
                        if(this.sort){
                            data  = data.sort(this.sort);
                        }
                        this.list = data;
                        this.cd.markForCheck();
                    // this.changeDetector.detectChanges();
                });
        }, 150);
    }

    getValue(): any {
        // if(this.selectedFunc && (typeof this.value == "object" && Object.keys(this.value).length > 0 || typeof this.value != "object"))
        //     return this.selectedFunc.call(this.value, this.value);
        // else return "";
    }

    clearValue(event: MouseEvent): void {
        event.stopPropagation();
        this.list = [];
        this.onTouched(true);
        this.onChange(this.value);
    }

    setValue($event: any): void{
        this.value = $event;
        this.editable = this.value === '';
        this.onTouched(true);
        this.onChange(this.value);
    }

    getInner(item: any) {
        return this.serviceData?.displayField ? this.serviceData.displayField.call(this, item) : item;
    }
}
