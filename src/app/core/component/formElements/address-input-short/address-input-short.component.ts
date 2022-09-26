import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, forwardRef,
    Input,
    OnInit, Output,
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SuggestionService } from '../../../../service/suggestion.service';
import { Address } from '../../../models/address';

@Component({
    selector: 'app-address-input-short',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './address-input-short.component.html',
    styleUrls: ['./address-input-short.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AddressInputShortComponent),
        multi: true
    }],
})
export class AddressInputShortComponent implements OnInit, ControlValueAccessor {
    address: Address = new Address();
    isFind: boolean = false;
    public value: any = '';
    @Input() label: string = 'Адрес'
    @Input() addressType: 'apartment' | 'office' | 'withoutOffice' = 'apartment';
    @Output() locationChanges: EventEmitter<any> = new EventEmitter<any>();
    @Output() additionalDataChanges: EventEmitter<any> = new EventEmitter<any>();
    @Output() remove: EventEmitter<any> = new EventEmitter<any>();

    public onChange = (val: any) => { };
    public onTouched = (val: any) => { };

    displayFunc = function(data: any) {
        // @ts-ignore
        return this.value ? data.fullname.replace(
            // @ts-ignore
            new RegExp(this.value.replaceAll(" ", "|"), "gi"), (match: string) => `<mark>${match}</mark>`)
            // @ts-ignore
            : this.value;
    };

    constructor(public suggestionService: SuggestionService,
                private cd: ChangeDetectorRef,
                private _parentContainer: ControlContainer) {

    }

    ngOnInit(): void {

    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }

    writeValue(obj: any): void {
        this.value = obj;
        this.cd.detectChanges();
    }

    setData(event: any): void{
        if (!event){
            this.remove.emit();
            this.isFind = false;
            this.address.oneLine = '';
            this.additionalDataChanges.emit({
                districts: [],
                apartment: null,
                entrance: null,
                floor: null,
            });
            this.locationChanges.emit({});
            return;
        }
        this.onTouched(true);
        this.onChange(event.fullname);
        this.address.oneLine = event.name;
        this.isFind = true;
        this.suggestionService.geoInfo(event.coordinates).subscribe(data => {
            this.additionalDataChanges.emit({
                districts: data,
                apartment: event?.extra?.apartment || null,
                entrance: event.extra?.entrance || null,
                floor: event.extra?.floor || null,
            });
            this.locationChanges.emit({lon: event.coordinates[1], lat: event.coordinates[0]});
        })

    }

    getServiceMethod(): any {
        return this.suggestionService.addressList;
    }

    getService(): any {
        return this.suggestionService;
    }
}
