import { Injectable } from '@angular/core';
import {SelectedField} from "../component/viewElements/field-customizer-view/field-customizer-view.component";

export enum FieldType {
    TEXT,
    AUTO,
    NUMBER,
    INLINE_CHOICE,
    CHOICE,
    MULTI_CHOICE,
    DATE,
    SEARCH,
    TAGS,
    DEPENDED_CHOICE,
    TEXTAREA,
    RANGE
}

interface Config {
    type: FieldType
}

export interface ChoiceConfig extends Config {
    type: FieldType.CHOICE,
    options: any[],
    group?: boolean
}

export interface InlineChoiceConfig extends Config {
    type: FieldType.INLINE_CHOICE,
    placeholder: string
    options: any[],
    postfix?: string | Function;
}

export interface MultiChoiceConfig extends Config {
    type: FieldType.MULTI_CHOICE,
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
    options: { [key: string]: any[] },
    group?: boolean,
    editable?: boolean
}

export interface RangeConfig extends Config {
    type: FieldType.RANGE,
    placeholder: string
}

export type FieldConfig = ChoiceConfig | InlineChoiceConfig | TextConfig | DateConfig | SearchConfig | TagsConfig | DependedChoiceConfig
    | TextareaConfig | RangeConfig | NumberConfig | AutoConfig | MultiChoiceConfig;

export type Field = {
    label: string | any;
    code: string;
    isOneOff: boolean;
    editable: boolean;
    config: FieldConfig[];
    removable: boolean;
}

export type FieldGroup = {
    label: string;
    fields: Field[];
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

    public static readonly objectTypeHash = {
        PART_APARTMENT: { label: 'Часть квартиры'},
        PART_HOUSE: { label: 'Часть жилого дома'},
        ROOM: { label:  'Комната'},
        FLAT: { label: 'Квартира'},
        HOUSE: { label: 'Индивидуальный жилой дом'},

        APARTMENT: { label: 'Апартаменты'},
        PARKING_PLACE: { label: 'Машиноместо'},
        OFFICE: { label: 'Офисное помещение'},
        STOREHOUSE: { label: 'Кладовка'},
        STORAGE: { label: 'Склад'},
        RETAIL_SPACE: { label: 'Торговый зал'},
        FREE_SPACE: { label: 'Помещение свободного назначения'},
        PAVILION: { label: 'Павильон'},
        WORK_PLACE: { label: 'Рабочий участок'},
        GILD: { label: 'Цех'},

        GARDEN_LAND: { label: 'Садовый земельный участок'},
        VEGETABLE_LAND: { label: 'Огородный земельный участок'},
        FIELD_LAND: { label: 'Полевой земельный участок'},
        HOMESTEAD_LAND: { label: 'Приусадебный земельный участок'},
        HOME_LAND: { label: 'Придомовой земельный участок'}
    };

    public static readonly objectTypes = [
        {label: 'Жилая недвижимость', value: "LIVING", items: [
                {label: FieldCustomizerService.objectTypeHash.ROOM.label, code: 'ROOM'},
                {label: FieldCustomizerService.objectTypeHash.FLAT.label, code: 'FLAT'},
                {label: FieldCustomizerService.objectTypeHash.HOUSE.label, code: 'HOUSE'},
                {label: FieldCustomizerService.objectTypeHash.PART_APARTMENT.label, code: 'PART_APARTMENT'},
                {label: FieldCustomizerService.objectTypeHash.PART_HOUSE.label, code: 'PART_HOUSE'}
            ]},
        {label: 'Коммерческая недвижимость',  value: "COMMERCIAL", items: [
                {label: FieldCustomizerService.objectTypeHash.APARTMENT.label, code: 'APARTMENT'},
                {label: FieldCustomizerService.objectTypeHash.PARKING_PLACE.label, code: 'PARKING_PLACE'},
                {label: FieldCustomizerService.objectTypeHash.OFFICE.label, code: 'OFFICE'},
                {label: FieldCustomizerService.objectTypeHash.STOREHOUSE.label, code: 'STOREHOUSE'},
                {label: FieldCustomizerService.objectTypeHash.STORAGE.label, code: 'STORAGE'},
                {label: FieldCustomizerService.objectTypeHash.RETAIL_SPACE.label, code: 'RETAIL_SPACE'},
                {label: FieldCustomizerService.objectTypeHash.FREE_SPACE.label, code: 'FREE_SPACE'},
                {label: FieldCustomizerService.objectTypeHash.PAVILION.label, code: 'PAVILION'},
                {label: FieldCustomizerService.objectTypeHash.WORK_PLACE.label, code: 'WORK_PLACE'},
                {label: FieldCustomizerService.objectTypeHash.GILD.label, code: 'GILD'}
            ]},
        {label: 'Земельный участок', value: "LAND", items: [
                {label: FieldCustomizerService.objectTypeHash.GARDEN_LAND.label, code: 'GARDEN_LAND'},
                {label: FieldCustomizerService.objectTypeHash.VEGETABLE_LAND.label, code: 'VEGETABLE_LAND'},
                {label: FieldCustomizerService.objectTypeHash.FIELD_LAND.label, code: 'FIELD_LAND'},
                {label: FieldCustomizerService.objectTypeHash.HOMESTEAD_LAND.label, code: 'HOMESTEAD_LAND'},
                {label: FieldCustomizerService.objectTypeHash.HOME_LAND.label, code: 'HOME_LAND'}
            ]},
    ];

    public static readonly planningHash = {
        TWO_LEVEL: {label: 'Двухуровневая планировка'},
        MEZZANINE_FLOOR: {label: 'Антресольный этаж'},
        FREE: {label: 'Свободной планировки'},
        ISOLATED: {label: 'Изолированные комнаты'},
        ADJOINING: {label: 'Смежные комнаты'},
        ADJOINING_ISOLATED: {label: 'Смежно-изолированные комнаты'},
        TYPICAL: {label: 'Типовая'},
        REPLANNED: {label: 'Перепланированная'},

        CENTRIC: {label: 'Центрическая'},
        CORRIDOR: {label: 'Коридорная'},
        ENFILADE: {label: 'Анфиладная'},
        LAYERED: {label: 'Многоуровневая'},
        GALLERY: {label: 'Галерейная'},
        AMERICAN_SCHEME: {label: 'Американская схема'},
        HALL_SCHEME: {label: 'Зальная схема'},
        SECTIONAL: {label: 'Секционная'},
        MIXED: {label: 'Смешанная'},

        CLOSED: {label: 'Закрытая'},
        OPEN_SPACE: {label: 'Открытая'},
        COWORKING: {label: 'Коворкинг'}
    };

    public static readonly plannings = {
        ROOM: [],
        FLAT: [
            {label: FieldCustomizerService.planningHash.TWO_LEVEL.label, code: 'TWO_LEVEL'},
            {label: FieldCustomizerService.planningHash.MEZZANINE_FLOOR.label, code: 'MEZZANINE_FLOOR'},
            {label: FieldCustomizerService.planningHash.FREE.label, code: 'FREE'},
            {label: FieldCustomizerService.planningHash.ISOLATED.label, code: 'ISOLATED'},
            {label: FieldCustomizerService.planningHash.ADJOINING.label, code: 'ADJOINING'},
            {label: FieldCustomizerService.planningHash.ADJOINING_ISOLATED.label, code: 'ADJOINING_ISOLATED'},
            {label: FieldCustomizerService.planningHash.TYPICAL.label, code: 'TYPICAL'},
            {label: FieldCustomizerService.planningHash.REPLANNED.label, code: 'REPLANNED'}
        ],
        APARTMENT: [
            {label: FieldCustomizerService.planningHash.TWO_LEVEL.label, code: 'TWO_LEVEL'},
            {label: FieldCustomizerService.planningHash.MEZZANINE_FLOOR.label, code: 'MEZZANINE_FLOOR'},
            {label: FieldCustomizerService.planningHash.FREE.label, code: 'FREE'},
            {label: FieldCustomizerService.planningHash.ISOLATED.label, code: 'ISOLATED'},
            {label: FieldCustomizerService.planningHash.ADJOINING.label, code: 'ADJOINING'},
            {label: FieldCustomizerService.planningHash.ADJOINING_ISOLATED.label, code: 'ADJOINING_ISOLATED'},
            {label: FieldCustomizerService.planningHash.TYPICAL.label, code: 'TYPICAL'},
            {label: FieldCustomizerService.planningHash.REPLANNED.label, code: 'REPLANNED'}
        ],
        HOUSE: [
            {label: FieldCustomizerService.planningHash.FREE.label, code: 'FREE'},
            {label: FieldCustomizerService.planningHash.CENTRIC.label, code: 'CENTRIC'},
            {label: FieldCustomizerService.planningHash.CORRIDOR.label, code: 'CORRIDOR'},
            {label: FieldCustomizerService.planningHash.ENFILADE.label, code: 'ENFILADE'},
            {label: FieldCustomizerService.planningHash.LAYERED.label, code: 'LAYERED'},
            {label: FieldCustomizerService.planningHash.GALLERY.label, code: 'GALLERY'},
            {label: FieldCustomizerService.planningHash.AMERICAN_SCHEME.label, code: 'AMERICAN_SCHEME'},
            {label: FieldCustomizerService.planningHash.HALL_SCHEME.label, code: 'HALL_SCHEME'},
            {label: FieldCustomizerService.planningHash.SECTIONAL.label, code: 'SECTIONAL'},
            {label: FieldCustomizerService.planningHash.MIXED.label, code: 'MIXED'},
        ],
        OFFICE: [
            {label: FieldCustomizerService.planningHash.TWO_LEVEL.label, code: 'TWO_LEVEL'},
            {label: FieldCustomizerService.planningHash.MEZZANINE_FLOOR.label, code: 'MEZZANINE_FLOOR'},
            {label: FieldCustomizerService.planningHash.CLOSED.label, code: 'CLOSED'},
            {label: FieldCustomizerService.planningHash.OPEN_SPACE.label, code: 'OPEN_SPACE'},
            {label: FieldCustomizerService.planningHash.MIXED.label, code: 'MIXED'},
            {label: FieldCustomizerService.planningHash.COWORKING.label, code: 'COWORKING'},
        ],
        PART_APARTMENT: [],
        PART_HOUSE: [],
        PARKING_PLACE: [],
        STOREHOUSE: [],
        STORAGE: [],
        RETAIL_SPACE: [],
        FREE_SPACE: [],
        PAVILION: [],
        WORK_PLACE: [],
        GILD: [],
        GARDEN_LAND: [],
        VEGETABLE_LAND: [],
        FIELD_LAND: [],
        HOMESTEAD_LAND: [],
        HOME_LAND: []
    };

    public static readonly roomCountArray = [
        {label: 'Студия', code: 0},
        {label: '1', code: 1},
        {label: '2', code: 2},
        {label: '3', code: 3},
        {label: '4', code: 4},
        {label: '5', code: 5},
        {label: '6', code: 6}
    ]

    public static readonly decorationHash = {
        ROUGH: {label: 'Черновая отделка'},
        PREFINE: {label: 'Предчистовая отделка'},
        FINE: {label: 'Чистовая отделка'},
        TURNKEY: {label: 'Отделка "Под ключ"'},
        DESIGNER: {label: 'Дизайнерский проект'},
        REQUIRE_COSMETIC: {label: 'Требуется косметический ремонт'},
        REQUIRE_MAJOR_OVERHAUL: {label: 'Требуется капитальный ремонт'}
    };

    public static readonly decorations = [
        {label: FieldCustomizerService.decorationHash.ROUGH.label, code: 'ROUGH'},
        {label: FieldCustomizerService.decorationHash.PREFINE.label, code: 'PREFINE'},
        {label: FieldCustomizerService.decorationHash.FINE.label, code: 'FINE'},
        {label: FieldCustomizerService.decorationHash.TURNKEY.label, code: 'TURNKEY'},
        {label: FieldCustomizerService.decorationHash.DESIGNER.label, code: 'DESIGNER'},
        {label: FieldCustomizerService.decorationHash.REQUIRE_COSMETIC.label, code: 'REQUIRE_COSMETIC'},
        {label: FieldCustomizerService.decorationHash.REQUIRE_MAJOR_OVERHAUL.label, code: 'REQUIRE_MAJOR_OVERHAUL'}
    ];

    public static readonly houseTypeHash = {
        COTTAGE: {label: 'Коттедж'},
        MANOR: {label: 'Усадьба'},
        GARDEN_HOUSE: {label: 'Садовый дом'},
        LOW_RISE_HOUSE: {label: 'Малоэтажный жилой дом'},
        MID_RISE_HOUSE: {label: 'Среднеэтажный жилой дом'},
        HIGH_RISE_HOUSE: {label: 'Многоэтажный жилой дом'},
        TOWNHOUSE: {label: 'Таунхаус'},
        DUPLEX: {label: 'Дуплекс'},

        MULTIFUNCTIONAL_BUILDING: {label: 'Многофункциональный комплекс'},
        OFFICE_BUILDING: {label: 'Офисное здание'},
        MALL: {label: 'Торговый центр'},
        BUSINESS_CENTER: {label: 'Бизнес центр'},
        WAREHOUSE_COMPLEX: {label: 'Складской комплекс'},
        INDUSTRIAL_BUILDING: {label: 'Промышленное здание'},
    }

    public static readonly houseType = [
        {label: 'Индивидуальные жилые дома', value: "INDIVIDUAL_HOUSE", items: [
                {label: FieldCustomizerService.houseTypeHash.COTTAGE.label, code: 'COTTAGE'},
                {label: FieldCustomizerService.houseTypeHash.MANOR.label, code: 'MANOR'},
                {label: FieldCustomizerService.houseTypeHash.GARDEN_HOUSE.label, code: 'GARDEN_HOUSE'}
            ]},
        {label: 'Многоквартирные жилые дома', value: "MULTISTORE_HOUSE", items: [
                {label: FieldCustomizerService.houseTypeHash.LOW_RISE_HOUSE.label, code: 'LOW_RISE_HOUSE'},
                {label: FieldCustomizerService.houseTypeHash.MID_RISE_HOUSE.label, code: 'MID_RISE_HOUSE'},
                {label: FieldCustomizerService.houseTypeHash.HIGH_RISE_HOUSE.label, code: 'HIGH_RISE_HOUSE'}
            ]},
        {label: 'Дома блокированной застройки', value: "BLOCKED_HOUSE", items: [
                {label: FieldCustomizerService.houseTypeHash.TOWNHOUSE.label, code: 'TOWNHOUSE'},
                {label: FieldCustomizerService.houseTypeHash.DUPLEX.label, code: 'DUPLEX'}
            ]},
        {label: 'Общественные здания', value: "PUBLIC_BUILDINGS", items: [
                {label: FieldCustomizerService.houseTypeHash.MULTIFUNCTIONAL_BUILDING.label, code: 'MULTIFUNCTIONAL_BUILDING'},
                {label: FieldCustomizerService.houseTypeHash.OFFICE_BUILDING.label, code: 'OFFICE_BUILDING'},
                {label: FieldCustomizerService.houseTypeHash.MALL.label, code: 'MALL'},
                {label: FieldCustomizerService.houseTypeHash.BUSINESS_CENTER.label, code: 'BUSINESS_CENTER'},
            ]},
        {label: 'Производственные здания', value: "MANUFACTURE_BUILDINGS", items: [
                {label: FieldCustomizerService.houseTypeHash.WAREHOUSE_COMPLEX.label, code: 'WAREHOUSE_COMPLEX'},
                {label: FieldCustomizerService.houseTypeHash.INDUSTRIAL_BUILDING.label, code: 'INDUSTRIAL_BUILDING'},
            ]},
    ];

    public static readonly yesNo = [
        {label: 'Да', code: true},
        {label: 'Нет', code: false}
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
            label: 'Общая', groups: {
                DEAL:
                    {
                        label: 'Сделка', fields: [
                            {
                                label: 'Дата создания сделки',
                                code: 'createDate',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config:
                                    [{type: FieldType.DATE, placeholder: '01 декабря 2021'}]
                            },
                            {
                                label: 'Тип сделки',
                                code: 'type',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{type: FieldType.CHOICE, options: FieldCustomizerService.dealTypeArray}]
                            },
                            {
                                label: 'Сделка',
                                code: 'deal',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [
                                    {
                                        type: FieldType.CHOICE, options: FieldCustomizerService.dealArray
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
                                    {type: FieldType.TEXT, placeholder: 'Парсер' }
                                ]
                            },
                            {
                                label: 'Заголовок сделки',
                                code: 'heading',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{type: FieldType.TEXT, placeholder: 'Введите заголовок сделки'}]
                            },
                            {
                                label: 'Описание сделки',
                                code: 'description',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{type: FieldType.TEXT, placeholder: 'Введите описание сделки'},]
                            },
                            {
                                label: 'Комплектация объекта',
                                code: 'equipment',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{type: FieldType.TEXT, placeholder: 'Введите комплектацию объекта'}]
                            },
                            {
                                label: 'Квалификация',
                                code: 'qualification',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{ type: FieldType.CHOICE, options: FieldCustomizerService.qualificationArray }]
                            },
                            {
                                label: 'Стадия / Статус',
                                code: 'stageStatus',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{ type: FieldType.DEPENDED_CHOICE, options: FieldCustomizerService.stageOptions, dependedField: 'deal', group: true }]
                            },
                            {
                                label: 'Теги',
                                code: 'tags',
                                isOneOff: true,
                                editable: false,
                                removable: false,
                                config: [{ type: FieldType.TAGS}]
                            },
                            {
                                label: 'Дополнительно',
                                code: 'additional',
                                isOneOff: true,
                                editable: false,
                                removable: true,
                                config: [{type: FieldType.TEXTAREA, placeholder: 'Введите дополнительное описание'}]
                            }
                        ]
                    },
                ACTIVITY: {
                    label: 'Активность', fields: [
                        {
                            label: 'Старт активности',
                            code: 'activityStart',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.DATE, placeholder: 'Выберите дату старта активности'},
                                {type: FieldType.CHOICE, options: FieldCustomizerService.qualificationArray},
                            ]
                        },
                        {
                            label: 'Последнее изменение',
                            code: 'changeDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последний контакт',
                            code: 'lastContact',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя активность',
                            code: 'lastActivityDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующая активность',
                            code: 'nextActivityDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя презентация',
                            code: 'lastPresentationDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующай презентация',
                            code: 'nextPresentationDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя маркетинговая компания',
                            code: 'lastMarketingDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующая маркетинговая компания',
                            code: 'nextMarketingDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Последняя рекламная компания',
                            code: 'lastAdvDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующая рекламная компания',
                            code: 'nextAdvDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.AUTO, placeholder: '01 декабря 2021'}]
                        },
                        {
                            label: 'Следующий шаг',
                            code: 'nextStep',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.AUTO, placeholder: '01 декабря 2021'},
                                {type: FieldType.TEXT, placeholder: 'Введите заголовок сделки'}
                            ]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additionally',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXTAREA, placeholder: 'Введите дополнительное описание'}]
                        },
                    ]
                },
                PRISING:{
                    label: 'Ценообразование', fields: [
                        {
                            label: 'Предварительная сумма сделки',
                            code: 'previsionalAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите предварительную сумму сделки'}]
                        },
                        {
                            label: 'Взвешенная сумма сделки',
                            code: 'weightedAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите взвешанную сумму сделки'}]
                        },
                        {
                            label: 'Утвержденная сумма сделки',
                            code: 'approvedAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите скорректированную сумму сделки'}]
                        },
                        {
                            label: 'Фактическая сумма сделки',
                            code: 'factAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите фактическую сумму сделки'}]
                        },
                        {
                            label: 'Кадастровая стоимость',
                            code: 'cadastralCost',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите кадастровою стоимость'}]
                        },
                        {
                            label: 'Оценочная стоимость',
                            code: 'estimatedAmount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите оценочную стоимость'}]
                        },
                        {
                            label: 'Дополнительные платежи',
                            code: 'additionalPayments',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXTAREA, placeholder: 'Введите дополнительные платежи'}]
                        },
                        {
                            label: 'Комиссия',
                            code: 'commission',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите сумму комиссии'}]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'descriptionPrising',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXTAREA, placeholder: 'Введите дополнительное описание'}]
                        }
                    ]
                }
            }
        },
        OBJECT: {
            label: 'Объект', groups: {
                'mainDescription': {
                    label: 'Общее описание', fields: [
                        {
                            label: 'Объект сделки',
                            code: 'objectType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.CHOICE, options: FieldCustomizerService.objectTypes, group: true}]
                        },
                        {
                            label: 'Количество комнат',
                            code: 'roomsCount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.INLINE_CHOICE,
                                    placeholder: 'Введите количество комнат',
                                    options: FieldCustomizerService.roomCountArray,
                                    postfix: (value: any) => value == 0 ? '' : "- комнатная(ый)"
                                }
                            ]
                        },
                        {
                            label: 'Описание помещений',
                            code: 'roomsDescription',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.NUMBER, placeholder: 'Введите описание помещений'}]
                        },
                        {
                            label: 'Планировка помещений',
                            code: 'planning',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.DEPENDED_CHOICE, options: FieldCustomizerService.plannings, dependedField: 'objectType', editable: true},
                                {type: FieldType.TEXT, placeholder: 'Введите планировочное решение'}
                            ]
                        },
                        {
                            label: 'Отделка помещений',
                            code: 'decoration',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {type: FieldType.CHOICE, options: FieldCustomizerService.decorations},
                                {type: FieldType.MULTI_CHOICE, options: FieldCustomizerService.decorations},
                            ]
                        },
                        {
                            label: 'Площадь',
                            code: 'squareRoom',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите площадь помещения'}]
                        },
                        {
                            label: 'Этаж объекта сделки',
                            code: 'floor',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите этаж объекта'}]
                        },
                        {
                            label: 'Санузел',
                            code: 'bathroomObject',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите планировочное решение'}]
                        },
                        {
                            label: 'Встроенные и примыкающи помещения',
                            code: 'extraRooms',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите планировочное решение'}]
                        },
                        {
                            label: 'Высота потолка',
                            code: 'ceilingHeight',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите планировочное решение'}]
                        },
                        {
                            label: 'Окна',
                            code: 'windows',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите планировочное решение'}]
                        },
                        {
                            label: 'Кадастровый номер',
                            code: 'cadastralNumber',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите планировочное решение'}]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [{type: FieldType.TEXT, placeholder: 'Введите планировочное решение'}]
                        }
                    ]
                },
                'buildingDescription': {
                    label: 'Описание здания', fields: [
                        {
                            label: 'Тип дома',
                            code: 'houseType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: FieldCustomizerService.houseType,
                                    group: true
                                }
                            ]
                        },
                        {
                            label: 'Статус здания',
                            code: 'houseStatus',
                            isOneOff: true,
                            editable: true,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Название здания, жилого комплекса',
                            code: 'houseName',
                            isOneOff: true,
                            editable: true,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.TEXT,
                                    placeholder: 'Введите название здания/жилого комплекс'
                                }
                            ]
                        },
                        {
                            label: 'Класс энергоэффективности здания',
                            code: 'energyClassification',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Класс недвижимости',
                            code: 'houseClass',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Календарь готовности дома',
                            code: 'readyDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.DATE, placeholder: 'Выберите дату'
                                }
                            ]
                        },
                        {
                            label: 'Выдача ключей до',
                            code: 'keysDate',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.DATE, placeholder: 'Выберите дату'
                                }
                            ]
                        },
                        {
                            label: 'Обеспечение обязательств застройщика',
                            code: 'developerEnsuring',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.TEXT,
                                    placeholder: 'Введите класс недвижимости'
                                }
                            ]
                        },
                        {
                            label: 'Архитектурный стиль',
                            code: 'houseStyle',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Этажность здания',
                            code: 'totalFloors',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.NUMBER,
                                    placeholder: 'Введите количество этажей'
                                }
                            ]
                        },
                        {
                            label: 'Описание этажей',
                            code: 'floorsDescription',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.TEXTAREA,
                                    placeholder: 'Введите описание этажей'
                                }
                            ]
                        },
                        {
                            label: 'Количество подъездов',
                            code: 'entrancesCount',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.NUMBER,
                                    placeholder: 'Введите количество подъездов'
                                }
                            ]
                        },
                        {
                            label: 'Количество квартир в доме',
                            code: 'apartmentsInHouse',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.NUMBER,
                                    placeholder: 'Введите количество квартир в доме'
                                }
                            ]
                        },
                        {
                            label: 'Среднее количество квартир на этаже',
                            code: 'roomsInFloor',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.NUMBER,
                                    placeholder: 'Введите количество квартир на этаже'
                                }
                            ]
                        },
                        {
                            label: 'Материал и тип стен дома',
                            code: 'wallType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Материал и тип перекрытий',
                            code: 'floorType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Тип фундамента',
                            code: 'foundationType',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Комфорт в здании',
                            code: 'comfort',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Безопасность',
                            code: 'security',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Безбарьерная среда',
                            code: 'peopleDisability',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Обустройство двора',
                            code: 'arrangement',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.TEXTAREA,
                                    placeholder: "Введите дополнительное описание"
                                }
                            ]
                        }
                    ]
                },
                'landDescription': {
                    label: 'Описание земельного участка', fields: [
                        {
                            label: 'Тип земельного участка',
                            code: 'landType',
                            isOneOff: true,
                            editable: true,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: FieldCustomizerService.landTypeOptions
                                },
                                {
                                    type: FieldType.TEXT,
                                    placeholder: 'Введите тип земельного участка'
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
                                    options: FieldCustomizerService.categoryLandOptions
                                },
                                {type: FieldType.TEXT, placeholder: 'Введите категорию земель'}
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
                                    options: FieldCustomizerService.usingLandOptions
                                },
                                {
                                    type: FieldType.TEXT,
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
                                    options: FieldCustomizerService.statusLandOptions
                                },
                                {
                                    type: FieldType.TEXT,
                                    placeholder: 'Введите статус земельного участка'
                                }
                            ]
                        },
                        {
                            label: 'Сообщество', code: 'community', isOneOff: true, editable: true, removable: false,
                            config: [
                                {
                                    type: FieldType.TEXT,
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
                            config: [
                                {
                                    type: FieldType.TEXTAREA,
                                    placeholder: "Введите дополнительное описание"
                                }
                            ]
                        }
                    ]
                },
                'engineering': {
                    label: 'Инженерия', fields: [
                        {
                            label: 'Электроснабжение',
                            code: 'electricity',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                },
                            ]
                        },
                        {
                            label: 'Водоснабжение',
                            code: 'water',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Газоснабжение',
                            code: 'gas',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Канализация',
                            code: 'sewerage',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Отопление',
                            code: 'heating',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Вентиляция',
                            code: 'ventilation',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Кондиционирование',
                            code: 'conditioning',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Климат-контроль',
                            code: 'climateControl',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.CHOICE,
                                    options: []
                                }
                            ]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: false,
                            config: [
                                {
                                    type: FieldType.TEXTAREA,
                                    placeholder: "Введите дополнительное описание"
                                }
                            ]
                        }
                    ]
                }
            }
        },
        GEOLOCATION: {label: 'Геолокация', groups: {
                'location': { label: 'Местоположение', fields: [
                        {
                            label: 'Описание поиска',
                            code: 'searchDescription',
                            isOneOff: true,
                            editable: false,
                            removable: true,
                            config: [
                                {
                                    type: FieldType.TEXTAREA,
                                    placeholder: "Введите описание поиска"
                                }
                            ]
                        },
                        {
                            label: 'Дополнительно',
                            code: 'additional',
                            isOneOff: true,
                            editable: false,
                            removable: true,
                            config: [
                                {
                                    type: FieldType.TEXTAREA,
                                    placeholder: "Введите дополнительное описание"
                                }
                            ]
                        }
                    ]
                }
            }
        },
    }

    private template: SelectedField;

    public getTemplate(): SelectedField{
        return this.template;
    }

    constructor() {
        this.template = {};
        for(let section in FieldCustomizerService.DEAL_FIELDS){
            this.template[section] = {};
            for(let group in FieldCustomizerService.DEAL_FIELDS[section].groups){
                this.template[section][group] = [...FieldCustomizerService.DEAL_FIELDS[section].groups[group].fields];
            }
        }
    }

    public getAllFields(): Sections{
        return FieldCustomizerService.DEAL_FIELDS;
    }
}




