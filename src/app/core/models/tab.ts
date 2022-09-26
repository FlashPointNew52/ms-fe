import { Contact } from '../../models/entity/contact';
import { Person } from './entity/person';

export enum TabType {
    HOME = 'home',
    PERSON_LIST = 'Контакты',
    PERSON = 'Контакт',
    COMPANY = 'Компания',
    COMPANY_LIST = 'Компании',
    DEAL = 'Сделка',
    DEAL_LIST = 'Сделки',
    USER = 'Пользователь'
}

export interface ITabArgs{
    entity?: Person | Contact;
}

export interface ITab {
    id: number;
    // key: string;
    header: string;
    typeTab: TabType;
    args: ITabArgs;
    // tabSys: any;
    // active: boolean;
}

export class Tab implements ITab{
    id: number;
    header = 'Loading...';
    typeTab = TabType.HOME;
    args: ITabArgs;

    constructor(header?: string, type?: TabType, args?: ITabArgs) {
        this.id = new Date().getTime();
        if (header && type){
            this.header = header;
            this.typeTab = type;
        } else{
            this.header = 'Loading';
            this.typeTab = TabType.HOME;
        }

        if (args){
            this.args = args;
        } else{
            this.args = {};
        }
    }
}
