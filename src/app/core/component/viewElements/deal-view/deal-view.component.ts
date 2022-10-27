import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { pairwise, startWith } from 'rxjs/operators';
import { ModalWindowComponent } from '../../../../modal-window/modal-window.component';
import { AddressBlock } from '../../../models/address-block';
import { Company } from '../../../models/entity/company';
import { Deal } from '../../../models/entity/deal';
import { Person } from '../../../models/entity/person';
import { Utils } from '../../../models/utils';
import { AddressPipe } from '../../../pipes/address.pipe';
import { MapService } from '../../../services/map.service';
import { AddressInputComponent } from '../../formElements/address-input/address-input.component';
import { GeoData, YaMapViewComponent } from '../ya-map-view/ya-map-view.component';

@Component({
    selector: 'app-deal-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './deal-view.component.html',
    styleUrls: [
        '../entity-view/entity-view.component.scss',
        './deal-view.component.scss'
    ],
    providers: [DialogService, MapService, AddressPipe]
})

export class DealViewComponent implements OnInit {
    _entity: Deal = new Deal();

    get entity(): Deal {
        return this._entity;
    }
    @Input() set entity(value: Deal) {
        this._entity = value;
        this.calcForm();
    }

    @Input() type: 'person' | 'company' = 'person';
    @Input() fullSaveBar: boolean = true;
    @Input() tieredClass: string = '';
    // @ts-ignore
    @Input() service: any;
    @Output() entityChanges: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleteChanges: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(AddressInputComponent) addressForm: AddressInputComponent | undefined;
    // @ViewChild(AddressInputComponent) set content(content: AddressInputComponent) {
    //     if (content) { // initially setter gets called with undefined
    //         this.addressForm = content;
    //         if(!(this.form.get('type')?.value === 'PURCHASE' || this.form.get('type')?.value === 'RENT')){
    //             // this.changeDetectorRef.detectChanges();
    //             this.form.addControl('addressBlock', (this.addressForm as AddressInputComponent).createGroup(this._entity.addressBlock));
    //         }
    //     }
    // }
    @ViewChild(YaMapViewComponent) mapComponent: YaMapViewComponent | undefined;
    // @ViewChildren(InputTextarea) textarea: InputTextarea | undefined;

    fullscreen = false;
    mapChips: any[] = [];
    dealClass = Deal;
    utils = Utils;
    districts: string[] = [];
    form: FormGroup = new FormGroup({});
    contextMenu: MenuItem[] = [
        { label: 'Отписаться'},
        { label: 'Проверить'},
        { label: 'Объединить'},
        { label: 'Изменить статус',
            items: [
                {label: 'Пользователь'},
                {label: 'Лид'},
                {label: 'Соискатель'}
            ]
        },
        { label: 'Подписаться', items: [
                {label: '<span>Изменение данных</span>' + '<i class="pi pi-check"></i>', escape: false},
                {label: '<span>Аналитика событий</span>' + '<i class="pi pi-check"></i>', escape: false},
                {label: '<span>Рекламная активность</span>' + '<i class="pi pi-check"></i>', escape: false}
            ]},
        { label: 'Добавить в группу'},
        { label: 'Поиск в интернете',
            items: [
                {label: 'Google'},
                {label: 'Yandex'}
            ]
        },
        { label: 'Поиск в соцсетях'},
        { label: 'Поиск в мессенджерах'},
        { label: 'История изменений'},
        { label: 'Удалить', command: () => this.delete()}
    ];
    formSubs: any;
    showSavePanel: boolean = false;
    ref: DynamicDialogRef = new DynamicDialogRef();
    eventsComments: any = {};

    houseTypes: any[] = [];
    stageArray: any[] = [];

    mapArray = {
        zones: [],
        addresses: [],
        infrastructure: [],
        stops: [],

        clear(){
            this.zones = [];
            this.addresses = [];
            this.infrastructure = [];
            this.stops = [];
        }
    }

    infrastructureDisplay = [
        {label: 'Транспортная доступность', array: this.mapArray.stops},
        {label: 'Доступность инфраструктуры', array: this.mapArray.infrastructure}
    ];

    tempArray: any[] = [];

    getFieldActivity(): string {
        return Company.fieldActivityOptions[this.form.get('fieldActivity')?.value as keyof typeof Company.fieldActivityOptions]?.label;
    }

    constructor(private dialogService: DialogService,
                public mapService: MapService,
                private changeDetectorRef: ChangeDetectorRef,
                private addressPipe: AddressPipe) { }

    ngOnInit(): void {
        this.setHouseTypes();
        this.setStageGroupArray();
    }

    ngAfterViewChecked(): void {

    }


    checkField(previous: any, next: any): void{
        this.changeFields(previous, next);

        let editingField = Object.keys(this._entity).filter(
            (key) =>
                (this.form.controls[key as keyof Deal]?.value !== this._entity[key as keyof Deal] && key !== 'sources'));
        if (editingField.indexOf('addressBlock') > -1 ){
            editingField.splice( editingField.indexOf('addressBlock'), 1);

            editingField = editingField.concat(Object.keys(this._entity.addressBlock).filter((key) =>
                (this.form.get('addressBlock')?.get(key)?.value !== this._entity.addressBlock[key as keyof AddressBlock])));
        }
        // // Выбираем массивные данные для проверки. Выбираем только те у которых кол-во полей совпадает.
        //
        // editingField.filter(key => (key === 'phones' || key === 'emails' || key === 'sites' || key === 'messengers' || key === 'socials')
        //     && this.form.get(key)?.value?.length === this._entity[key].length
        // ).forEach(field => {
        //     let changed = false;
        //     for (const [index, val] of this.form.get(field)?.value.entries()){
        //         if (val !== this._entity[field as keyof Deal][index]){
        //             changed = true;
        //         }
        //     }
        //     if (!changed){
        //         editingField.splice(editingField.indexOf(field), 1);
        //     }
        // });
        //
        editingField.filter(key => key === 'stations' &&
            this.form.get('addressBlock')?.get(key)?.value?.length === (this._entity.addressBlock[key as keyof AddressBlock] as []).length
        ).forEach(field => {
            let changed = false;
            for (const [index, val] of this.form.get('addressBlock')?.get(field)?.value.entries()){
                if (val !== (this._entity.addressBlock.stations as [])[index]){
                    changed = true;
                }
            }
            if (!changed){
                editingField.splice(editingField.indexOf(field), 1);
            }
        });
        //
        // editingField.filter(key => key === 'tag' && this.form.get('tag')?.value?.length === this._entity.tag.length
        // ).forEach((field) => {
        //     if (this.form.get('tag')?.value.filter((val: any) => this._entity.tag.indexOf(val) > -1).length
        //         === this._entity.tag.length){
        //         editingField.splice(editingField.indexOf('tag'), 1);
        //     }
        // });

        // if (editingField.length === 1 && editingField[0] === 'addressBlock'){
        //
        // }

        // this.showSavePanel = editingField.length > 0;
    }

    changeFields(previous: Deal, next: Deal){
        if(next.stage != previous.stage &&
            !(next.stage == 'DEAL_POTENTIAL' && previous.stage == 'CLIENT_POTENTIAL'
                || next.stage == 'CLIENT_POTENTIAL' && previous.stage == 'DEAL_POTENTIAL'
            )){
            this.addComment('stage', null);
        }
        if(next.type != previous.type){
            // if((previous.type == 'PURCHASE' || previous.type == 'RENT') && (next.type == 'SALE' || next.type == 'LEASE')
            //     || (previous.type == 'SALE' || previous.type == 'LEASE') && (next.type == 'PURCHASE' || next.type == 'RENT')
            // ){
                // this.mapChips = [];

                // this.mapComponent!.clearMap();
                this.setStageGroupArray();
            this.recalcInfrastructureDisplay();
                this.changeDetectorRef.detectChanges();
                this.form.controls['stage'].setValue(this.stageArray[0].items[0].code);

            // }
        }
        if(next.objectType != previous.objectType || next.propertyType != previous.propertyType){
            this.setHouseTypes();
            this.form.controls['houseTypes'].setValue(this.form.controls['propertyType']?.value !== 'LAND' ? [this.houseTypes[0]?.code] : []);
        }

    }

    show(title: string, args?: any): void {
        this.ref = this.dialogService.open(ModalWindowComponent, {
            header: title,
            data: args,
            baseZIndex: 10000
        });
    }

    save(): void {
        if (this.service){
            this.service.save(this.form.value).subscribe((entity: any) => {
                this._entity = entity.person || entity.organisation;
                this.recover();
                this.entityChanges.emit(this._entity);
            });
        }
    }

    delete(): void {
        this.service.delete(this._entity.id as string).subscribe(()  => {
            this.deleteChanges.emit(this._entity.id);
        });
    }

    recover(): void {
        Object.keys(this._entity).forEach(key => {
            if (key === 'addressBlock'){
                this.form.setControl(key, (this.addressForm as AddressInputComponent).createGroup(this._entity.addressBlock));
            } else {
                if (!this.form.controls[key]){
                    this.form.addControl(key, new FormControl());
                }
                this.form.controls[key].setValue(this._entity[key as keyof Deal]);
            }
        });
        this.showSavePanel = false;
    }

    public calcForm(): void {
        this.form = new FormGroup(
            Object.keys(this._entity).reduce((acc: any, key) => {
                switch (key) {
                    case 'addressBlock':
                        if(this._entity.type !== 'PURCHASE' && this._entity.type !== 'RENT')
                            acc[key] = (this.addressForm as AddressInputComponent).createGroup(this._entity.addressBlock);
                        break;
                    default:
                        acc[key] = new FormControl();
                        acc[key].setValue(this._entity[key as keyof Deal]);
                }
                return acc;

            }, {state: new FormControl()})
        )
        this.form.addControl('closeDate', new FormControl());
        this.form.addControl('readyDate', new FormControl());
        this.formSubs = this.form.valueChanges.pipe(startWith(this._entity), pairwise()).subscribe(([prev, next]: [any, any]) => {
            this.checkField(prev, next);
        });

        // setTimeout(() => {
        //     if (this.textarea){
        //         (this.textarea as any).first.updateState();
        //     }}, 20
        // );
    }

    addComment(field: string, value: any): void {
        if (this._entity[field as keyof Deal] !== value){
            this.show('Комментарий к событию', { field} );
            this.eventsComments[field] = value;
        } else{
            delete this.eventsComments[field];
        }
    }

    getProperty(property: string, pr: keyof typeof Deal): any {
        const ret = Deal[pr];
        const ret2 = ret[property as keyof typeof ret];
        return ret2;
    }

    showOnMap($event: any) {
        this.fullscreen = true;
        // this.mapComponent?.showOnMap($event);
        // setTimeout(() => {
        //     this.mapComponent?.selectChips($event);
        // }, 50);
        this.changeDetectorRef.detectChanges();
    }

    setStageGroupArray() {
        if(this.form.controls['type']?.value)
            this.stageArray = Deal.typeOptions[this.form.controls['type'].value as keyof typeof Deal.typeOptions].stages;
    }

    getStageArray(): any {
        if(this.form.controls['type']?.value && this.form.controls['stage']?.value)
            return Deal.typeOptions[this.form.controls['type'].value as keyof typeof Deal.typeOptions].stages
                .filter( stage => stage.value == 'ATTRACTED' || stage.value == 'IN_PROGRESS')
                .reduce( (arr: any[], stage) => arr.concat(stage.items), [])
        else
            return [];
    }

    getState() {
        return Deal.qualificationOptions[this.form.get('qualification')?.value as keyof typeof Deal.qualificationOptions];
    }

    setHouseTypes() {
        let houses = Deal.propertyTypeOptions[this.form.get('propertyType')?.value as keyof typeof Deal.propertyTypeOptions];
        this.houseTypes = (houses.objectTypes.filter(val => val.code == this.form.get('objectType')?.value)[0] as any)?.houseTypes
            || houses.houseTypes;
        // if(this.form.get('propertyType')?.value == 'LIVING'){
        //     this.houseTypes = Deal.objectTypeOptions[this.form.get('objectType')?.value as keyof typeof Deal.objectTypeOptions]?.houseTypes ||
        //         ?.houseTypes;
        // } else
        //     this.houseTypes = Deal.propertyTypeOptions[this.form.get('propertyType')?.value as keyof typeof Deal.propertyTypeOptions].houseTypes;
    }

    getPropertyStatusData() {
        let data = {
            propertyStatusLabel: 'Статус объекта сделки',
            propertyStatusPlaceholder: 'Выберите статус объекта сделки ...',
            propertyStatusData: Deal.propertyTypeOptions[this.form.get('propertyType')!.value as keyof typeof Deal.propertyTypeOptions]?.propertyStatuses,
            houseTypesLabel: 'Тип дома',
            houseTypesPlaceholder: 'Выберите тип дома ...',

            multi: this.form.get('type')?.value == 'PURCHASE' || this.form.get('type')?.value == 'RENT',
            selectionMode: "range",
            view: "month",
            dateFormat: "MMMM yyyy г."
        };

        data.selectionMode = data.multi ? data.selectionMode : "single";
        if(!data.multi && this.form.get('propertyStatuses')?.value[0] == 'OLD'){
            data.dateFormat = "yyyy г.";
            data.view = "year"
        }

        if(this.form.get('propertyType')!.value == 'LAND'){
            data.propertyStatusLabel = 'Статус земельного участка';
            data.propertyStatusPlaceholder = 'Выберите статус земельного участка ...';
            data.houseTypesLabel = 'Категория земель';
            data.houseTypesPlaceholder = 'Выберите категорию земель ...';
        } else if(this.form.get('propertyType')!.value == 'COMMERCIAL'){
            data.houseTypesLabel = 'Тип здания';
            data.houseTypesPlaceholder = 'Выберите тип здания ...';
        }

        return data;

    }

    setAdditionalInfo($event: any) {
        this.mapChips = [].concat($event.metro);
        this.changeDetectorRef.detectChanges();
        // this.mapComponent!.showOnMap();
    }

    openMap(obj?: GeoData) {
        let data = {
            displayMode: (this.form.controls['type']?.value === 'PURCHASE' || this.form.controls['type']?.value === 'RENT'
                ? 'selection':'definition'),
            fullscreen: true,
            mainPlacemark: {
                coordinates: [this.form.controls['location']?.value.lat, this.form.controls['location']?.value.lon],
                name: this.form.controls['address']?.value,
                description: this.districts.join(', ')
            },
            arrays: {points: this.mapArray.addresses.concat(this.mapArray.infrastructure).concat(this.mapArray.stops),
                zones: this.mapArray.zones
            },
            selectedGeo: obj,
            mainPlacemarkLabel: 'Объект сделки'
        };

        const ref = this.mapService.open({data});

        ref.onClose.subscribe((array) => {
            this.mapArray.zones = array.zones || [];
            if(data.displayMode == 'definition'){
                this.mapArray.infrastructure = array.points.filter((data: GeoData) => data.subtype != 'stop');
                this.mapArray.stops = array.points.filter((data: GeoData) => data.subtype == 'stop');
                this.mapArray.addresses = [];
            } else{
                this.mapArray.addresses = array.points;
                this.mapArray.infrastructure = [];
                this.mapArray.stops = [];
            }
            this.recalcInfrastructureDisplay();
            this.changeDetectorRef.detectChanges();

        });
    }

    recalcInfrastructureDisplay() {
        let bool = this.form.controls['type']?.value === 'SALE' || this.form.controls['type']?.value === 'ALTERNATIVE'
            || this.form.controls['type']?.value === 'LEASE';
        if(bool){
            this.infrastructureDisplay[0].label = 'Транспортная доступность';
            this.infrastructureDisplay[0].array = this.mapArray.stops;
            this.infrastructureDisplay[1].label = 'Доступность инфраструктуры';
            this.infrastructureDisplay[1].array = this.mapArray.infrastructure;
        } else{
            this.infrastructureDisplay[0].label = 'Выделенные локации';
            this.infrastructureDisplay[0].array = this.mapArray.zones;
            this.infrastructureDisplay[1].label = 'Выбранные адреса';
            this.infrastructureDisplay[1].array = this.mapArray.addresses;
        }
    }

    removeFromMap(data: GeoData) {
        let array: GeoData[];
        switch (data.subtype) {
            case 'area':
                array = this.mapArray.zones;
                break;
            case 'address':
                array = this.mapArray.addresses;
                break;
            case 'business':
                array = this.mapArray.infrastructure;
                break;
            case 'stop':
                array = this.mapArray.stops;
                break;
        }

        array.splice(array.indexOf(data), 1);
    }

}
