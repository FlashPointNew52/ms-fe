import { Contact, IStageCode } from '../../../models/entity/contact';

export class Company extends Contact{
    typeCode: keyof typeof Company.typeCodeOptions;
    fieldActivity: keyof typeof Company.fieldActivityOptions;
    branchType: keyof typeof Company.branchTypeOptions;
    // lastName: string = '';
    // processCode: keyof typeof Contact.processCodeOptions;
    // userRef?: number;

    constructor(){
        super();
        this.typeCode = 'UNKNOWN';
        this.fieldActivity = 'REALTOR';
        this.branchType = 'MAIN';
        // this.processCode = 'CREATE';
    }

    public static phoneTypeArray = [
        {label: 'Основной', value: 'MAIN', text: 'Основной'},
        {label: 'Отдел продаж', value: 'SALES', text: 'Отдел продаж'},
        {label: 'Отдел аренды', value: 'RENTAL', text: 'Отдел аренды'},
        {label: 'Отдел оценки', value: 'EVALUATION', text: 'Отдел оценки'},
        {label: 'Отдел ипотеки', value: 'MORTGAGES', text: 'Отдел ипотеки'},
        {label: 'Отдел маркетинга', value: 'MARKETING', text: 'Отдел маркетинга'},
        {label: 'Отдел рекламы', value: 'ADVERTISING', text: 'Отдел рекламы'},
        {label: 'HR-отдел', value: 'HR', text: 'HR-отдел'},
        {label: 'Юридический отдел', value: 'LEGAL', text: 'Юридический отдел'},
        {label: 'Финансовый отдел', value: 'FINANCIAL', text: 'Финансовый отдел'},
        {label: 'Невалидный', value: 'INVALID', text: 'Невалидный'}
    ];

    public static phoneTypeOptions = {
        MAIN: {label: 'Основной', text: 'Основной'},
        SALES: {label: 'Отдел продаж', text: 'Отдел продаж'},
        RENTAL: {label: 'Отдел аренды', text: 'Отдел аренды'},
        EVALUATION: {label: 'Отдел оценки', text: 'Отдел оценки'},
        MORTGAGES: {label: 'Отдел ипотеки', text: 'Отдел ипотеки'},
        MARKETING: {label: 'Отдел маркетинга', text: 'Отдел маркетинга'},
        ADVERTISING: {label: 'Отдел рекламы', text: 'Отдел рекламы'},
        HR: {label: 'HR-отдел', text: 'HR-отдел'},
        LEGAL: {label: 'Юридический отдел', text: 'Юридический отдел'},
        FINANCIAL: {label: 'Финансовый отдел', text: 'Финансовый отдел'},
        INVALID: {label: 'Невалидный', text: 'Невалидный'}
    };

    public static typeCodeOptions = {
        UNKNOWN: {label: 'Не определено', items: []},
        PARTNER: {label: 'Партнер', items: [], description: 'Равноправный участник совместной деятельности'},
        COMPETITOR: {label: 'Конкурент', items: [], description: 'Соперник в достижении идентичных целей'},
        OUR: {label: 'Наша компания', items: [], description: 'Это организация в которой я и мои коллеги объединены совместной профессиональной деятельностью'},
        OTHER: {label: 'Другое', items: []}
    };

    public static typeCodeArray = [
        {label: 'Не определено', code: 'UNKNOWN'},
        {label: 'Партнер', code: 'PARTNER', description: Company.typeCodeOptions.PARTNER.description},
        {label: 'Конкурент', code: 'COMPETITOR', description: Company.typeCodeOptions.COMPETITOR.description},
        {label: 'Наша компания', code: 'OUR', description: Company.typeCodeOptions.OUR.description},
        {label: 'Другое', code: 'OTHER'},
    ];

    public static fieldActivityOptions = {
        BUILD: {label: 'Строительная компания', items: [], description: 'Компания, занимающаяся созданием (возведением) зданий строений, сооружений'},
        BUILD2: {label: 'Застройщик', items: [], description: 'Компания располагающее земельным участком и привлекающая денежные средства участников долевого строительства'},
        DEVELOP: {label: 'Девелоперская компания', items: [], description: 'Компания, объединяющая нескольких застройщиков и продвигающая строительные проекты под общим брендом'},
        REALTOR: {label: 'Риэлторская компания', items: [], description: 'Компания действующее как агент или брокер между сторонами, участвующими в сделке'},
        FINANCE: {label: 'Финансово-кредитная организация', items: [], description: 'Организация, уполномоченная осуществлять финансовые операции и оказывающая финансовых услуг и др.'},
        INSURANCE: {label: 'Страховая компания',  description: 'Компания, основная деятельность которой состоит в предоставлении страховых услуг.'},
        HOMEOWNERS: {label: 'Товарищество собственников жилья (ТСЖ)', items: [], description: 'Объединения собственников помещений многоквартирного дома или собственников соседних участков для совместного управления'},
        EVALUATION: {label: 'Оценочная компания', items: [], description: 'Компания, функции которой заключаются в оценке различных видов имущества'},
        CLEANING: {label: 'Клининговая компания', items: [], description: 'Компания, предоставляющая услуги по организации и выполнению профессиональной уборки различных видов'},
        CARGO: {label: 'Грузоперевозки', description: 'Компания предоставляющая услуги по организации и осуществлению грузоперевозок'},
        OTHER: {label: 'Другое', items: []}
    };

    public static fieldActivityArray = [
        {label: 'Строительная компания', code: 'BUILD', description: Company.fieldActivityOptions.BUILD.description},
        {label: 'Застройщик', code: 'BUILD2', description: Company.fieldActivityOptions.BUILD2.description},
        {label: 'Девелоперская компания', code: 'DEVELOP', description: Company.fieldActivityOptions.DEVELOP.description},
        {label: 'Риэлторская компания (Аренда / Продажа)', code: 'REALTOR', description: Company.fieldActivityOptions.REALTOR.description},
        {label: 'Финансово-кредитная организация', code: 'FINANCE', description: Company.fieldActivityOptions.FINANCE.description},
        {label: 'Страховая компания', code: 'INSURANCE', description: Company.fieldActivityOptions.INSURANCE.description},
        {label: 'Товарищество собственников жилья (ТСЖ)', code: 'HOMEOWNERS', description: Company.fieldActivityOptions.HOMEOWNERS.description},
        {label: 'Оценочная компания', code: 'EVALUATION', description: Company.fieldActivityOptions.EVALUATION.description},
        {label: 'Клининговая компания', code: 'CLEANING', description: Company.fieldActivityOptions.CLEANING.description},
        {label: 'Грузоперевозки', code: 'CARGO', description: Company.fieldActivityOptions.CARGO.description},
        {label: 'Другое', code: 'OTHER'},
    ];

    public static branchTypeOptions = {
        MAIN: {label: 'Головная компания', items: []},
        BRANCH: {label: 'Филиал', items: []},
        REPRESENTATION: {label: 'Представительство', items: []},
        SUBSIDIARY: {label: 'Дочерняя компания', items: []},
        FRANCHISE: {label: 'Франшиза', items: []}
    };

    public static branchTypeArray = [
        {label: 'Головной офис', code: 'MAIN'},
        {label: 'Филиал', code: 'BRANCH'},
        {label: 'Представительство', code: 'REPRESENTATION'},
        {label: 'Дочерняя компания', code: 'SUBSIDIARY'},
        {label: 'Франшиза', code: 'FRANCHISE'}
    ];

    public static stageCodeOptions: IStageCode = {
        NEW_CONTACT: {label: 'Привлеченная компания', items: [], description: 'Первичные взаимодействия. ' +
                'Процесс захвата контактных данных и создание встречи, переговоров'},
        TRANSFORMATION: {label: 'Преобразование компании', items: [], description: 'Знакомство. ' +
                'Повышение осведомленности о потребности контакта, разработка и предложение решения его потребностей'},
        NEW_CLIENT: {label: 'Новый клиент', items: [], description: 'Совершена первая сделка. ' +
                'Добавление данных для создания портрета клиента. Процесс усиления ценности сотрудничества и предложения новой сделки'},
        CONST_CLIENT: {label: 'Постоянный клиент', items: [], description: 'Совершено более двух сделок. ' +
                'Процесс оценки качества услуги, и развития лояльности'},
        LOYAL_CLIENT: {label: 'Лояльный клиент', items: [], description: 'Верность компании и бренду. ' +
                'Процесс удержания и развития лояльности у клиента'},
        PARTNER: {label: 'Партнер', items: [], description: 'Активное участие в развитии компании. ' +
                'Процесс активного сотрудничества и партнерских сделок'}
    };

    public static stageCodeArray = [
        {label: 'Привлеченная компания', code: 'NEW_CONTACT', description: 'Первичные взаимодействия. ' +
                'Процесс захвата контактных данных и создание встречи, переговоров'},
        {label: 'Преобразование компании', code: 'TRANSFORMATION', description: 'Знакомство. ' +
                'Повышение осведомленности о потребности контакта, разработка и предложение решения его потребностей'},
        {label: 'Новый клиент', code: 'NEW_CLIENT', description: 'Совершена первая сделка. ' +
                'Добавление данных для создания портрета клиента. Процесс усиления ценности сотрудничества и предложения новой сделки'},
        {label: 'Постоянный клиент', code: 'CONST_CLIENT', description: 'Совершено более двух сделок. ' +
                'Процесс оценки качества услуги, и развития лояльности'},
        {label: 'Лояльный клиент', code: 'LOYAL_CLIENT', description: 'Верность компании и бренду. ' +
                'Процесс удержания и развития лояльности у клиента'},
        {label: 'Партнер', code: 'PARTNER', description: 'Активное участие в развитии компании. ' +
                'Процесс активного сотрудничества и партнерских сделок'}
    ];

}
