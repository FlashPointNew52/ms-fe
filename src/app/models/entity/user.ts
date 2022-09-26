// import {Organisation} from "./organisation";
import { Contact } from './contact';

export class User extends Contact{
    lastName?: string;
    position: string;
    stateCode: string;
    department: string;
    specialization: string;
    category: string;
    subordinates?: number[];

    constructor() {
        super();
        this.category = 'TRAINEE';
        this.stateCode = 'ACTIVE';
        this.department = 'SALE';
        this.specialization = 'ALL';
        this.position = 'SALE_AGENT';

    }

    public static getData(arr: Array<any>): any{
        for (const item of arr){
            if (item.value !== null){
                return item;
            }

        }
        return {type: '', value: 'Не указан'};
    }

    public static departmentOptions = {
        MANAGEMENT: {label: 'Управление'},
        SALE: {label: 'Отдел продаж'},
        EVALUATION: {label: 'Отдел оценки'},
        ADVERTISING: {label: 'Отдел рекламы'},
        MARKETING: {label: 'Отдел маркетинга'},
        LEGAL: {label: 'Юридический отдел'},
        MORTGAGE: {label: 'Отдел ипотеки'},
        IT: {label: 'Отдел IT'},
        HR: {label: 'HR-отдел'}
    };

    public static positionOptionsByDepart = {
        MANAGEMENT: {
            TOP_MANAGER: {label: 'Топ-менеджер'},
            DIRECTOR: {label: 'Директор'},
            COMMERCIAL_DIRECTOR: {label: 'Коммерческий директор'},
            GENERAL_DIRECTOR: {label: 'Генеральный директор'}
        },
        SALE: {
            SALE_AGENT: {label: 'Агент по продажам'},
            BROKER: {label: 'Брокер'},
            SALE_MANAGER: {label: 'Менеджер по продажам'},
            MANAGER: {label: 'Менеджер отдела продаж'},
            SALE_DIRECTOR: {label: 'Руководитель отдела продаж'}
        },
        EVALUATION: {
            APPRAISER: {label: 'Оценщик'},
            EVAL_MANAGER: {label: 'Менеджер отдела оценки'},
            EVAL_DIRECTOR: {label: 'Руководитель отдела оценки'}
        },
        ADVERTISING: {
            PR_MANAGER: {label: 'PR-менеджер'},
            ADV_MANAGER: {label: 'Менеджер по рекламе'},
            ADV_WEB_MANAGER: {label: 'Менеджер по интернет-рекламе'},
            ADV_DIRECTOR: {label: 'Руководитель отдела рекламы'}
        },
        MARKETING: {
            MARKETER: {label: 'Маркетолог'},
            MARKET_MANAGER: {label: 'Менеджер отдела маркетинга'},
            MARKET_DIRECTOR: {label: 'Руководитель отдела маркетинга'}
        },
        LEGAL: {
            LEGAL_ASSISTANT: {label: 'Помощник юриста'},
            LAWYER: {label: 'Юрист'},
            LAWYER_DIRECTOR: {label: 'Руководитель юридического отдела'}
        },
        MORTGAGE: {
            BROKER: {label: 'Брокер'},
            MORTGAGE_MANAGER: {label: 'Менеджер отдела ипотеки'},
            MORTGAGE_DIRECTOR: {label: 'Руководитель отдела ипотеки'}
        },
        IT: {
            SYSADMIN: {label: 'Системный администратор'},
            DEVELOPER: {label: 'Программист'},
            IT_MANAGER: {label: 'Менеджер проектов'},
            IT_DIRECTOR: {label: 'Руководитель IT-отдела'}
        },
        HR: {
            HR_MANAGER: {label: 'Менеджер отдела'},
            HR_DIRECTOR: {label: 'Руководитель HR-отдела'}
        }
    };

    public static positionOptionsHash = {
        SALE_AGENT: 'Агент по продажам',
        MANAGER: 'Менеджер отдела продаж',
        SALE_MANAGER: 'Менеджер по продажам',
        SALE_DIRECTOR: 'Руководитель отдела продаж',
        APPRAISER: 'Оценщик',
        EVAL_MANAGER: 'Менеджер отдела оценки',
        EVAL_DIRECTOR: 'Руководитель отдела оценки',
        PR_MANAGER: 'PR-менеджер',
        ADV_MANAGER: 'Менеджер по рекламе',
        ADV_WEB_MANAGER: 'Менеджер по интернет-рекламе',
        ADV_DIRECTOR: 'Руководитель отдела рекламы',
        MARKETER: 'Маркетолог',
        MARKET_MANAGER: 'Менеджер отдела маркетинга',
        MARKET_DIRECTOR: 'Руководитель отдела маркетинга',
        LEGAL_ASSISTANT: 'Помощник юриста',
        LAWYER: 'Юрист',
        LAWYER_DIRECTOR: 'Руководитель юридического отдела',
        BROKER: 'Брокер',
        MORTGAGE_MANAGER: 'Менеджер отдела ипотеки',
        MORTGAGE_DIRECTOR: 'Руководитель отдела ипотеки',
        HR_MANAGER: 'Менеджер по персоналу',
        HR_DIRECTOR: 'Менеджер HR-отдела',
        SYSADMIN: 'Системный администратор',
        DEVELOPER: 'Программист',
        IT_MANAGER: 'Менеджер проектов',
        IT_DIRECTOR: 'Руководитель IT-отдела',
        TOP_MANAGER: 'Топ-менеджер',
        DIRECTOR: 'Директор',
        COMMERCIAL_DIRECTOR: 'Коммерческий директор',
        GENERAL_DIRECTOR: 'Генеральный директор'
    };

    public static stateUserCodeOptions = {
        ACTIVE: {label: 'Активно'},
        LEARNING: {label: 'Обучение'},
        VACATION: {label: 'Отпуск'},
        SICK_LEAVE: {label: 'Больничный'},
        OTHER: {label: 'Другое'},
        ARCHIVE: {label: 'Архив'}
    };

    public static specializationOptionsByDepart = {
        SALE: {
            ALL: {label: 'Всё'},
            RENT: {label: 'Аренда'},
            SALE: {label: 'Продажа'}
        },
        EVALUATION: {
            ALL: {label: 'Всё'},
            TRAINEE: {label: 'Жилая недвижимость'},
            SPECIALIST: {label: 'Коммерческая недвижимость'},
            LAND: {label: 'Земля'}
        },
        ADVERTISING: {
            ALL: {label: 'Всё'},
            CREATION: {label: 'Творчество'},
            PRODUCTION: {label: 'Прозводство'},
            MEDIA_PLANNING: {label: 'Медиапланирование'}
        },
        MARKETING: {
            ALL: {label: 'Всё'},
            RESEARCH: {label: 'Исследования'},
            ANALYSIS: {label: 'Анализ и планирование'},
            PROMOTION: {label: 'Продвижение'}
        },
        LEGAL: {
            ALL: {label: 'Всё'},
            MAIN: {label: 'Правовое сопровождение основной деятельности'},
            CORPORATE: {label: 'Корпоративно-правовая'},
            CLAIM: {label: 'Судебно-претензионная'},
            ECONOMIC: {label: 'Хозяйственная деятельность'}
        },
        MORTGAGE: {
            ALL: {label: 'Всё'},
            TRAINEE: {label: 'Жилая недвижимость'},
            SPECIALIST: {label: 'Коммерческая недвижимость'},
            LAND: {label: 'Земля'}
        },
        HR: {
            ALL: {label: 'Всё'},
            RECRUITING: {label: 'Служба рекрутинга'},
            STAFF: {label: 'Служба кадров'},
            SERVICE: {label: 'Служба развития'},
            EVALUATION: {label: 'Служба оценки'},
            QUALITY_CONTROL: {label: 'Служба контроля качества'}
        }
    };

    public static categoryOptions = {
        TRAINEE: {label: 'Стажер'},
        SPECIALIST_CLASS_1: {label: 'Специалист 1 класса'},
        SPECIALIST_CLASS_2: {label: 'Специалист 2 класса'},
        SPECIALIST_CLASS_3: {label: 'Специалист 3 класса'},
        SPECIALIST_CLASS_4: {label: 'Специалист 4 класса'},
        POSITION: {label: 'Должность'},
    };

    public static sort = [
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
