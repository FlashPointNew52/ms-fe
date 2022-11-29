import { Injectable } from '@angular/core';

export enum FieldType {
    TEXT,
    AUTO,
    NUMBER,
    CHOICE,
    DATE,
    SEARCH,
    TAGS,
    DEPENDED_CHOICE,
    TEXTAREA,
    RANGE
}

interface Config {
    type: FieldType,
    label: string
}

export interface ChoiceConfig extends Config {
    type: FieldType.CHOICE,
    options: any[]
}

export interface AutoConfig extends Config {
    type: FieldType.AUTO,
    //TODO: remove lately
    placeholder: string
}

export interface TextConfig extends Config {
    type: FieldType.TEXT,
    placeholder: string
}

export interface DateConfig extends Config {
    type: FieldType.DATE,
    placeholder: string
}

export interface NumberConfig extends Config {
    type: FieldType.NUMBER,
    placeholder: string,
    postfix?: any[];
    mask?: string;
}

export interface SearchConfig extends Config {
    type: FieldType.SEARCH,
    placeholder: string
}

export interface TagsConfig extends Config {
    type: FieldType.TAGS
}

export interface TextareaConfig extends Config {
    type: FieldType.TEXTAREA,
    placeholder: string
}

export interface DependedChoiceConfig extends Config {
    type: FieldType.DEPENDED_CHOICE,
    dependedField: string,
    options: { [key: string]: any[] }
}

export interface RangeConfig extends Config {
    type: FieldType.RANGE,
    placeholder: string
}

export type FieldConfig = ChoiceConfig | TextConfig | DateConfig | SearchConfig | TagsConfig | DependedChoiceConfig | TextareaConfig | RangeConfig | NumberConfig | AutoConfig;

export type Field = {
    label: string;
    code: string;
    isOneOff: boolean;
    editable: boolean;
    config: FieldConfig[];
    removable: boolean;
}

export interface Subgroup {
    label: string;
    fields: Field[];
}

export type FieldGroup = {
    label: string;
    fields: Field[];
    subgroups: {
        [key: string]: Subgroup
    };
}

export type FieldGroups = {
    [key: string]: FieldGroup
}

export type Section = {
    label: string,
    groups: FieldGroups,
}

export type Sections = {
    [key: string]: Section
}

@Injectable({
    providedIn: 'root'
})
export class FieldCustomizerService {

    public static readonly dealTypeHash = {
        NEW: { label: 'Новая сделка'},
        EXISTED: { label: 'Существующая сделка'}
    };

    public static readonly dealTypeArray = [
        {label: FieldCustomizerService.dealTypeHash.NEW.label, code: 'NEW'},
        {label: FieldCustomizerService.dealTypeHash.EXISTED.label, code: 'EXISTED'}
    ];

    public static readonly dealHash = {
        PURCHASE: { label: 'Покупка'},
        SALE: { label: 'Продажа'},
        ALTERNATIVE: { label: 'Альтернатива'},
        LEASE: { label: 'Аренда сдать'},
        RENT: { label: 'Аренда снять'}
    };

    public static readonly dealArray = [
        {label: FieldCustomizerService.dealHash.PURCHASE.label, code: 'PURCHASE'},
        {label: FieldCustomizerService.dealHash.SALE.label, code: 'SALE'},
        {label: FieldCustomizerService.dealHash.ALTERNATIVE.label, code: 'ALTERNATIVE'},
        {label: FieldCustomizerService.dealHash.LEASE.label, code: 'LEASE'},
        {label: FieldCustomizerService.dealHash.RENT.label, code: 'RENT'}
    ];

    public static readonly stateOptionsHash = {
        ATTRACTED: 'Привлеченные',
        IN_PROGRESS: 'В работе',
        SUSPENDED: 'Приостановлено',
        ARCHIVE: 'Архив'
    };

    public static readonly statusOptionsHash = {
        // ПРИВЛЕЧЕННЫЕ
        CLIENT_POTENTIAL: {label: 'Потенциальный клиент'},
        DEAL_POTENTIAL: {label: 'Потенциальная сделка'},
        INITIAL_CONTACT: {label: 'Первичный контакт / Знакомство'},
        DEAL_CONVERSION: {label: 'Преобразование сделки'},
        // В РАБОТЕ
        DEAL_NEW: {label: 'Новая сделка'},
        ADVERTISING_COMPANY: {label: 'Рекламная компания'},
        FOUND_CUSTOMER: {label: 'Найден покупатель'},
        FOUND_TENANT: {label: 'Найден арендатор'},
        SELECTION_CHOICES: {label: 'Подбор вариантов'},
        CLIENT_AGREE_BUY: {label: 'Клиент принял решение купить'},
        CLIENT_AGREE_RENT: {label: 'Клиент принял решение арендовать'},
        AGREEMENT_CLOSING: {label: 'Согласование закрытия сделки'},
        DEAL_CLOSING: {label: 'Закрытие сделки'},
//     ПРИОСТАНОВЛЕННО
        ONE_WEEK: {label: 'Одна неделя'},
        TWO_WEEK: {label: 'Две недели'},
        THREE_WEEK: {label: 'Три недели'},
        ONE_MONTH: {label: 'Месяц'},
        TWO_MONTH: {label: 'Два месяца'},
        THREE_MONTH: {label: 'Три месяца'},
        SIX_MONTH: {label: 'Шесть месяцев'},
        ONE_YEAR: {label: 'Год'},
        CUSTOM: {label: 'Другое'},
//     АРХИВ
        INVALID: {label: 'Невалидная сделка'},
        DEAL_DISQUALIFIED: {label: 'Дисквалифицирована'},
        CLIENT_REJECTION: {label: 'Отказ клиента'},
        LOST: {label: 'Закрыта - Потеряна'},
        SUCCESS: {label: 'Закрыта - Успешно'},
        BUCKET: {label: 'Корзина'}
    }

    public static readonly stageOptions = {
        PURCHASE: [
                {
                    label: FieldCustomizerService.stateOptionsHash.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_POTENTIAL.label, code: "CLIENT_POTENTIAL"},
                        {label: FieldCustomizerService.statusOptionsHash.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: FieldCustomizerService.statusOptionsHash.SELECTION_CHOICES.label, code: "SELECTION_CHOICES"},
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_AGREE_BUY.label, code: "CLIENT_AGREE_BUY"},
                        {label: FieldCustomizerService.statusOptionsHash.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: FieldCustomizerService.statusOptionsHash.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.INVALID.label, code: "INVALID"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: FieldCustomizerService.statusOptionsHash.LOST.label, code: "LOST"},
                        {label: FieldCustomizerService.statusOptionsHash.SUCCESS.label, code: "SUCCESS"},
                        {label: FieldCustomizerService.statusOptionsHash.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ],
        SALE: [
                {
                    label: FieldCustomizerService.stateOptionsHash.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: FieldCustomizerService.statusOptionsHash.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: FieldCustomizerService.statusOptionsHash.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: FieldCustomizerService.statusOptionsHash.FOUND_CUSTOMER.label, code: "FOUND_CUSTOMER"},
                        {label: FieldCustomizerService.statusOptionsHash.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: FieldCustomizerService.statusOptionsHash.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.INVALID.label, code: "INVALID"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: FieldCustomizerService.statusOptionsHash.LOST.label, code: "LOST"},
                        {label: FieldCustomizerService.statusOptionsHash.SUCCESS.label, code: "SUCCESS"},
                        {label: FieldCustomizerService.statusOptionsHash.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ],
        ALTERNATIVE: [
                {
                    label: FieldCustomizerService.stateOptionsHash.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: FieldCustomizerService.statusOptionsHash.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: FieldCustomizerService.statusOptionsHash.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: FieldCustomizerService.statusOptionsHash.FOUND_CUSTOMER.label, code: "FOUND_CUSTOMER"},
                        {label: FieldCustomizerService.statusOptionsHash.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: FieldCustomizerService.statusOptionsHash.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.INVALID.label, code: "INVALID"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: FieldCustomizerService.statusOptionsHash.LOST.label, code: "LOST"},
                        {label: FieldCustomizerService.statusOptionsHash.SUCCESS.label, code: "SUCCESS"},
                        {label: FieldCustomizerService.statusOptionsHash.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ],
        LEASE:  [
                {
                    label: FieldCustomizerService.stateOptionsHash.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: FieldCustomizerService.statusOptionsHash.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: FieldCustomizerService.statusOptionsHash.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: FieldCustomizerService.statusOptionsHash.FOUND_TENANT.label, code: "FOUND_TENANT"},
                        {label: FieldCustomizerService.statusOptionsHash.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: FieldCustomizerService.statusOptionsHash.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.INVALID.label, code: "INVALID"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: FieldCustomizerService.statusOptionsHash.LOST.label, code: "LOST"},
                        {label: FieldCustomizerService.statusOptionsHash.SUCCESS.label, code: "SUCCESS"},
                        {label: FieldCustomizerService.statusOptionsHash.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ],
        RENT: [
                {
                    label: FieldCustomizerService.stateOptionsHash.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_POTENTIAL.label, code: "CLIENT_POTENTIAL"},
                        {label: FieldCustomizerService.statusOptionsHash.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: FieldCustomizerService.statusOptionsHash.SELECTION_CHOICES.label, code: "SELECTION_CHOICES"},
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_AGREE_RENT.label, code: "CLIENT_AGREE_RENT"},
                        {label: FieldCustomizerService.statusOptionsHash.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: FieldCustomizerService.statusOptionsHash.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: FieldCustomizerService.statusOptionsHash.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: FieldCustomizerService.stateOptionsHash.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: FieldCustomizerService.statusOptionsHash.INVALID.label, code: "INVALID"},
                        {label: FieldCustomizerService.statusOptionsHash.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: FieldCustomizerService.statusOptionsHash.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: FieldCustomizerService.statusOptionsHash.LOST.label, code: "LOST"},
                        {label: FieldCustomizerService.statusOptionsHash.SUCCESS.label, code: "SUCCESS"},
                        {label: FieldCustomizerService.statusOptionsHash.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]
    };

    public static readonly qualificationHash = {
        QUALIFY: { label: 'Квалифицировано'},
        NOT_QUALIFY: { label: 'Не квалифицировано'}
    };

    public static readonly qualificationArray = [
        {label: FieldCustomizerService.qualificationHash.QUALIFY.label, code: 'QUALIFY'},
        {label: FieldCustomizerService.qualificationHash.NOT_QUALIFY.label, code: 'NOT_QUALIFY'}
    ];

    public static readonly commissionStatusHash = {
        NOT_PAID: { label: 'Не оплачено'},
        AWAITING_PAYMENT: { label: 'Ожидает оплаты'},
        PARTLY: { label: 'Оплачено частично'},
        FULLY: { label: 'Оплачено полностью'},
        COMMISSION_PARTLY: { label: 'Произведен возврат комиссии в полном объеме'},
        COMMISSION_FULLY: { label: 'Произведен возврат комиссии частично'}
    };

    public static readonly commissionStatus = [
        {label: FieldCustomizerService.commissionStatusHash.NOT_PAID.label, code: 'NOT_PAID'},
        {label: FieldCustomizerService.commissionStatusHash.AWAITING_PAYMENT.label, code: 'AWAITING_PAYMENT'},
        {label: FieldCustomizerService.commissionStatusHash.PARTLY.label, code: 'PARTLY'},
        {label: FieldCustomizerService.commissionStatusHash.FULLY.label, code: 'FULLY'},
        {label: FieldCustomizerService.commissionStatusHash.COMMISSION_PARTLY.label, code: 'COMMISSION_PARTLY'},
        {label: FieldCustomizerService.commissionStatusHash.COMMISSION_FULLY.label, code: 'COMMISSION_FULLY'}
    ];

    public static readonly landTypeHash = {
        GARDEN_LAND: { label: 'Садовый земельный участок'},
        VEGETABLE_LAND: { label: 'Огородный земельный участок'},
        FIELD_LAND: { label: 'Полевой земельный участок'},
        HOMESTEAD_LAND: { label: 'Приусадебный земельный участок'},
        INDUSTRIAL_SITE: { label: 'Земельный участок промназначения'},
        HOME_LAND: { label: 'Придомовой земельный участок'}
    }

    public static readonly landTypeOptions = [
        {label: FieldCustomizerService.landTypeHash.GARDEN_LAND.label, code: 'GARDEN_LAND'},
        {label: FieldCustomizerService.landTypeHash.VEGETABLE_LAND.label, code: 'VEGETABLE_LAND'},
        {label: FieldCustomizerService.landTypeHash.FIELD_LAND.label, code: 'FIELD_LAND'},
        {label: FieldCustomizerService.landTypeHash.HOMESTEAD_LAND.label, code: 'HOMESTEAD_LAND'},
        {label: FieldCustomizerService.landTypeHash.INDUSTRIAL_SITE.label, code: 'INDUSTRIAL_SITE'},
        {label: FieldCustomizerService.landTypeHash.HOME_LAND.label, code: 'HOME_LAND'}
    ];

    public static readonly categoryLandHash = {
        AGRICULTURAL_LANDS: {label: 'Земли сельхозназначения'},
        SETTLEMENT_LANDS: {label: 'Земли населенных пунктов'},
        INDUSTRY_LANDS: {label: 'Земли промышленности'}
    };

    public static readonly categoryLandOptions = [
        {label: FieldCustomizerService.categoryLandHash.AGRICULTURAL_LANDS.label, code: 'AGRICULTURAL_LANDS'},
        {label: FieldCustomizerService.categoryLandHash.SETTLEMENT_LANDS.label, code: 'SETTLEMENT_LANDS'},
        {label: FieldCustomizerService.categoryLandHash.INDUSTRY_LANDS.label, code: 'INDUSTRY_LANDS'}
    ];

    public static readonly usingLandHash = {
        IHC: {label: 'ИЖС'},
        GARDENING: {label: 'Ведение огородничества'},
        VEGETABLE: {label: 'Ведение садоводства'},
        PERSONAL_PLOT: {label: 'ЛПХ (Приусадебный участок)'},
        FIELD_PLOT: {label: 'ЛПХ (Полевой участок)'},
        ENTREPRENEURSHIP: {label: 'Предпринимательство'},
        PRODUCTION: {label: 'Производственная деятельность'},
    };

    public static readonly usingLandOptions = [
        {label: FieldCustomizerService.usingLandHash.IHC.label, code: 'IHC'},
        {label: FieldCustomizerService.usingLandHash.GARDENING.label, code: 'GARDENING'},
        {label: FieldCustomizerService.usingLandHash.VEGETABLE.label, code: 'VEGETABLE'},
        {label: FieldCustomizerService.usingLandHash.PERSONAL_PLOT.label, code: 'PERSONAL_PLOT'},
        {label: FieldCustomizerService.usingLandHash.FIELD_PLOT.label, code: 'FIELD_PLOT'},
        {label: FieldCustomizerService.usingLandHash.ENTREPRENEURSHIP.label, code: 'ENTREPRENEURSHIP'},
        {label: FieldCustomizerService.usingLandHash.PRODUCTION.label, code: 'PRODUCTION'}
    ];

    public static readonly statusLandHash = {
        ACCOUNTED: {label: 'Учтенный' },
        PREVIOUSLY: {label: 'Ранее учтенный' },
        ARCHIVED: {label: 'Архивный' }
    }

    public static readonly statusLandOptions = [
        {label: FieldCustomizerService.statusLandHash.ACCOUNTED.label, code: 'ACCOUNTED'},
        {label: FieldCustomizerService.statusLandHash.PREVIOUSLY.label, code: 'PREVIOUSLY'},
        {label: FieldCustomizerService.statusLandHash.ARCHIVED.label, code: 'ARCHIVED'}
    ];

    public static readonly communityHash = {
        SNT: {label: 'Садовое некоммерческое товарищество' },
        ONT: {label: 'Огородное некоммерческое товарищество' }
    }

    public static readonly communityOptions = [
        {label: FieldCustomizerService.communityHash.SNT.label, code: 'SNT'},
        {label: FieldCustomizerService.communityHash.ONT.label, code: 'ONT'}
    ];

    public static readonly DEAL_FIELDS: Sections = {
        MAIN: {
            label: 'Сделка (Общая)', groups: {
                DEAL:
                    {
                        label: 'Сделка', subgroups: {}, fields: [
                            {
                                label: 'Дата создания сделки',
                                code: 'createDate',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config:
                                    [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                            },
                            {
                                label: 'Тип сделки',
                                code: 'type',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [
                                    { type: FieldType.CHOICE, label: 'Выбор значения', options: FieldCustomizerService.dealTypeArray }
                                ]
                            },
                            {
                                label: 'Сделка',
                                code: 'deal',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [
                                    {
                                        type: FieldType.CHOICE, label: 'Выбор значения', options: FieldCustomizerService.dealArray
                                    }
                                ]
                            },
                            {
                                label: 'Источник привлечения',
                                code: 'source',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [
                                    {type: FieldType.CHOICE, label: 'Выбор значения', options: FieldCustomizerService.landTypeOptions },
                                    {type: FieldType.SEARCH, label: 'Поиск по маркетинговым компаниям',
                                        placeholder: 'Введите название маркетинговой компании'},
                                    {type: FieldType.SEARCH, label: 'Поиск по рекламным компаниям',
                                        placeholder: 'Введите название рекламной компании'},
                                    {type: FieldType.SEARCH, label: 'Поиск по контактам',
                                        placeholder: 'Введите название контакта'},
                                    {type: FieldType.SEARCH, label: 'Поиск по организациям',
                                        placeholder: 'Введите название организации'},
                                    {type: FieldType.TEXT, label: 'Текстовое поле', placeholder: 'Введите источник привлечения'}
                                ]
                            },
                            {
                                label: 'Заголовок сделки',
                                code: 'heading',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{type: FieldType.TEXT, label: 'Текстовое поле', placeholder: 'Введите заголовок сделки'}]
                            },
                            {
                                label: 'Описание сделки',
                                code: 'description',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{type: FieldType.TEXT, label: 'Текстовое поле', placeholder: 'Введите описание сделки'},]
                            },
                            {
                                label: 'Квалификация',
                                code: 'qualification',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{ type: FieldType.CHOICE, label: 'Выбор значения', options: FieldCustomizerService.qualificationArray }]
                            },
                            {
                                label: 'Стадия / Статус',
                                code: 'stageStatus',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{ type: FieldType.DEPENDED_CHOICE, label: 'Выбор значения', options: FieldCustomizerService.stageOptions, dependedField: 'deal' }]
                            },
                            {
                                label: 'Теги',
                                code: 'tags',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{ type: FieldType.TAGS, label: 'Выбор тега'}]
                            },
                            {
                                label: 'Дополнительно',
                                code: 'additional',
                                isOneOff: true,
                                editable: false,
                                removable: true,
                                config: [{type: FieldType.TEXTAREA, label: 'Дополнительно', placeholder: 'Введите дополнительное описание'}]
                            }
                        ]
                    },
                ACTIVITY: {
                    label: 'Активность', subgroups: {}, fields: [
                        {
                            label: 'Старт активности',
                            code: 'activityStart',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.DATE, label: 'Выбор даты', placeholder: 'Выберите дату старта активности'},
                                {type: FieldType.CHOICE, label: 'Выбор значения (Гант)', options: FieldCustomizerService.qualificationArray},
                            ]
                        },
                        {
                            label: 'Последнее изменение',
                            code: 'changeDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последний контакт',
                            code: 'lastContact',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя активность',
                            code: 'lastActivityDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующая активность',
                            code: 'nextActivityDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя презентация',
                            code: 'lastPresentationDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующай презентация',
                            code: 'nextPresentationDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя маркетинговая компания',
                            code: 'lastMarketingDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующая маркетинговая компания',
                            code: 'nextMarketingDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя рекламная компания',
                            code: 'lastAdvDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующая рекламная компания',
                            code: 'nextAdvDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующий шаг',
                            code: 'nextStep',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.AUTO, label: 'Автоматическое заполнение', placeholder: '01 декабря 2021'},
                                {type: FieldType.TEXT, label: 'Текстовое поле', placeholder: 'Введите заголовок сделки'}
                            ]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additionally',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXTAREA, label: 'Дополнительно', placeholder: 'Введите дополнительное описание'}]
                        },
                    ]
                },
                SUM:{
                    label: 'Сумма', subgroups: {}, fields: [
                        {
                            label: 'Кадастровая стоимость',
                            code: 'cadastralCost',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите кадастровою стоимость'}]
                        },
                        {
                            label: 'Сумма сделки',
                            code: 'amount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите сумму сделки'},
                                {type: FieldType.RANGE, label: 'Диапазон значений', placeholder: 'Введите сумму сделки'},
                            ]
                        },
                        {
                            label: 'Рекомендованная сумма сделки',
                            code: 'recommendedAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите рекомендуемую сумму сделки'},
                                {type: FieldType.RANGE, label: 'Диапазон значений', placeholder: 'Введите рекомендуемую сумму сделки'},
                            ]
                        },
                        {
                            label: 'Взвешенная сумма сделки',
                            code: 'weightedAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите взвешанную сумму сделки'},
                                {type: FieldType.RANGE, label: 'Диапазон значений', placeholder: 'Введите взвешанную сумму сделки'},
                            ]
                        },
                        {
                            label: 'Оценочная стоимость',
                            code: 'estimatedAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите оценочную стоимость'}]
                        },
                        {
                            label: 'Фактическая сумма сделки',
                            code: 'actualAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите фактическую сумму сделки'}]
                        },
                        {
                            label: 'MLS',
                            code: 'mls',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{ type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите сумму mls'}]
                        },
                        {
                            label: 'Комиссия',
                            code: 'commission',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, label: 'Числовое значение', placeholder: 'Введите сумму комиссии'}]
                        },
                        {
                            label: 'Статус комиссии',
                            code: 'commissionStatus',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.CHOICE, label: 'Выбор значения', options: FieldCustomizerService.commissionStatus },
                                {type: FieldType.TEXT, label: 'Текстовое поле', placeholder: 'Введите статус коммисии'}]
                        },
                    ]
                }
            }
        },
        OBJECT: {
            label: 'Объект', groups: {
                'mainDescription': {
                    label: 'Общее описание', subgroups: {}, fields: [
                        {
                            label: 'Объект сделки',
                            code: 'objectType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Этаж объекта сделки',
                            code: 'floor',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Этажей объекта сделки',
                            code: 'floors',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Уровней объекта сделки',
                            code: 'levels',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Антресоль',
                            code: 'entresol',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Этажность здания',
                            code: 'totalFloors',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Надземные этажи',
                            code: 'overgroundFloors',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Подземные этажи',
                            code: 'undergroundFloors',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },

                        {
                            label: 'Площадь объекта сделки',
                            code: 'squareObject',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Площадь квартиры',
                            code: 'squareApartment',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Площадь индивидуального жилого дома',
                            code: 'squareHouse',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Площадь земельного участка',
                            code: 'squareLand',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },

                        {
                            label: 'Санузел объекта сделки',
                            code: 'bathroomObject',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Санузел квартиры',
                            code: 'bathroomApartment',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Санузел индивидуального жилого дома',
                            code: 'bathroomHouse',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Санузел в здании',
                            code: 'bathroomHouse',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },

                        {
                            label: 'Отделка объекта сделки',
                            code: 'decorationObject',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Отделка помещений объекта сделки',
                            code: 'decorationApartment',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Отделка помещений квартиры',
                            code: 'decorationApartment',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Отделка помещений индивидуального жилого дома',
                            code: 'decorationHouse',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Отделка помещений садового дома',
                            code: 'decorationLand',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },

                        {
                            label: 'Кадастровый номер объекта сделки',
                            code: 'cadastralNumber',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        }
                    ]
                },
                'roomsDescription': {
                    label: 'Описание помещений', fields: [], subgroups: {
                        LIVING: {
                            label: 'Жилые помещения', fields: [
                                {
                                    label: 'Количество комнат/помещений',
                                    code: 'roomsCount',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Отделка помещений',
                                    code: 'decoration',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Планировочное решение',
                                    code: 'planning',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Площадь помещений',
                                    code: 'squareRoom',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Высота потолка',
                                    code: 'ceilingHeight',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Окна',
                                    code: 'windows',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Дополнительно',
                                    code: 'additional',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                }
                            ]
                        },
                        AUXILIARY: {
                            label: 'Вспомогательные помещения', fields: [
                                {
                                    label: 'Кухня',
                                    code: 'kitchen',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Кухня-ниша',
                                    code: 'mini-kitchen',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Кухня-столовая',
                                    code: 'kitchen-dining',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Кухня-гостиная',
                                    code: 'living-kitchen',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Холл',
                                    code: 'hall',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Передняя (прихожая)',
                                    code: 'hallway',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Ванная комната',
                                    code: 'bathroom',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Душевая комната',
                                    code: 'shower-room',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Туалетная комната',
                                    code: 'toilet',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Совмещеннй санузел',
                                    code: 'wc1',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Уборная',
                                    code: 'wc',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Кладовая',
                                    code: 'pantry',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Кабинет',
                                    code: 'cabinet',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Библиотека',
                                    code: 'library',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Гардеробная',
                                    code: 'wardrobe',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                }
                            ]
                        },
                        EXTRA_ROOMS: {
                            label: 'Встроенные и примыкающие пом.', fields: [
                                {
                                    label: 'Балкон',
                                    code: 'balcony',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Лоджия',
                                    code: 'loggia',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Веранда',
                                    code: 'veranda',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Терраса',
                                    code: 'terrace',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Эксплуатируемая кровля',
                                    code: 'roof',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                },
                                {
                                    label: 'Эркер',
                                    code: 'oriel',
                                    isOneOff: true,
                                    editable: false,
                                    removable: false,
                                    config: []
                                }
                            ]
                        }
                    }
                },
                'buildingDescription': {
                    label: 'Описание здания', subgroups: {}, fields: [
                        {
                            label: 'Тип здания',
                            code: 'houseType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Класс здания',
                            code: 'houseClass',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Тип индивидуального жилого дома',
                            code: 'houseKind',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Стиль индивидуального жилого дома',
                            code: 'houseStyle',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Календарь готовности дома',
                            code: 'readyDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Выдача ключей до',
                            code: 'keysIssuanceDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Обеспечение обязательств застройщика',
                            code: 'developerObligations',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Материал и тип стен дома',
                            code: 'wallType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Материал и тип перекрытий',
                            code: 'floorType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Материал и тип фундамента',
                            code: 'foundationType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Помещений на этаже',
                            code: 'spacesFloor',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Квартир на этаже',
                            code: 'apartmentsFloor',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Комнат на этаже',
                            code: 'roomsFloor',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Секций на этаже',
                            code: 'sectionsFloor',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Квартир в секции',
                            code: 'apartmentsSection',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Комнат в секции',
                            code: 'roomsSection',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Класс энергоэффективности здания',
                            code: 'energyClassification',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        }
                    ]
                },
                'engineering': {
                    label: 'Инженерия', subgroups: {}, fields: [
                        {
                            label: 'Электроснабжение',
                            code: 'electricity',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Водоснабжение',
                            code: 'water',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Газоснабжение',
                            code: 'gas',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Канализация',
                            code: 'sewerage',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Отопление',
                            code: 'heating',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Вентиляция',
                            code: 'ventilation',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Кондиционирование',
                            code: 'conditioning',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Климат-контроль',
                            code: 'climateControl',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        }
                    ]
                },
                'houseService': {
                    label: 'Сервис в здании', subgroups: {}, fields: [
                        {
                            label: 'Комфорт в здании',
                            code: 'comfort',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Безопасность',
                            code: 'security',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Безбарьерная среда',
                            code: 'peopleDisability',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Парковочное пространство',
                            code: 'parking',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        },
                        {
                            label: 'Обустройство двора',
                            code: 'arrangement',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: []
                        }
                    ]
                },
                'landDescription': {
                    label: 'Описание земельного участка', subgroups: {}, fields: [
                        {
                            label: 'Тип земельного участка',
                            code: 'landType',
                            isOneOff: true,
                            editable: true,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    label: 'Выбор значения',
                                    options: FieldCustomizerService.landTypeOptions
                                },
                                {
                                    type: FieldType.TEXT,
                                    label: 'Текстовое поле',
                                    placeholder: 'Введите тип земельного участка'
                                }
                            ]
                        },
                        {
                            label: 'Кадастровый номер',
                            code: 'landCadastral',
                            isOneOff: true,
                            editable: true,
                            removable: true,
                            config: [
                                {
                                    type: FieldType.TEXT,
                                    label: 'Текстовое поле',
                                    placeholder: 'Введите кадастровый номер'
                                }
                            ]
                        },
                        {
                            label: 'Категория земель',
                            code: 'categoryLand',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    label: 'Выбор значения',
                                    options: FieldCustomizerService.categoryLandOptions
                                },
                                {type: FieldType.TEXT, label: 'Текстовое поле', placeholder: 'Введите категорию земель'}
                            ]
                        },
                        {
                            label: 'Вид разрешенного использования',
                            code: 'usingLand',
                            isOneOff: true,
                            editable: true,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    label: 'Выбор значения',
                                    options: FieldCustomizerService.usingLandOptions
                                },
                                {
                                    type: FieldType.TEXT,
                                    label: 'Текстовое поле',
                                    placeholder: 'Введите вид разрешенного использования'
                                }
                            ]
                        },
                        {
                            label: 'Статус земельного участка',
                            code: 'statusLand',
                            isOneOff: true,
                            editable: true,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    label: 'Выбор значения',
                                    options: FieldCustomizerService.statusLandOptions
                                },
                                {
                                    type: FieldType.TEXT,
                                    label: 'Текстовое поле',
                                    placeholder: 'Введите статус земельного участка'
                                }
                            ]
                        },
                        {
                            label: 'Сообщество', code: 'community', isOneOff: true, editable: true, removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    label: 'Выбор значения',
                                    options: FieldCustomizerService.communityOptions
                                },
                                {
                                    type: FieldType.TEXT,
                                    label: 'Текстовое поле',
                                    placeholder: 'Введите название сообщества'
                                }
                            ]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: true,
                            config: []
                        }
                    ]
                },
            }
        },
        GEOLOCATION: {label: 'Геолокация', groups: {}},
    }


    constructor() { }

    public getAllFields(): Sections{
        return FieldCustomizerService.DEAL_FIELDS;
    }
}




