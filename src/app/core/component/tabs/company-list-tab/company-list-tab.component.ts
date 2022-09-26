import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalWindowComponent } from '../../../../modal-window/modal-window.component';
import { Company } from '../../../models/entity/company';
import { TagInterface, Tags } from '../../../models/tags';
import { CompanyService } from '../../../services/company.service';
import { CoreState } from '../../../store/states/app.states';
import { TabListComponent } from '../tab-list.component';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
    selector: 'app-company-list-tab',
    templateUrl: './company-list-tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../tab.component.scss',
                '../tab-list.component.scss',
                './company-list-tab.component.scss'],
    providers: [DialogService]
})
export class CompanyListTabComponent extends TabListComponent implements OnInit {
    entities: Company[] = [];
    @ViewChild('menu') ctMenu: TieredMenu | undefined;
    mode: string = 'table';
    section: any = {label: 'Все компании', code: 'ALL'};

    sidebar = 0;
    selectedEntity: Company[] = [];
    previewEntity: any = null;
    companyClass = Company;
    headerMenu: any[] = [
        {label: 'Заметки', value: 'notes', command: () => this.headerOverlay = {label: 'Заметки'}},
        {label: 'Командная активность', value: 'activity', items: [
                { label: 'Звонок', value: 'call', command: () => this.headerOverlay = {label: 'Звонок'}},
                { label: 'Сообщение', value: 'message', command: () => this.headerOverlay = {label: 'Сообщение'}},
                { label: 'Задача', value: 'task', command: () => this.headerOverlay = {label: 'Задача'}},
                { label: 'Встреча', value: 'meet', command: () => this.headerOverlay = {label: 'Встреча'}},
                { label: 'Письмо', value: 'letter', command: () => this.headerOverlay = {label: 'Письмо'}}
            ]
        },
        {label: 'Интернет маркетинг', value: 'marketing',
            items: [
                { label: 'E-mail маркетинг', value: 'mailMarketing', command: () => this.headerOverlay = {label: 'E-mail маркетинг'}},
                { label: 'Социальные сети маркетинг', value: 'socialMarketing', command: () => this.headerOverlay = {label: 'Социальные сети маркетинг'}},
                { label: 'Мессенджеры маркетинг', value: 'messengerMarketing', command: () => this.headerOverlay = {label: 'Мессенджеры маркетинг'}},
                { label: 'Отчеты', value: 'report', command: () => this.headerOverlay = {label: 'Отчеты'}},
                { label: 'Сводка', value: 'summary', command: () => this.headerOverlay = {label: 'Сводка'}},
                { label: 'Опросы', value: 'polls', command: () => this.headerOverlay = {label: 'Опросы'}}
            ]
        },
        {label: 'Профиль компании', value: 'profile',
            items: [
                { label: 'Портрет компании 360*', value: 'portrait', command: () => this.headerOverlay = {label: 'Портрет компании 360*'} },
                { label: 'Отзывы и рейтинг компании', value: 'rating', command: () => this.headerOverlay = {label: 'Отзывы и рейтинг компании'} },
                { label: 'Индекс деловой активности (Потребление)', value: 'index', command: () => this.headerOverlay = {label: 'Индекс деловой активности (Потребление)'} },
                { label: 'Изменить статус взаимодействия',
                    items: [
                        { label: 'Без взаимодействия', value: 'EMPTY', command: () => this.show('Комментарий к событию', {})  },
                        { label: 'Активно', value: 'ACTIVE', command: () => this.show('Комментарий к событию', {})  },
                        { label: 'Приостановлено', value: 'SUSPENDED', command: () => this.show('Комментарий к событию', {})  },
                        { label: 'В архив', value: 'ARCHIVE', command: () => this.show('Комментарий к событию', {})  },
                        { label: 'В корзину', value: 'TRASH', command: () => this.show('Комментарий к событию', {})  },
                    ]
                },
                { label: 'Изменить стадию',
                    items: [
                        {label: 'Привлеченная компания', code: 'NEW_CONTACT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Преобразование компании', code: 'TRANSFORMATION', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Новый клиент', code: 'NEW_CLIENT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Постоянный клиент', code: 'CONST_CLIENT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Лояльный клиент', code: 'LOYAL_CLIENT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Партнер', code: 'PARTNER', command: () => this.show('Комментарий к событию', {})}
                    ]
                },
                { label: 'Изменить статус',
                    items: [
                        {label: 'Не определено', code: 'UNKNOWN', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Партнер', code: 'PARTNER', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Конкурент', code: 'COMPETITOR', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Наша компания', code: 'OUR', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Другое', code: 'OTHER', command: () => this.show('Комментарий к событию', {})}
                    ]
                },
                { label: 'Удалить', value: 'delete', command: () => this.delete()}
            ]
        },
        {label: 'Теги', value: 'markTag'},
        {label: 'Назначить на ...', value: 'assignTo', submenu: [
                {label: 'Пользователи', code: 'agent', searchService: {}, filter: {}},
                {label: 'Группы', code: 'group', filter: {}}
            ]
        },
        {label: 'Подписаться на ...', value: 'subscribeTo',  submenu: [
                {label: 'Изменение данных компании', code: 'edit'},
                {label: 'Аналитика событий', code: 'analytic'},
                {label: 'Рекламная активность компании', code: 'advert'},
                {label: 'Сделка', code: 'deal'},
                {label: 'События по сделке', code: 'eventDeal'},
                {label: 'Блог компании', code: 'blog'},
                {label: 'Контактные поведенческие события', code: 'contactEvent'},
                {label: 'Деловая активность', code: 'activity'},
            ]
        },
        {label: 'Добавить в ...', value: 'addTo', submenu: [
                {label: 'Группа', code: 'group', filter: {}, addFunction: (ret: any = 'Создать группу') => {
                        // this.show(ret)
                    }},
                {label: 'Список', code: 'list', searchService: {}, filter: {},
                    addFunction: (ret: any = 'Создать список') => {
                        // this.show(ret);
                    }
                    },
                {label: 'Компании', code: 'organisation', filter: {}, addFunction: () => {}},
                {label: 'Сделка', code: 'deal', filter: {}, addFunction: () => {}},
            ]
        },
    ];
    headerOverlay: any | null;
    overlayData: any = null;
    columnList: any[] = [
        {
            label: 'Общая информация', value: 'main',
            items: [
                { field: 'name', header: 'Название компании' },
                { field: 'phones', header: 'Телефоны компании' },
                { field: 'messengers', header: 'Мессенджеры' },
                { field: 'emails', header: 'Email компании' },
                { field: 'socials', header: 'Социальные сети'},
                { field: 'sites', header: 'Сайты' },
                { field: 'tags', header: 'Теги' },
                { field: 'organisation', header: 'Связанная компания' },
                { field: 'stage', header: 'Статус компании' },
                { field: 'review', header: 'Отзывы рейтинг' },
                { field: 'description', header: 'Дополнительно' },
                { field: 'createUser', header: 'Компания создана' },
                { field: 'responsible', header: 'Ответственный'},
                { field: 'updates', header: 'Обновления' },
                { field: 'subscribe', header: 'Подписка' }
            ]
        },
        {
            label: 'Взаимодействие с компанией', value: 'profile',
            items: [
                { field: 'state1', header: 'Статус взаимодействия' },
                { field: 'stage', header: 'Квалификация компании' },
                { field: 'estimate', header: 'Оценка перспективы сотрудничества (BANT)' },
                { field: 'processCode', header: 'Процесс квалификации компании' },
            ]
        },
        {
            label: 'Командная активность', value: 'activity',
            items: [
                { field: 'note', header: 'Заметки' },
                { field: 'firstTask', header: 'Первая задача' },
                { field: 'lastTask', header: 'Последняя задача' },
                { field: 'nextTask', header: 'Следующая задача' },
                { field: 'firstMeet', header: 'Первая встреча' },
                { field: 'lastMeet', header: 'Последняя встреча' },
                { field: 'nextMeet', header: 'Следующая встреча' }
            ]
        },
        {
            label: 'Коммуникации', value: 'communication',
            items: [
                { field: 'firstCall', header: 'Первый звонок' },
                { field: 'lastCall', header: 'Последний звонок' },
                { field: 'nextCall', header: 'Следующий звонок' },
                { field: 'firstLetter', header: 'Первое письмо' },
                { field: 'lastLetter', header: 'Последнее письмо' },
                { field: 'nextLetter', header: 'Следующее письмо' },
                { field: 'discussions', header: 'Обсуждения' },
                { field: 'messages', header: 'Сообщения' },
                { field: 'socials1', header: 'Соц. сети'},
            ]
        },
        {
            label: 'Календарь', value: 'communication',
            items: [
                { field: 'addDate', header: 'Дата создания компании' },
                { field: 'firstDate', header: 'Дата первого взаимодействия' },
                { field: 'nextDate', header: 'Дата следующего взаимодействия' },
                { field: 'lastDate', header: 'Дата последнего взаимодействия' },
                { field: 'withoutDate', header: 'Без взаимодействия' }
            ]
        },
        {
            label: 'Email маркетинг', value: 'marketing',
            items: [
                { field: 'letter1', header: 'Первое письмо' },
                { field: 'letter2', header: 'Последнее письмо' },
                { field: 'letter3', header: 'Следующее письмо' }
            ]
        },
        {
            label: 'Социальные сети маркетинг', value: 'marketing',
            items: [
                { field: 'social1', header: 'Первый пост' },
                { field: 'social2', header: 'Последний пост' },
                { field: 'social3', header: 'Следующий пост' }
            ]
        },
        { label: 'Мессенджер маркетинг', value: 'marketing',
            items: [
                { field: 'social1', header: 'Первое сообщение' },
                { field: 'social2', header: 'Последнее сообшение' },
                { field: 'social3', header: 'Следующее сообщение' }
            ]
        },
        { label: 'Отчеты', value: 'val2'},
        { label: 'Сводка', value: 'val3'},
        { label: 'Опросы', value: 'val4'},
        { label: 'NPS', value: 'val5'},
        { label: 'PMI', value: 'val6'},
    ];

    activeColumns: any[] = [
        { field: 'name', header: 'Название компании' },
        { field: 'tags', header: 'Теги' },
        { field: 'phones', header: 'Телефоны компании' },
        { field: 'emails', header: 'Email компании' },
        { field: 'sites', header: 'Сайты' },
        { field: 'messengers', header: 'Мессенджеры' },
        { field: 'socials', header: 'Социальные сети'},
        { field: 'organisation', header: 'Связанная компания' },
        { field: 'description', header: 'Дополнительно' },
        { field: 'responsible', header: 'Ответственный' }
    ];

    tags: TagInterface[] = Tags.tagArray;
    selectedTags: any[] = [];
    filter: any = {
        search: '',
        searchSource: 'person',
        state: 'ALL'
    };

    stateFilter = [
        {label: 'Все компании', code: 'ALL', description: 'Маркетинговая компания 1'},
        {label: 'Без взаимодействия', code: 'EMPTY', description: 'Маркетинговая компания 1'},
        {label: 'Активно', code: 'ACTIVE', description: 'Маркетинговая компания 1'},
        {label: 'Приостановлено', code: 'SUSPENDED', description: 'Маркетинговая компания 1'},
        {label: 'Архив', code: 'ARCHIVE', description: 'Маркетинговая компания 1'},
        {label: 'Корзина', code: 'TRASH'},
        {label: 'Другое', code: 'OTHER'},
        {label: 'Маркетинговые компании', code: 'MARKETING'}
    ];

    ref: DynamicDialogRef = new DynamicDialogRef();


    constructor(protected store: Store<CoreState>,
                public entityService: CompanyService,
                private changeDetectorRef: ChangeDetectorRef,
                private dialogService: DialogService) {
        super(store);
    }

    ngOnInit(): void {
        this.list();
    }

    show(title: string, args?: any): void {
        this.ref = this.dialogService.open(ModalWindowComponent, {
            header: title,
            data: args,
            baseZIndex: 10000
        });
    }

    getFilterLabel(): string{
        return (this.stateFilter.find(pos => pos.code === this.filter.state)?.label || '') + ' (' + this.entities.length + ')';
    }

    list(): void{
        this.entityService.list(this.page, this.perPage, this.filter, {}, '').subscribe(data => {
            this.entities = data;
            this.selectedEntity = [];
            this.changeDetectorRef.detectChanges();
        });
    }

    createCompany(): void {
        this.openTab('Новая организация', 'COMPANY', {entity: new Company()});
    }

    updateEntity(previewEntity: any, $event: any): void {
        this.entities[this.entities.indexOf(previewEntity)] = $event;
        this.previewEntity = $event;
    }

    delete(id?: any): void {
        if (id){
            this.entities.splice(this.entities.findIndex((entity) => entity.id === id), 1);
        } else{
            this.selectedEntity.forEach((entity, index) => {
                this.entityService.delete(entity.id as string).subscribe(result => {
                    this.entities.splice(this.entities.findIndex((del) => del.id === entity.id), 1);
                    this.selectedEntity.splice(index, 1);
                });
            });
        }
    }

    getFieldActivity(entity: Company): string {
        return Company.fieldActivityOptions[entity.fieldActivity].label;
    }
}
