import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnInit, Output,
} from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SuggestionService } from '../../../../service/suggestion.service';
import { AddressBlock } from '../../../models/address-block';

export interface AddressDescr {
    id?: string;
    name?: string;
    typeShort?: string;
}

export interface AddressStructure {
    region: AddressDescr;
    city: AddressDescr;
    admArea: string;
    area: string;
    street: AddressDescr;
    building: AddressDescr;
    apartment: string;
    stations: string[];
    time?: number;
}

export const initStructure: AddressStructure = {
    region: {},
    city: {},
    admArea: '',
    area: '',
    street: {},
    building: {},
    apartment: '',
    stations: [],
    time: undefined
};

@Component({
    selector: 'app-address-input',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './address-input.component.html',
    styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {
    addressForm?: FormGroup;

    @Input() addressType: 'apartment' | 'office' = 'apartment';
    @Output() locationChanges: EventEmitter<any> = new EventEmitter<any>();
    addressStructure: AddressStructure = {...initStructure};

    displayFunc = (data: any) => {
        if (data.name && data.typeShort) {
            return data.name + ' ' + data.typeShort;
        }
        return '';
    }
    displayFunc1 = (data: any) => {
        if (data.name && data.typeShort) {
            return data.typeShort + '. ' + data.name;
        }
        return '';
    }

    displayFunc2 = (data: any) => {
        let text;
        if (data.typeShort || data.name) {
            text = (data.typeShort || '') + '. ' + (data.name || '');
        }
        if (data.parents && data.parents.length > 0) {
            text += ', ' + data.parents[0].name + ' ' + data.parents[0].typeShort;
        }
        return text;
    }

    constructor(private suggestionService: SuggestionService,
                private cd: ChangeDetectorRef,
                private _parentContainer: ControlContainer,
                private fb: FormBuilder) {

    }

    ngOnInit(): void {
        if(!this.addressForm){
            this.addressForm = this.createGroup(new AddressBlock());
            (this._parentContainer.control as FormGroup).addControl('addressBlock', this.addressForm);
        }

    }

    public createGroup(address: AddressBlock): FormGroup{
        this.addressForm = new FormGroup(
            Object.keys(address).reduce(
                (acc: any, key) => {
                    acc[key] = new FormControl();
                    acc[key].setValue(address[key as keyof AddressBlock]);
                    this.updateStruct(key as keyof AddressBlock, address[key as keyof AddressBlock]);
                    return acc;
                }, {state: new FormControl()}
            )
        );

        this.cd.markForCheck();
        return this.addressForm;
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     if (this.value && changes.value && changes.value.currentValue !== changes.value.previousValue ) {
    //         this.updateFields(changes.value.currentValue);
    //     }
    // }

    updateStruct(key: keyof AddressBlock, value: any): void{
        let delIndex;
        switch (key) {
            case 'building':
            case 'street':
            case 'city':
                delIndex = value.indexOf('.');
                this.addressStructure[key] = {
                    id: this.addressStructure[key].id || '0',
                    typeShort: value.slice(0, delIndex),
                    name: value.slice(delIndex + 2)
                };
                break;
            case 'region':
                delIndex = value.indexOf(' ');
                this.addressStructure[key] = {
                    id: this.addressStructure[key].id || '1',
                    name: value.slice(0, delIndex),
                    typeShort: value.slice(delIndex + 1)
                };
                break;
            default:
                // this.addressStructure[key] = value;
                break;
        }
        // Object.keys(value).forEach( key => {
        //     const data = this.value[key as keyof AddressBlock] as string;
        //     if (data && value[key] &&
        //         (value[key].length > 0 || key === 'time')
        //     ) {
        //         let delIndex;
        //         switch (key) {
        //             case 'building':
        //             case 'street':
        //             case 'city':
        //                 delIndex = data.indexOf('.');
        //                 this.addressStructure[key] = {
        //                     id: this.addressStructure[key].id || '1',
        //                     typeShort: data.slice(0, delIndex),
        //                     name: data.slice(delIndex + 2)
        //                 };
        //                 break;
        //             case 'region':
        //                 delIndex = this.value[key].indexOf(' ');
        //                 this.addressStructure[key] = {
        //                     id: this.addressStructure[key].id || '1',
        //                     name: this.value[key].slice(0, delIndex),
        //                     typeShort: this.value[key].slice(delIndex + 1)
        //                 };
        //                 break;
        //             default:
        //                 // @ts-ignore
        //                 this.addressStructure[key] = data;
        //                 break;
        //         }
        //     }
        // });
    }

    private clearAddress(key: any): void {
        switch (key) {
            case 'region':
                this.addressStructure = { ...initStructure};
                this.addressForm?.controls.region.setValue('');
                this.addressForm?.controls.city.setValue('');
                this.addressForm?.controls.street.setValue('');
                this.addressForm?.controls.building.setValue('');
                this.addressForm?.controls.admArea.setValue('');
                this.addressForm?.controls.area.setValue('');
                this.addressForm?.controls.apartment.setValue('');
                this.addressForm?.controls.stations.setValue([]);
                this.addressForm?.controls.time.setValue(undefined);
                break;
            case 'city':
                this.addressStructure = { ...initStructure,
                    region: this.addressStructure.region
                };
                this.addressForm?.controls.city.setValue('');
                this.addressForm?.controls.street.setValue('');
                this.addressForm?.controls.building.setValue('');
                this.addressForm?.controls.admArea.setValue('');
                this.addressForm?.controls.area.setValue('');
                this.addressForm?.controls.apartment.setValue('');
                this.addressForm?.controls.stations.setValue([]);
                this.addressForm?.controls.time.setValue(undefined);
                break;
            case 'street':
                this.addressStructure = { ...initStructure,
                    region: this.addressStructure.region,
                    city: this.addressStructure.city
                };

                this.addressForm?.controls.street.setValue('');
                this.addressForm?.controls.building.setValue('');
                this.addressForm?.controls.admArea.setValue('');
                this.addressForm?.controls.area.setValue('');
                this.addressForm?.controls.apartment.setValue('');
                this.addressForm?.controls.stations.setValue([]);
                this.addressForm?.controls.time.setValue(undefined);
                break;
            case 'building':
                this.addressStructure = this.addressStructure = { ...initStructure,
                    region: this.addressStructure.region,
                    city: this.addressStructure.city,
                    street: this.addressStructure.street
                };
                this.addressForm?.controls.building.setValue('');
                this.addressForm?.controls.admArea.setValue('');
                this.addressForm?.controls.area.setValue('');
                this.addressForm?.controls.apartment.setValue('');
                this.addressForm?.controls.stations.setValue([]);
                this.addressForm?.controls.time.setValue(undefined);
                break;
        }

        // this.onTouched(true);
        // this.onChange(this.value);
    }

    setData(key: keyof AddressStructure, event: any): void{
        if (!event){
            this.clearAddress(key);
            return;
        }

        switch (key) {
            case 'region':
                this.addressStructure[key] !== event ? this.clearAddress('city') : null;
                // this.value[key] = event.name  + ' ' + event.typeShort;
                break;
            case 'city':
                this.addressStructure[key] !== event ? this.clearAddress('street') : null;
                // this.value[key] = event.typeShort  + '. ' + event.name;
                if (event.parents && event.parents.length > 0){
                    this.addressStructure.region = event.parents[0];
                    this.addressForm?.controls.region.setValue(event.parents[0].name  + ' ' + event.parents[0].typeShort);
                } else{
                    this.addressStructure.region = {};
                    // this.value.region = '';
                }
                break;
            case 'street':
                this.addressStructure[key] !== event ? this.clearAddress('building') : null;
                // this.value[key] = event.typeShort  + '. ' + event.name;
                break;
            case 'building':
                this.addressForm?.controls[key].setValue(event.typeShort  + '. ' + event.name);
                break;
            case 'stations':
                // this.value = {... this.value, stations: event};
                // this.value[key]?.forEach((val, i, array) => {
                //     if ((event as Confirmation[]).filter(val1 => val1.data === val.data && val1.type === val.type).length === 0){
                //
                //     }
                // });
                break;
            case 'time':
                this.addressForm?.controls[key].setValue(event.value);
                break;
        }
        // @ts-ignore
        this.addressStructure[key] = event;
        if (key === 'building'){
            this.suggestionService.latLonWithArea(this.addressForm?.value).subscribe(data => {
                this.addressForm?.controls.admArea.setValue(data.admArea);
                this.addressForm?.controls.area.setValue(data.area);
                this.addressStructure.admArea = data.admArea as string;
                this.addressStructure.area = data.area  as string;
                this.locationChanges.emit((data as any).location)
            });
        }
    }

    getServiceMethod(): any {
        return this.suggestionService.kladrList;
    }

    getService(): any {
        return this.suggestionService;
    }
}
