import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input, OnChanges,
    OnInit,
    SimpleChanges, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';

export interface IParams {
    label: string;
    code: string;
    searchService?: any;
    filter?: any;
    addFunction?: any;
}

@Component({
    selector: 'app-multiselect',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MultiselectComponent),
        multi: true
    }]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {
    @Input() params: any[] = [];
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() onlyDropdown: boolean = false;
    @Input() appendTo: any = null;
    @Input() showToggleAll: boolean = false;
    @Input() group: boolean = true;
    @Input() filter: boolean = true;
    @Input() headerText: string | null = null;
    @Input() withAdd: boolean = false;
    @Input() showHeader: boolean = true;
    @ViewChild(MultiSelect) multiSelect?: MultiSelect;
    parent: any;
    showData: any[] = [];

    public value: string[] = [];
    public onModelChange = (data: any) => {};
    public onModelTouched = () => {
    };

    constructor(elementRef: ElementRef, private cd: ChangeDetectorRef) {
        setTimeout(() => {
            this.parent = elementRef.nativeElement;
        }, 1000);
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    writeValue(obj: any): void {
        this.value = obj;
        this.cd.markForCheck();
    }


    ngOnInit(): void {

    }

    onChange(event: any){
        this.onModelChange(event.value);
        this.cd.detectChanges();
        this.multiSelect!.alignOverlay();
    }

    add(group: any): void {
        if (this.withAdd) {
            group.addFunction();
        }
    }

    getLabel(tag: any, func: any) {

    }

    log($event: any) {
        
    }
}
