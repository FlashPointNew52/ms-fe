// import {AddressBlock} from "../class/addressBlock";
// import {EmailBlock} from "../class/emailBlock";
// import {SiteBlock} from "../class/siteBlock";
// import {PhoneBlock} from "../class/phoneBlock";
// import {SocialBlock} from "../class/socialBlock";
// import {MessengerBlock} from "../class/messengerBlock";
// import {Organisation} from "./organisation";
// import {User} from "./user";
// import {ContractBlock} from "../class/contractBlock";
// import {UploadFile} from '../class/uploadFile';

import { AddressBlock } from '../../core/models/address-block';
import { Tags } from '../../core/models/tags';
import { User } from './user';

export interface Confirmation {
    data: string;
    confirmed?: boolean;
    type?: string;
}

export class ConfirmationImpl implements Confirmation{
    data: string;
    confirmed?: boolean;
    type?: string;

    constructor(data: string, confirmed?: boolean, type?: string) {
        this.data = data;
        this.confirmed = confirmed || false;
        this.type = type;
    }
}

export interface IData {
    label: string;
    items: any[];
    description?: string;
}

export interface IStageCode {
    NEW_CONTACT: IData;
    TRANSFORMATION: IData;
    NEW_CLIENT: IData;
    CONST_CLIENT: IData;
    LOYAL_CLIENT: IData;
    PARTNER: IData;
}

export class Contact {
    id?: string;
    accountId?: string;
    name: string;
    description: string;
    addDate: Date;
    changeDate?: Date;
    assignDate?: Date;
    archiveDate?: Date;
    addressBlock: AddressBlock;
    userCreated?: User;
    phones: Array<Confirmation>;
    emails: Array<Confirmation>;
    sites: Array<Confirmation>;
    messengers: Array<Confirmation>;
    socials: Array<Confirmation>;
    state: keyof typeof Contact.stateCodeOptions;
    agentId?: string;
    agent?: string; // : User;
    fieldsActivity?: string;
    responsible: any;
    organisationId?: string;
    organisation?: string; // : Organisation;
    stageCode: keyof IStageCode;
    tag: string[];
    rate?: number;
    sources: any;
    photo?: string;
    photoMini?: string;
    // middleman: string;
    photos?: string; // : UploadFile[];         //url фото
    documents?: string; // : UploadFile[];         //url документов

    constructor(name?: any) {
        this.name = '';
        this.tag = [];
        this.addDate = new Date();
        this.addressBlock = new AddressBlock();
        this.phones = new Array<Confirmation>();
        this.emails = new Array<Confirmation>();
        this.sites = new Array<Confirmation>();
        this.messengers = new Array<Confirmation>();
        this.socials = new Array<Confirmation>();
        this.description = '';
        // this.contractBlock = new ContractBlock();
        // this.agentId = null;
        if (name){
            this.name = name;
        }
        this.stageCode = 'NEW_CONTACT';
        this.state = 'EMPTY';
        this.sources = {};
        this.responsible = [];
    }


    public static typeOptions = {
        person: {label: 'Контакт', items: []},
        organisation: {label: 'Организация', items: []}
    };

    public static middlemanOptions = {
        OWNER: {label: 'Принципал', items: []},
        MIDDLEMAN: {label: 'Посредник', items: []}
    };

    public static sourceCodeOptions = {
        INTERNET: {label: 'Интернет площадки'},
        PRINT: {label: 'Печатные издания'},
        SOCIAL: {label: 'Социальные сети'},
        MESSENGERS: {label: 'Мессенджеры'},
        EMAIL: {label: 'E-mail-рассылка'},
        RECOMMENDATIONS: {label: 'Рекомендации'},
        OTHER: {label: 'Другое'}
    };

    public static stateCodeOptions = {
        EMPTY: 'Без взаимодействия',
        ACTIVE: 'Активно',
        SUSPENDED: 'Приостановлено',
        ARCHIVE: 'В архиве',
        TRASH: 'В корзине',
        OTHER: 'Другое'
    };

    public static stateCodeArray = [
        {label: 'Без взаимодействия', code: 'EMPTY'},
        {label: 'Активно', code: 'ACTIVE'},
        {label: 'Приостановлено', code: 'SUSPENDED'},
        {label: 'В архиве', code: 'ARCHIVE'},
        {label: 'В корзине', code: 'TRASH'},
        {label: 'Другое', code: 'OTHER'}
    ];

    public static processCodeOptions = {
        CREATE: 'Процесс создания встречи/переговоров',
        CAPTURE: 'Процесс захвата контактных данных',
        RETURN: 'Процесс возврата контакта',
        AWARENESS: 'Процесс повышения осведомленности контакта',
        STUDYING: 'Процесс изучение ожидания клиента от сотрудничества',
        PROPOSAL: 'Предложение к сотрудничеству (Отправка КП)',
        ESTIMATE: 'Процесс оценки качества услуги',
        TRANSFORMATION: 'Процесс захвата данных для создания портрета клиента',
        ENHANCING: 'Процесс усиления ценности сотрудничества',
        NEXT_OFFER: 'Предложение совершить следующую сделку',
        RETENTION: 'Процесс удержания и развития лояльности',
        COLLABORATION: 'Процесс активного сотрудничества',
        COLLABORATION_STOP: 'Процесс активного сотрудничества приостановлен'
    };

    public static processCodeArray = {
        NEW_CONTACT: [
            {label: 'Процесс создания встречи/переговоров', code: 'CREATE'},
            {label: 'Процесс захвата контактных данных', code: 'CAPTURE'},
            {label: 'Процесс возврата контакта', code: 'RETURN'}
        ],
        TRANSFORMATION: [
            {label: 'Процесс повышения осведомленности контакта', code: 'AWARENESS'},
            {label: 'Процесс изучение ожидания клиента от сотрудничества', code: 'STUDYING'},
            {label: 'Предложение к сотрудничеству (Отправка КП)', code: 'PROPOSAL'},
            {label: 'Процесс возврата клиента', code: 'RETURN'}
        ],
        NEW_CLIENT: [
            {label: 'Процесс оценки качества услуги', code: 'ESTIMATE'},
            {label: 'Процесс захвата данных для создания портрета клиента', code: 'TRANSFORMATION'},
            {label: 'Процесс усиления ценности сотрудничества', code: 'ENHANCING'},
            {label: 'Предложение совершить следующую сделку', code: 'NEXT_OFFER'},
            {label: 'Процесс возврата клиента', code: 'RETURN'}
        ],
        CONST_CLIENT: [
            {label: 'Процесс оценки качества услуги', code: 'ESTIMATE'},
            {label: 'Процесс удержания и развития лояльности', code: 'RETENTION'},
            {label: 'Процесс возврата клиента', code: 'RETURN'}
        ],
        LOYAL_CLIENT: [
            {label: 'Процесс удержания и развития лояльности', code: 'RETENTION'},
            {label: 'Процесс возврата клиента', code: 'RETURN'}
        ],
        PARTNER: [
            {label: 'Процесс активного сотрудничества', code: 'COLLABORATION'},
            {label: 'Процесс активного сотрудничества приостановлен', code: 'COLLABORATION_STOP'},
            {label: 'Процесс возврата клиента', code: 'RETURN'}
        ]
    };

    public static allSort = [
        {class: 'submenu', value: 'addDate', label: 'Добавлено', items:  [
                {class: 'entry', value: 'ASC', label: 'По возрастанию'},
                {class: 'entry', value: 'DESC', label: 'По убыванию'}
            ]},

        {class: 'submenu', value: 'changeDate', label: 'Изменено' , items: [
                {class: 'entry', value: 'ASC', label: 'По возрастанию'},
                {class: 'entry', value: 'DESC', label: 'По убыванию'}
            ]},

        {class: 'submenu', value: 'ownerPrice', label: 'Рейтингу', items: [
                {class: 'entry', value: 'ASC', label: 'По возрастанию'},
                {class: 'entry', value: 'DESC', label: 'По убыванию'}
            ]}
    ];

    public static localSort = [
        {class: 'submenu', value: 'addDate', label: 'Добавлено', items:  [
                {class: 'entry', value: 'ASC', label: 'По возрастанию'},
                {class: 'entry', value: 'DESC', label: 'По убыванию'}
            ]},
        {class: 'submenu', value: 'assignDate', label: 'Назначено', items:  [
                {class: 'entry', value: 'ASC', label: 'По возрастанию'},
                {class: 'entry', value: 'DESC', label: 'По убыванию'}
            ]},
        {class: 'submenu', value: 'changeDate', label: 'Изменено' , items: [
                {class: 'entry', value: 'ASC', label: 'По возрастанию'},
                {class: 'entry', value: 'DESC', label: 'По убыванию'}
            ]},
        {class: 'submenu', value: 'rate', label: 'Рейтингу', items: [
                {class: 'entry', value: 'ASC', label: 'По возрастанию'},
                {class: 'entry', value: 'DESC', label: 'По убыванию'}
            ]}
    ];
}
