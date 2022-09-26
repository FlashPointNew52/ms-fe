import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStageCode } from '../../../../models/entity/contact';
import { Company } from '../../../models/entity/company';
import { Person } from '../../../models/entity/person';
import { CompanyService } from '../../../services/company.service';
import { CoreState } from '../../../store/states/app.states';
import { TabComponent } from '../tab.component';

@Component({
    selector: 'app-company-tab',
    templateUrl: './company-tab.component.html',
    styleUrls: [
        '../tab.component.scss',
        './company-tab.component.scss']
})
export class CompanyTabComponent extends TabComponent implements OnInit {
    entity: Company = new Company();

    sidebar: any = {
        open: false,
        mode: 'normal',
        title: ''
    };

    filter: any = {
        stage: 'ALL',
        state: 'ALL',
        date: null
    };

    viewMode: 'FULL' | 'SHORT' = 'FULL';

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
        { label: 'Профиль компании', items: [
                { label: 'Портрет компании 360*', value: 'portrait' },
                { label: 'Тип компании', value: 'type' },
                { label: 'Отзывы и рейтинг компании', value: 'rating' },
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
        { label: 'Подписка на деловую активность компании', items: [
                { label: 'Все разделы', value: 'allSubscribes', label2: 'Подписка на деловую активность компании (Все разделы)' },
                { label: 'Изменение данных компании', value: 'editing' },
                { label: 'Аналитика событий', value: 'analytic' },
                { label: 'Рекламная активность компании', value: 'adv' }
            ]
        },
        { separator: true},
        { label: 'Статистика по компании', items: [
                { label: 'Активность', value: 'activity' },
                { label: 'Маркетинг', value: 'marketing' },
                { label: 'Профиль', value: 'profile' }
            ]
        },
    ];

    filterStagesMenu = [
        {label: 'Все активные стадии', code: 'ALL', description: 'Хронология взаимодействия. ' +
                'Все активные стадии в хронологическом порядке отображающие взаимодействия с компанией'},
        ...Company.stageCodeArray
    ];

    filterStatesMenu = [
        {label: 'Любой статус', code: 'ALL'},
        {label: 'Без взаимодействия', code: 'EMPTY'},
        {label: 'Активно', code: 'ACTIVE'},
        {label: 'Приостановлено', code: 'SUSPENDED'}
    ];

    constructor(protected store: Store<CoreState>,
                public companyService: CompanyService) {
        super(store);
    }

    ngOnInit(): void {
        this.entity = this.tab.args.entity as Company;
        this.filter.stage = this.entity.stageCode;
        this.filter.state = this.filterStatesMenu.find(state => state.code === this.entity.state)?.code || 'ALL';
    }

    save(entity: any): void {
        this.tab = {...this.tab, args: {...this.tab.args, entity}};
        this.updateTab();
    }

    getStage(): any {
        const param = Company.stageCodeOptions[this.filter?.stage as keyof IStageCode] || this.filterStagesMenu[0];
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
