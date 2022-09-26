import { Confirmation, IStageCode } from '../../../models/entity/contact';
import { AddressBlock } from '../address-block';

export class Deal {
    id?: string;
    accountId?: string;
    addDate: Date;
    changeDate?: Date;
    closeDate?: Date;
    readyDate?: Date;
    sources: any;
    responsible: any;
    stage: keyof typeof Deal.stageOptions;
    type: keyof typeof Deal.typeOptions;
    propertyType: keyof typeof Deal.propertyTypeOptions;
    residentialСomplex: string;
    houseTypes: string[];
    objectType: keyof typeof Deal.objectTypeOptions;
    propertyRight: keyof typeof Deal.propertyRightOptions;
    propertyStatuses: any[];
    cadastralNumber?: string;
    encumbrance: string;
    titleDeeds: string;
    addressBlock: AddressBlock;
    address: string;
    apartment: string | null;
    entrance: string | null;
    floor: string | null;
    constructionStage: string;
    tag: string[];
    description: string;
    location: any;
    permittedUses: string[];
    heading: string;
    qualification: keyof typeof Deal.qualificationOptions;

    constructor() {
        this.tag = [];
        this.addDate = new Date();
        this.addressBlock = new AddressBlock();
        this.description = '';
        this.stage = 'CLIENT_POTENTIAL';
        // this.state = 'ATTRACTED';
        this.type = 'PURCHASE';
        this.propertyType = 'LIVING';
        this.residentialСomplex = '';
        this.cadastralNumber = ''
        this.objectType = 'FLAT';
        this.houseTypes = ['APARTMENT'];
        this.propertyStatuses = [];
        this.constructionStage = 'COMPLETED';
        this.propertyRight = 'INDIVIDUAL';
        this.sources = {};
        this.responsible = [];
        this.encumbrance = '';
        this.titleDeeds = '';
        this.permittedUses = [];
        this.heading = '';
        this.location = {lat: null, lon: null};
        this.qualification = 'NOT';
        this.address = '';
        this.apartment = null;
        this.floor = null;
        this.entrance = null;
    }

    public static stateOptions = {
        ATTRACTED: 'Привлеченные',
        IN_PROGRESS: 'В работе',
        SUSPENDED: 'Приостановлено',
        ARCHIVE: 'Архив'
    };

    public static stageOptions = {
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
//     ПРИОСТАНОВЛЕННО                                         Восстановить
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


    public static typeOptions = {
        PURCHASE: { label: 'Покупка', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.CLIENT_POTENTIAL.label, code: "CLIENT_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.SELECTION_CHOICES.label, code: "SELECTION_CHOICES"},
                        {label: Deal.stageOptions.CLIENT_AGREE_BUY.label, code: "CLIENT_AGREE_BUY"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        SALE: { label: 'Продажа', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: Deal.stageOptions.FOUND_CUSTOMER.label, code: "FOUND_CUSTOMER"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        ALTERNATIVE: { label: 'Альтернатива', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: Deal.stageOptions.FOUND_CUSTOMER.label, code: "FOUND_CUSTOMER"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        LEASE: { label: 'Аренда сдать', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: Deal.stageOptions.FOUND_TENANT.label, code: "FOUND_TENANT"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        RENT: { label: 'Аренда снять', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.CLIENT_POTENTIAL.label, code: "CLIENT_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.SELECTION_CHOICES.label, code: "SELECTION_CHOICES"},
                        {label: Deal.stageOptions.CLIENT_AGREE_RENT.label, code: "CLIENT_AGREE_RENT"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "Восстановить",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]}
    };

    public static typeArray = [
        {label: Deal.typeOptions.PURCHASE.label, code: 'PURCHASE'},
        {label: Deal.typeOptions.SALE.label, code: 'SALE'},
        {label: Deal.typeOptions.ALTERNATIVE.label, code: 'ALTERNATIVE'},
        {label: Deal.typeOptions.LEASE.label, code: 'LEASE'},
        {label: Deal.typeOptions.RENT.label, code: 'RENT'}
    ];

    public static propertyStatusOptions = {
        NEW: {label: 'Первичная недвижимость'},
        OLD: {label: 'Вторичная недвижимость'},
        UNFINISHED: {label: 'Объект незавершенного стр-ва'},
        ACCOUNTED: {label: 'Учтенный' },
        PREVIOUSLY: {label: 'Ранее учтенный' },
        ARCHIVED: {label: 'Архивный' }
    };

    public static houseTypeOptions = {
        INDIVIDUAL_BUILDING: {label: 'Индивидуальный жилой дом'},
        GARDEN_BUILDING: {label: 'Садовый дом'},
        BARRACK: {label: 'Барак'},
        TOWNHOUSE: {label: 'Таунхаус'},
        DUPLEX: {label: 'Дуплекс'},
        FLAT: {label: 'Квартира'},
        APARTMENT: {label: 'Жилой многоквартирный дом', longLabel: 'Многоквартирный дом'},
        SMALL_FAMILY: {label: 'Жилой дом малосемейного типа', longLabel: 'Малосемейный дом'},
        GOSTINKA: {label: 'Жилой дом гостиничного типа', longLabel: 'Гостиничный дом'},
        DORMITORY: {label: 'Общежитие'},

        APART_HOTEL: {label: 'Апарт-Отель'},
        LIVING_HOUSE: {label: 'Жилой дом'},
        MOLL: {label: 'Торгово-развлекательный центр'},
        SHOPPING_CENTER: {label: 'Торговый центр'},
        BUSINESS_CENTER: {label: 'Бизнес центр'},
        OFFICE_BUILDING: {label: 'Офисное здание'},
        MULTIFUNCTIONAL_CENTER: {label: 'Многофункциональный центр'},
        WAREHOUSE: {label: 'Складской комплекс'},
        PRODUCTION_BUILDING: {label: 'Производственное здание'},

        AGRICULTURAL_LANDS: {label: 'Земли сельхозназначения'},
        SETTLEMENT_LANDS: {label: 'Земли населенных пунктов'},
        INDUSTRY_LANDS: {label: 'Земли промышленности'}

    };

    public static objectTypeOptions = {
        PART_APARTMENT: { label: 'Часть квартиры'},
        PART_HOUSE: { label: 'Часть индивидуального жилого дома'},
        ROOM: { label:  'Комната'},
        FLAT: { label: 'Квартира'},
        HOUSE: { label: 'Индивидульный жилой дом'},
        GARDEN_HOUSE: { label: 'Садовый дом'},
        STUDIO: { label: 'Студия'},

        APARTMENT: { label: 'Апартаменты'},
        PARKING_PLACE: { label: 'Машиноместо'},
        OFFICE: { label: 'Офис'},
        STOREHOUSE: { label: 'Кладовка'},
        STORAGE: { label: 'Склад'},
        RETAIL_SPACE: { label: 'Торговое помещение'},
        FREE_SPACE: { label: 'Помещение свободного назначения'},

        PAVILION: { label: 'Павильон'},
        WORK_PLACE: { label: 'Рабочий участок'},
        GILD: { label: 'Цех'},

        GARDEN_LAND: { label: 'Садовый земельный участок'},
        VEGETABLE_LAND: { label: 'Огородный земельный участок'},
        FIELD_LAND: { label: 'Полевой земельный участок'},
        HOMESTEAD_LAND: { label: 'Приусадебный земельный участок'},
        INDUSTRIAL_SITE: { label: 'Участок промназначения'}
    };

    public static propertyTypeOptions = {
        LIVING: {label: 'Жилая недвижимость', objectTypes: [
                {label: Deal.objectTypeOptions.ROOM.label, code: 'ROOM', houseTypes: [
                        {label: Deal.houseTypeOptions.FLAT.label, code: 'FLAT'},
                        {label: Deal.houseTypeOptions.SMALL_FAMILY.label, code: 'SMALL_FAMILY'},
                        {label: Deal.houseTypeOptions.GOSTINKA.label, code: 'GOSTINKA'},
                        {label: Deal.houseTypeOptions.DORMITORY.label, code: 'DORMITORY'},
                        {label: Deal.houseTypeOptions.TOWNHOUSE.label, code: 'TOWNHOUSE'},
                        {label: Deal.houseTypeOptions.DUPLEX.label, code: 'DUPLEX'},
                        {label: Deal.houseTypeOptions.BARRACK.label, code: 'BARRACK'},
                        {label: Deal.houseTypeOptions.INDIVIDUAL_BUILDING.label, code: 'INDIVIDUAL_BUILDING'},
                        {label: Deal.houseTypeOptions.GARDEN_BUILDING.label, code: 'GARDEN_BUILDING'},
                    ]},
                {label: Deal.objectTypeOptions.FLAT.label, code: 'FLAT'},
                {label: Deal.objectTypeOptions.APARTMENT.label, code: 'APARTMENT'},
                {label: Deal.objectTypeOptions.GARDEN_HOUSE.label, code: 'GARDEN_HOUSE', houseTypes: []},
                {label: Deal.objectTypeOptions.HOUSE.label, code: 'HOUSE', houseTypes: []},
                {label: Deal.objectTypeOptions.PART_APARTMENT.label, code: 'PART_APARTMENT'},
                {label: Deal.objectTypeOptions.PART_HOUSE.label, code: 'PART_HOUSE', houseTypes: []},
            ], houseTypes: [
                {label: Deal.houseTypeOptions.APARTMENT.label, code: 'APARTMENT'},
                {label: Deal.houseTypeOptions.SMALL_FAMILY.label, code: 'SMALL_FAMILY'},
                {label: Deal.houseTypeOptions.GOSTINKA.label, code: 'GOSTINKA'},
                {label: Deal.houseTypeOptions.DORMITORY.label, code: 'DORMITORY'},
                {label: Deal.houseTypeOptions.TOWNHOUSE.label, code: 'TOWNHOUSE'},
                {label: Deal.houseTypeOptions.DUPLEX.label, code: 'DUPLEX'},
                {label: Deal.houseTypeOptions.BARRACK.label, code: 'BARRACK'}
            ], propertyStatuses: [
                {label: Deal.propertyStatusOptions.NEW.label, code: 'NEW'},
                {label: Deal.propertyStatusOptions.OLD.label, code: 'OLD'},
                {label: Deal.propertyStatusOptions.UNFINISHED.label, code: 'UNFINISHED'}
            ]
        },
        COMMERCIAL: {label: 'Коммерческая недвижимость', objectTypes: [
                {label: Deal.objectTypeOptions.APARTMENT.label, code: 'APARTMENT'},
                {label: Deal.objectTypeOptions.PARKING_PLACE.label, code: 'PARKING_PLACE'},
                {label: Deal.objectTypeOptions.OFFICE.label, code: 'OFFICE'},
                {label: Deal.objectTypeOptions.STOREHOUSE.label, code: 'STOREHOUSE'},
                {label: Deal.objectTypeOptions.STORAGE.label, code: 'STORAGE'},
                {label: Deal.objectTypeOptions.RETAIL_SPACE.label, code: 'RETAIL_SPACE'},
                {label: Deal.objectTypeOptions.FREE_SPACE.label, code: 'FREE_SPACE'},
                {label: Deal.objectTypeOptions.PAVILION.label, code: 'PAVILION'},
                {label: Deal.objectTypeOptions.WORK_PLACE.label, code: 'WORK_PLACE'},
                {label: Deal.objectTypeOptions.GILD.label, code: 'GILD'}
            ], houseTypes: [
                {label: Deal.houseTypeOptions.APART_HOTEL.label, code: 'APART_HOTEL'},
                {label: Deal.houseTypeOptions.LIVING_HOUSE.label, code: 'LIVING_HOUSE'},
                {label: Deal.houseTypeOptions.MOLL.label, code: 'MOLL'},
                {label: Deal.houseTypeOptions.SHOPPING_CENTER.label, code: 'SHOPPING_CENTER'},
                {label: Deal.houseTypeOptions.BUSINESS_CENTER.label, code: 'BUSINESS_CENTER'},
                {label: Deal.houseTypeOptions.OFFICE_BUILDING.label, code: 'OFFICE_BUILDING'},
                {label: Deal.houseTypeOptions.MULTIFUNCTIONAL_CENTER.label, code: 'MULTIFUNCTIONAL_CENTER'},
                {label: Deal.houseTypeOptions.WAREHOUSE.label, code: 'WAREHOUSE'},
                {label: Deal.houseTypeOptions.PRODUCTION_BUILDING.label, code: 'PRODUCTION_BUILDING'}
            ], propertyStatuses: [
                {label: Deal.propertyStatusOptions.NEW.label, code: 'NEW'},
                {label: Deal.propertyStatusOptions.OLD.label, code: 'OLD'},
                {label: Deal.propertyStatusOptions.UNFINISHED.label, code: 'UNFINISHED'}
            ]},
        LAND: {label: 'Земельный участок', objectTypes: [
                {label: Deal.objectTypeOptions.GARDEN_LAND.label, code: 'GARDEN_LAND'},
                {label: Deal.objectTypeOptions.VEGETABLE_LAND.label, code: 'VEGETABLE_LAND'},
                {label: Deal.objectTypeOptions.FIELD_LAND.label, code: 'FIELD_LAND'},
                {label: Deal.objectTypeOptions.HOMESTEAD_LAND.label, code: 'HOMESTEAD_LAND'},
                {label: Deal.objectTypeOptions.INDUSTRIAL_SITE.label, code: 'INDUSTRIAL_SITE'}
            ], houseTypes: [
                {label: Deal.houseTypeOptions.AGRICULTURAL_LANDS.label, code: 'INDUSTRIAL_SITE'},
                {label: Deal.houseTypeOptions.SETTLEMENT_LANDS.label, code: 'SETTLEMENT_LANDS'},
                {label: Deal.houseTypeOptions.INDUSTRY_LANDS.label, code: 'INDUSTRY_LANDS'},
            ], propertyStatuses: [
                {label: Deal.propertyStatusOptions.ACCOUNTED.label, code: 'ACCOUNTED'},
                {label: Deal.propertyStatusOptions.PREVIOUSLY.label, code: 'PREVIOUSLY'},
                {label: Deal.propertyStatusOptions.ARCHIVED.label, code: 'ARCHIVED'},
            ]
        }
    };

    public static propertyTypeArray = [
        {label: Deal.propertyTypeOptions.LIVING.label, code: 'LIVING'},
        {label: Deal.propertyTypeOptions.COMMERCIAL.label, code: 'COMMERCIAL'},
        {label: Deal.propertyTypeOptions.LAND.label, code: 'LAND'}
    ];

    public static propertyRightOptions = {
        INDIVIDUAL: 'Индивидуальная собственность',
        COMMON_SHARED: 'Общая долевая собственность',
        COMMON_JOINT: 'Обшая совместная собственность',
        OTHER: 'Другое'
    };

    public static propertyRightArray = [
        {label: Deal.propertyRightOptions.INDIVIDUAL, code: 'INDIVIDUAL'},
        {label: Deal.propertyRightOptions.COMMON_SHARED, code: 'COMMON_SHARED'},
        {label: Deal.propertyRightOptions.COMMON_JOINT, code: 'COMMON_JOINT'},
        {label: Deal.propertyRightOptions.OTHER, code: 'OTHER'}
    ];

    public static qualificationOptions = {
        NOT: 'Не квалифицировано',
        OTHER: 'Другое'
    };

    public static qualificationArray = [
        {label: Deal.qualificationOptions.NOT, code: 'NOT'},
        {label: Deal.qualificationOptions.OTHER, code: 'OTHER'},
    ];

    public static arraysDescription = {
        "livingRooms" : {
            label: "Жилые помещения", multiply: true, array: [
                {label: 'Столовая', code: 'dining'},
                {label: 'Гостиная', code: 'living'},
                {label: 'Спальня', code: 'bedroom'},
            ]
        },
        "auxiliaryRooms": { label: "Вспомогательные помещения", multiply: true, array: [
                {label: 'Кухня', code: 'kitchen'},
                {label: 'Кухня-ниша', code: 'mini-kitchen'},
                {label: 'Кухня-столовая', code: 'kitchen-dining'},
                {label: 'Кухня-гостиная', code: 'living-kitchen'},
                {label: 'Коридор', code: 'corridor'},
                {label: 'Холл', code: 'hall'},
                {label: 'Внутренний тамбур', code: 'vestibule'},
                {label: 'Передняя (прихожая)', code: 'hallway'},
                {label: 'Ванная комната', code: 'bathroom'},
                {label: 'Душевая комната', code: 'shower-room'},
                {label: 'Туалетная комната', code: 'toilet'},
                {label: 'Уборная', code: 'wc'},
                {label: 'Совмещеннй санузел', code: 'wc1'},
                {label: 'Кладовая', code: 'pantry'},
                {label: 'Кабинет', code: 'cabinet'},
                {label: 'Гардеробная', code: 'wardrobe'},
                {label: 'Постирочная', code: 'laundry'},
                {label: 'Встроенный шкаф', code: 'build-in-wardrobe'},
                {label: 'Библиотека', code: 'library'}
            ]
        },
        "extraRooms" : {
            label: "Встроенные и примыкающие пом.", multiply: true, array: [
                {label: 'Балкон', code: 'balcony'},
                {label: 'Лоджия', code: 'loggia'},
                {label: 'Веранда', code: 'veranda'},
                {label: 'Терраса', code: 'terrace'},
                {label: 'Эксплуатируемая кровля', code: 'roof'},
                {label: 'Эркер', code: 'oriel'}
            ]
        },
        "generalDescription" : {
            label: "Общее описание", multiply: false, array: [
                {label: 'Планировочное решение', code: 'balcony', description: 'Раздельные комнаты, Смежные комнаты, Студия, Стандартная, Свободная, Перепланированная ...'},
                {label: 'Высота потолка', code: 'loggia'},
                {label: 'Окна', code: 'window', description: 'Стандартные, Панорамные, Витражные, Витринные ...'},
                {label: 'Отделка помещений', code: 'interior', description: 'Черновая отделка, Предчистовая отделка, Чистовая отделка\n' +
                        'Отделка «Под ключ», Дизайнерский проект, Требуется косметический ремонт, Требуется капитальный ремонт ...'}
            ]
        },

        "engineering" : {
            label: "Инженерия", multiply: false, array: [
                {label: 'Электроснабжение', code: 'electricity'},
                {label: 'Газоснабжение', code: 'gas'},
                {label: 'Водоснабжение', code: 'water'},
                {label: 'Канализация', code: 'sewerage'},
                {label: 'Вентиляция', code: 'ventilation'},
                {label: 'Кондиционирование / климат', code: 'conditioning'}
            ]
        },
    }
}
