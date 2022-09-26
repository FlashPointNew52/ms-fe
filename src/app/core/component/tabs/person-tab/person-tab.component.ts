import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Contact, IStageCode } from '../../../../models/entity/contact';
import { AddressBlock } from '../../../models/address-block';
import { Person } from '../../../models/entity/person';
import { PersonService } from '../../../services/person.service';
import { CoreState } from '../../../store/states/app.states';
import { AddressInputComponent } from '../../formElements/address-input/address-input.component';
import { TabComponent } from '../tab.component';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-person-tab',
    templateUrl: './person-tab.component.html',

    styleUrls: [
        '../tab.component.scss',
        './person-tab.component.scss'
    ],
    providers: [DialogService]
})
export class PersonTabComponent extends TabComponent implements OnInit {
    @ViewChild(AddressInputComponent, {static: true}) addressForm: AddressInputComponent | undefined;
    canEditable: boolean = true;
    progressWidth: number = 0;
    entity: Person = new Person();
    conClass = Contact;
    personClass = Person;
    editEnabled: boolean = false;
    ref: DynamicDialogRef = new DynamicDialogRef();
    sidebar: any = {
        open: false,
        mode: 'normal',
        title: ''
    };

    viewMode: 'FULL' | 'SHORT' = 'FULL';
    filter: any = {
        stage: 'ALL',
        state: 'ALL',
        date: null
    };
    filterStagesMenu = [
        {label: 'Все активные стадии', code: 'ALL', description: 'Хронология взаимодействия. ' +
            'Все активные стадии в хронологическом порядке отображающие взаимодействия с контактом'},
        ...Person.stageCodeArray
    ];

    filterStatesMenu = [
        {label: 'Любой статус', code: 'ALL'},
        {label: 'Без взаимодействия', code: 'EMPTY'},
        {label: 'Активно', code: 'ACTIVE'},
        {label: 'Приостановлено', code: 'SUSPENDED'}
    ];

    updatesSelected: any = { label: 'Обновления взаимодействий', withCreate: false, value: 'all'};
    updatesPanel: any[] = [
        this.updatesSelected,
        { separator: true},
        { label: 'Комментарии к событиям', value: 'comments', withCreate: true },
        { separator: true},
        { label: 'Заметки', value: 'onlyNotes', withCreate: true },
        { separator: true},
        { label: 'Командная активность', items: [
                { label: 'Все разделы', value: 'allActions', label2: 'Командная активность (Все разделы)'},
                { label: 'Звонок', value: 'call', withCreate: true },
                { label: 'Сообщение', value: 'message', withCreate: true },
                { label: 'Задача', value: 'task', withCreate: true },
                { label: 'Встреча', value: 'meet', withCreate: true },
                { label: 'Письмо', value: 'letter', withCreate: true }
            ]
        },
        { separator: true},
        { label: 'Интернет маркетинг', items: [
                { label: 'Все разделы', value: 'allMarketing', label2: 'Интернет маркетинг (Все разделы)' },
                { label: 'E-mail маркетинг', value: 'mailMarketing', withCreate: true },
                { label: 'Социальные сети маркетинг', value: 'socialMarketing', withCreate: true },
                { label: 'Мессенджеры маркетинг', value: 'messengerMarketing', withCreate: true },
                { label: 'Отчеты', value: 'report', withCreate: true },
                { label: 'Сводка', value: 'summary', withCreate: true },
                { label: 'Опросы', value: 'polls', withCreate: true }
            ]
        },
        { separator: true},
        { label: 'Профиль контакта', items: [
                { label: 'Портрет контакта 360*', value: 'portrait' },
                { label: 'Тип контакта', value: 'type' },
                { label: 'Отзывы и рейтинг контакта', value: 'rating' },
                { label: 'Индекс деловой активности (Потребление)', value: 'index' }
            ]
        },
        { separator: true},
        { label: 'Документы', items: [
                { label: 'Все разделы', value: 'allDocuments', label2: 'Документы (Все разделы)' },
                { label: 'Договоры', value: 'contracts', withCreate: true },
                { label: 'Соглашения', value: 'agreements', withCreate: true },
                { label: 'Акты', value: 'acts', withCreate: true },
                { label: 'Приложения', value: 'applications', withCreate: true }
            ]
        },
        { separator: true},
        { label: 'Подписка на деловую активность контакта', items: [
                { label: 'Все разделы', value: 'allSubscribes', label2: 'Подписка на деловую активность контакта (Все разделы)' },
                { label: 'Изменение данных контакта', value: 'editing' },
                { label: 'Аналитика событий', value: 'analytic' },
                { label: 'Рекламная активность контакта', value: 'adv' }
            ]
        },
        { separator: true},
        { label: 'Статистика по контакту', items: [
                { label: 'Активность', value: 'activity' },
                { label: 'Маркетинг', value: 'marketing' },
                { label: 'Профиль', value: 'profile' }
            ]
        },
    ];

    constructor(protected store: Store<CoreState>,
                public personService: PersonService,
                private dialogService: DialogService) {
        super(store);
    }

    ngOnInit(): void {
        this.entity = this.tab.args.entity as Person;
        this.filter.stage = this.entity.stageCode;
        this.filter.state = this.filterStatesMenu.find(state => state.code === this.entity.state)?.code || 'ALL';
    }

    save(entity: any): void {
        this.tab = {...this.tab, args: {...this.tab.args, entity}};
        this.updateTab();
    }

    delete(): void {
        this.closeTab();
    }

    getStage(): any {
        const param = Person.stageCodeOptions[this.filter?.stage as keyof IStageCode] || this.filterStagesMenu[0];
        const stateText = this.filterStatesMenu.find(state => state.code === this.filter.state)?.label || this.filterStatesMenu[0].label;
        return `<div class="stage-name">${stateText}. ${param.label}. <span>${param.description}</span></div>`;
    }

    openSideBar(event: MouseEvent, label: string, mode: 'extended' | 'normal' = 'normal', description: string = ''): void {
        event.stopPropagation();
        this.sidebar.open = true;
        this.sidebar.mode = mode;
        this.sidebar.title = label;
        this.sidebar.description = description;
    }
}
