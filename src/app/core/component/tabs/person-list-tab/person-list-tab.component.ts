import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Menu } from 'primeng/menu';
import { ModalWindowComponent } from '../../../../modal-window/modal-window.component';
import { Person } from '../../../models/entity/person';
import { TagInterface, Tags } from '../../../models/tags';
import { PersonService } from '../../../services/person.service';
import { CoreState } from '../../../store/states/app.states';
import { TabListComponent } from '../tab-list.component';

@Component({
    selector: 'app-person-list-tab',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './person-list-tab.component.html',
    styleUrls: ['../tab.component.scss',
                '../tab-list.component.scss',
                './person-list-tab.component.scss'
    ],
    providers: [DialogService]
})
export class PersonListTabComponent extends TabListComponent implements OnInit, AfterViewInit {
    entities: Person[] = [];
    mode: string = 'table';

    selectedEntity: Person[] = [];
    previewEntity: any = null;
    indexForPreview: number = -1;
    personClass = Person;
    columnList: any[] = [
        {
            label: 'Общая информация', value: 'main',
            items: [
                { field: 'name', header: 'ФИО' },
                { field: 'phones', header: 'Телефоны контакта' },
                { field: 'messengers', header: 'Мессенджеры' },
                { field: 'emails', header: 'Email контакта' },
                { field: 'socials', header: 'Социальные сети'},
                { field: 'sites', header: 'Сайты' },
                { field: 'tags', header: 'Теги' },
                { field: 'organisation', header: 'Связанная компания' },
                { field: 'stage', header: 'Статус контакта' },
                { field: 'review', header: 'Отзывы рейтинг' },
                { field: 'description', header: 'Дополнительно' },
                { field: 'createUser', header: 'Контакт создан' },
                { field: 'responsible', header: 'Ответственный'},
                { field: 'updates', header: 'Обновления' },
                { field: 'subscribe', header: 'Подписка' }
            ]
        },
        {
            label: 'Взаимодействие с контактом', value: 'profile',
            items: [
                { field: 'state1', header: 'Статус взаимодействия' },
                { field: 'stage', header: 'Квалификация контакта' },
                { field: 'estimate', header: 'Оценка перспективы сотрудничества (BANT)' },
                { field: 'processCode', header: 'Процесс квалификации контакта' },
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
                { field: 'addDate', header: 'Дата создания контакта' },
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
        { field: 'name', header: 'ФИО' },
        { field: 'tags', header: 'Теги' },
        { field: 'phones', header: 'Телефоны контакта' },
        { field: 'emails', header: 'Email контакта' },
        { field: 'sites', header: 'Сайты' },
        { field: 'messengers', header: 'Мессенджеры' },
        { field: 'socials', header: 'Социальные сети'},
        { field: 'organisation', header: 'Связанная компания' },
        { field: 'description', header: 'Дополнительно' },
        { field: 'responsible', header: 'Ответственный' }
    ];
    sidebar = 0;
    @ViewChild('op') tooltip: OverlayPanel | undefined;
    @ViewChildren(Menu) menuList: QueryList<Menu> = new QueryList<Menu>();
    menu: Menu | undefined;

    overlayData: any = null;
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
        {label: 'Профиль контакта', value: 'profile',
            items: [
                { label: 'Портрет контакта 360*', value: 'portrait', command: () => this.headerOverlay = {label: 'Портрет контакта 360*'} },
                { label: 'Отзывы и рейтинг компании', value: 'rating', command: () => this.headerOverlay = {label: 'Отзывы и рейтинг контакта'} },
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
                        {label: 'Привлеченный контакт', code: 'NEW_CONTACT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Преобразование контакта', code: 'TRANSFORMATION', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Новый клиент', code: 'NEW_CLIENT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Постоянный клиент', code: 'CONST_CLIENT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Лояльный клиент', code: 'LOYAL_CLIENT', command: () => this.show('Комментарий к событию', {})},
                        {label: 'Партнер', code: 'PARTNER', command: () => this.show('Комментарий к событию', {})},
                    ]
                },
                { label: 'Удалить', value: 'delete', command: () => this.delete()}
            ]
        },
        {label: 'Теги', value: 'markTag'},
        {label: 'Назначить на ...', value: 'assignTo', submenu: [
                {label: 'Пользователи', type: 'agent', searchService: {}, filter: {}},
                {label: 'Группы', type: 'group', filter: {}}
            ]
        },
        {label: 'Подписаться на ...', value: 'subscribeTo',  submenu: [
                {label: 'Изменение данных контакта', type: 'edit'},
                {label: 'Аналитика событий', type: 'analytic'},
                {label: 'Рекламная активность контакта', type: 'advert'},
                {label: 'Сделка', type: 'deal'},
                {label: 'События по сделке', type: 'eventDeal'},
                {label: 'Блог контакта', type: 'blog'},
                {label: 'Контактные поведенческие события', type: 'contactEvent'},
                {label: 'Деловая активность', type: 'activity'},
            ]
        },
        {label: 'Добавить в ...', value: 'addTo', submenu: [
                {label: 'Группа', type: 'group', filter: {}, addFunction: (ret: any = 'Создать группу') => this.show(ret)},
                {label: 'Список', type: 'list', searchService: {}, filter: {},
                    addFunction: (ret: any = 'Создать список') => this.show(ret)},
                {label: 'Компании', type: 'organisation', filter: {}, addFunction: () => {}},
                {label: 'Сделка', type: 'deal', filter: {}, addFunction: () => {}},
            ]
        },
    ];
    headerOverlay: any | null;
    tags: TagInterface[] = Tags.tagArray;
    selectedTags: any[] = [];
    filter: any = {
        search: '',
        searchSource: 'person',
        stateCode: 'EMPTY'
    };

    ref: DynamicDialogRef = new DynamicDialogRef();

    timer: any;

    constructor(protected store: Store<CoreState>,
                public entityService: PersonService,
                private changeDetectorRef: ChangeDetectorRef,
                private dialogService: DialogService
    ) {
        super(store);
    }

    ngOnInit(): void {
       this.list();
    }

    list(): void{
        this.entityService.list(this.page, this.perPage, this.filter, {}, '').subscribe(data => {
            this.entities = data;
            this.changeDetectorRef.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        this.menuList.changes.subscribe((comps: QueryList<Menu>) =>
            this.menu = comps.first
        );
    }

    show(title: string, args?: any): void {
        this.ref = this.dialogService.open(ModalWindowComponent, {
            header: title,
            width: '90%',
            data: args,
            baseZIndex: 10000
        });
    }

    createContact(): void {
        this.openTab('Новый контакт', 'PERSON', {entity: new Person()});
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

    setPreviewData($event?: any, i?: any): void {
        if (!$event){
            this.indexForPreview = -1;
            clearInterval(this.timer);
            if((this.tooltip as OverlayPanel).render)
                (this.tooltip as OverlayPanel).hide();
            // (this.tooltip as OverlayPanel).hide();
        }else{
            this.indexForPreview = i;
            let event = $event;
            this.timer = setInterval(() => {
                if (this.indexForPreview > -1 && event && (event.currentTarget || event.target)){
                    (this.tooltip as OverlayPanel).appendTo = (event.currentTarget || event.target) ;
                    (this.tooltip as OverlayPanel).show(event);
                } else{

                }
            }, 200);
            // (this.tooltip as OverlayPanel).show($event);
        }

    }

    setValue($event: any): void {
        if ($event.callback != null){
            $event.callback();

        }
        return;
    }
}
