import { Contact, IStageCode } from '../../../models/entity/contact';

export class Person extends Contact{
    lastName: string = '';
    processCode: keyof typeof Contact.processCodeOptions;
    userRef?: number;

    constructor(){
        super();
        this.processCode = 'CREATE';
    }

    public static phoneTypeArray = [
        {label: 'Мобильный', value: 'SELF', text: 'Мобильный'},
        {label: 'Домашний', value: 'HOME', text: 'Домашний'},
        {label: 'Невалидный', value: 'INVALID', text: 'Невалидный'},
        {label: 'Другое', value: 'WORK', text: 'Другое'}
    ];

    public static phoneTypeOptions = {
        SELF: {label: 'Мобильный', text: 'Мобильный'},
        HOME: {label: 'Домашний', text: 'Домашний'},
        INVALID: {label: 'Невалидный', text: 'Невалидный'},
        WORK: {label: 'Другое', text: 'Другое'}
    };

    public static stageCodeOptions: IStageCode = {
        NEW_CONTACT: {label: 'Привлеченный контакт', items: [], description: 'Первичные взаимодействия. ' +
                'Процесс захвата контактных данных и создание встречи, переговоров'},
        TRANSFORMATION: {label: 'Преобразование контакта', items: [], description: 'Знакомство. ' +
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
        {label: 'Привлеченный контакт', code: 'NEW_CONTACT', description: 'Первичные взаимодействия. ' +
                'Процесс захвата контактных данных и создание встречи, переговоров'},
        {label: 'Преобразование контакта', code: 'TRANSFORMATION', description: 'Знакомство. ' +
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
