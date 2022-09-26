import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild, ViewChildren
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { InputTextarea } from 'primeng/inputtextarea';
import { Contact } from '../../../../models/entity/contact';
import { User } from '../../../../models/entity/user';
import { AddressBlock } from '../../../models/address-block';
import { Company } from '../../../models/entity/company';
import { Person } from '../../../models/entity/person';
import { Utils } from '../../../models/utils';
import { AddressInputComponent } from '../../formElements/address-input/address-input.component';
import { ModalWindowComponent } from '../../../../modal-window/modal-window.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-entity-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './entity-view.component.html',
    styleUrls: ['./entity-view.component.scss'],
    providers: [DialogService]
})
export class EntityViewComponent implements OnInit, AfterContentInit {
    _entity: Person | Contact | User | Company = new Contact();

    get entity(): Person | Contact | User | Company {
        return this._entity;
    }
    @Input() set entity(value: Person | Contact | User | Company) {
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
    @ViewChild(AddressInputComponent, {static: true}) addressForm: AddressInputComponent | undefined;
    @ViewChildren(InputTextarea) textarea: InputTextarea | undefined;

    conClass = Contact;
    personClass = Person;
    companyClass = Company;
    utils = Utils;
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

    getLastName(): string | null{
        return (this._entity as Person).lastName || this.form.get('lastName')?.value || null;
    }

    getFieldActivity(): string {
        return Company.fieldActivityOptions[this.form.get('fieldActivity')?.value as keyof typeof Company.fieldActivityOptions]?.label;
    }

    constructor(private dialogService: DialogService,
                private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {

    }




    ngAfterContentInit(): void {
    }

    checkField(): void{
        let editingField = Object.keys(this._entity).filter(
            (key) =>
                (this.form.controls[key as keyof Person]?.value !== this._entity[key as keyof Contact] && key !== 'sources'));
        if (editingField.indexOf('addressBlock') > -1 ){
            editingField.splice( editingField.indexOf('addressBlock'), 1);

            editingField = editingField.concat(Object.keys(this._entity.addressBlock).filter((key) =>
                (this.form.get('addressBlock')?.get(key)?.value !== this._entity.addressBlock[key as keyof AddressBlock])));
        }
        // Выбираем массивные данные для проверки. Выбираем только те у которых кол-во полей совпадает.

        editingField.filter(key => (key === 'phones' || key === 'emails' || key === 'sites' || key === 'messengers' || key === 'socials')
            && this.form.get(key)?.value?.length === this._entity[key].length
        ).forEach(field => {
            let changed = false;
            for (const [index, val] of this.form.get(field)?.value.entries()){
                if (val !== this._entity[field as keyof Contact][index]){
                    changed = true;
                }
            }
            if (!changed){
                editingField.splice(editingField.indexOf(field), 1);
            }
        });

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

        editingField.filter(key => key === 'tag' && this.form.get('tag')?.value?.length === this._entity.tag.length
        ).forEach((field) => {
            if (this.form.get('tag')?.value.filter((val: any) => this._entity.tag.indexOf(val) > -1).length
                === this._entity.tag.length){
                editingField.splice(editingField.indexOf('tag'), 1);
            }
        });

        // if (editingField.length === 1 && editingField[0] === 'addressBlock'){
        //
        // }

        this.showSavePanel = editingField.length > 0;
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
                this.form.controls[key].setValue(this._entity[key as keyof Contact]);
            }
        });
        this.showSavePanel = false;
    }

    public calcForm(): void {
        this.form = new FormGroup(
            Object.keys(this._entity).reduce((acc: any, key) => {
                switch (key) {
                    case 'addressBlock':
                        acc[key] = (this.addressForm as AddressInputComponent).createGroup(this._entity.addressBlock);
                        break;
                    default:
                        acc[key] = new FormControl();
                        acc[key].setValue(this._entity[key as keyof Contact]);
                }
                return acc;

            }, {state: new FormControl()})
        );
        this.formSubs = this.form.valueChanges.subscribe(val => {
            this.checkField();
        });

        setTimeout(() => {
            if (this.textarea){
                (this.textarea as any).first.updateState();
            }}, 20
        );
    }

    addComment(field: string, value: any): void {
        if (this._entity[field as keyof (Person | Company)] !== value){
            this.show('Комментарий к событию', { field} );
            this.eventsComments[field] = value;
        } else{
            delete this.eventsComments[field];
        }
    }
}
