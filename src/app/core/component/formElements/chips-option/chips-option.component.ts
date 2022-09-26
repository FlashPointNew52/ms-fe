import {
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter, forwardRef,
    HostBinding,
    Input, OnChanges, OnInit,
    Output, QueryList,
    SimpleChanges,
    ViewChild, ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Confirmation } from '../../../../models/entity/contact';
import { Dropdown } from 'primeng/dropdown';

export interface DropdownInterface {
    label: string;
    value: string;
    icon?: string;
    text?: string;
    typeLink?: string;
}

@Component({
    selector: 'app-chips-option',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ChipsOptionComponent),
        multi: true
    }],
    templateUrl: './chips-option.component.html',
    styleUrls: ['./chips-option.component.scss'],
})
export class ChipsOptionComponent implements OnChanges, ControlValueAccessor  {
    @Input() value: Array<Confirmation | string> = [];
    @Input() items: DropdownInterface[] | null = null;
    @Input() disabled: boolean = false;
    @Input() placeholder: string = '';
    @Input() mask: string = '';
    @Input() ariaLabelledBy: string = '';
    @Input() allowDuplicate: boolean = true;
    @Input() typeLink: string | null = null;
    @Input() targetLink: string = '';
    @Input() addOnTab: boolean = true;
    @Input() addOnBlur: boolean = true;
    @Input() separator: string = '';
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
    @Output() Add: EventEmitter<any> = new EventEmitter();
    @Output() Remove: EventEmitter<any> = new EventEmitter();
    @Output() Focus: EventEmitter<any> = new EventEmitter();
    @Output() Blur: EventEmitter<any> = new EventEmitter();
    @Output() ChipClick: EventEmitter<any> = new EventEmitter();
    @ViewChild('inputtext') inputViewChild: ElementRef = new ElementRef<any>('');
    @ViewChildren(Dropdown) dropdowns!: QueryList<Dropdown>;

    @HostBinding('class.p-inputwrapper-focus') focus: boolean = false;
    @HostBinding('class.p-inputwrapper-filled') filled: boolean = false;

    public onChange = (val: Array<Confirmation | string>) => { };
    public onTouched = (val: any) => { };


    text: string = '';

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateFilledState();
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }

    writeValue(obj: any): void {
        this.value = obj;
        this.updateFilledState();
        this.cd.markForCheck();
    }

    onClick(): void {
        this.inputViewChild.nativeElement.focus();
    }

    onInput(): void{
        this.updateFilledState();
    }

    onPaste(event: any): void {
        if (!this.disabled) {
            if (this.separator) {
                const pastedData = (event.clipboardData /*|| window.clipboardData*/).getData('Text');
                pastedData.split(this.separator).forEach( (val: string) => {
                    this.addItem(event, val, true);
                });
                this.inputViewChild.nativeElement.value = '';
            }
            this.updateFilledState();
        }
    }

    updateFilledState(): void {
        if (this.value.length === 0 && (!this.text || this.text.length === 0)) {
            this.filled = (this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value !== '');
        }
        else {
            this.filled = true;
        }
    }

    onItemClick(event: Event, item: any): void {
        // this.ChipClick.emit({
        //     originalEvent: event,
        //     value: item
        // });
    }

    onInputFocus(event: FocusEvent): void {
        this.focus = true;
        this.Focus.emit(event);
    }

    onInputBlur(event: FocusEvent): void {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value, false);
        }
        this.Blur.emit(event);
    }

    removeItem(event: Event, index: number): void {
        if (this.disabled) {
            return;
        }

        const removedItem = this.value[index];
        this.value = this.value.filter((val: any, i: number) => i !== index);
        this.Remove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.onTouched(true);
        this.onChange(this.value);
        this.updateFilledState();
        this.updateMaxedOut();
    }

    addItem(event: Event, item: string, preventDefault: boolean): void {
        this.value = this.value ||  [];
        if (item && item.trim().length) {
            this.value = [...this.value, this.items != null ? {
                data: item,
                type: this.items.length > 0 ? this.items[0].value : '',
                confirmed: false
            } : item];
            this.onTouched(true);
            this.onChange(this.value);
        }
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';
        this.text = '';
        if (preventDefault) {
            event.preventDefault();
        }
    }

    editItem(type: string, index: number): void {
        this.value = this.value ||  [];
        const editedElement = {...(this.value[index] as Confirmation), type};
        this.value = [...this.value.slice(0, index), editedElement, ...this.value.slice(index + 1)];
        this.onTouched(true);
        this.onChange(this.value);
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';
    }

    onKeydown(event: any): void {
        switch (event.which) {
            // backspace
            // case 8:
            //     if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
            //         this.value = [...this.value];
            //         const removedItem = this.value.pop();
            //         this.Remove.emit({
            //             originalEvent: event,
            //             value: removedItem
            //         });
            //         this.updateFilledState();
            //     }
            //     break;

            // enter
            case 13:
                this.addItem(event, this.text, true);
                break;

            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.text, true);
                }
                break;

            default:
                if (this.separator) {
                    if (this.separator === ',' && event.which === 188) {
                        this.addItem(event, this.text, true);
                    }
                }
                break;
        }
    }

    updateMaxedOut(): void {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    }

    setLabel(index: number, $event: any): any {
        (this.value[index] as Confirmation).type = $event;
    }

    getPrefix(item: Confirmation|any, field: keyof DropdownInterface): any {
        return this.items!.filter(it => it.value === item.type)[0][field];
    }

    logValue(event: any): void {
        console.log(event);
    }

    getValue(item: Confirmation | string | null): string {
        if ((item as Confirmation).data){
            return (item as Confirmation).data;
        } else {
            return (item as string);
        }
    }

    getModel(item: any): any {
        return (item as Confirmation).type;
    }

    showDropdown(i: any, event: MouseEvent): void {
        Object.defineProperty(event, 'target', {writable: false, value: this.dropdowns.get(i)!.el.nativeElement});
        this.dropdowns.get(i)!.onMouseclick(event);
    }
}
