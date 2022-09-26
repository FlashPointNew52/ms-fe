// import * as moment from 'moment/moment';
// import 'moment/locale/ru.js';
// import {SessionService} from "../service/session.service";
// import {Contact} from "../entity/contact";
// import {PhoneBlock} from "./phoneBlock";
// import {PersonService} from "../service/person.service";
// import {OrganisationService} from "../service/organisation.service";
// import {AsyncSubject} from "rxjs";

export class Utils{
    // private  static _sessionService: SessionService;
    // constructor( private _sessionService: SessionService,
    //              private  _personService: PersonService,
    //              private  _organisationService: OrganisationService
    // ){
    //     moment.locale("ru");
    // }

    // public static toMoment(val){
    //     return moment(val);
    // }

    public static originalOrder = (a: any, b: any): number =>  0;

    public static stopTypes = {
        urban: {labelShort: 'Остановка', labelLong: 'Остановка общественного транспорта'},
        underground: {labelShort: 'Станция метро', labelLong: 'Метро'},
        railway: {labelShort: 'Ж/Д станция', labelLong: 'Железнодорожная станция'}
    }

    // public static getDateForNotification(date: number) {
    //     return moment(date * 1000).calendar(null, {
    //         sameDay: '[Сегодня],' + moment(date* 1000).format("D") + ' ' + this.getMonth(date) +', LT',
    //         nextDay: '[Завтра],' + moment(date* 1000).format("D") + ' ' + this.getMonth(date) +', LT',
    //         nextNextDay: '[Послезавтра],' + moment(date* 1000).format("D") + ' ' + this.getMonth(date) +', LT',
    //         nextWeek: moment(date* 1000).format("D") + ' ' + this.getMonth(date) +', LT',
    //         lastDay: '[Вчера],' + moment(date* 1000).format("D") + ' ' + this.getMonth(date) +', LT',
    //         lastWeek:  now => {
    //             if (moment(date* 1000).startOf('day').diff(moment(now).startOf('day'), 'day', true) == -2) {
    //                 return '[Позавчера],' + moment(date* 1000).format("D") + ' ' + this.getMonth(date) +', LT';
    //             } else {
    //                 return moment(date * 1000).format("D") + ' ' + this.getMonth(date) +', LT';
    //             }
    //         },
    //         sameElse: moment(date* 1000).format("D") + ' ' + this.getMonth(date) +', LT'
    //     });
    // }
    // public static getMonth(date: number) {
    //     switch (moment(date).format("M")) {
    //         case "1": return "Января";
    //         case "2": return "Февраля";
    //         case "3": return "Апреля";
    //         case "4": return "Марта";
    //         case "5": return "Мая";
    //         case "6": return "Июня";
    //         case "7": return "Июля";
    //         case "8": return "Августа";
    //         case "9": return "Сентября";
    //         case "10": return "Октября";
    //         case "11": return "Ноября";
    //         case "12": return "Декабря";
    //     }
    // }
    // public static getDayOfWeek(date: number, mode: string) {
    //     if (mode == 'short') {
    //         switch (moment(date).format("d")) {
    //             case "0": return "Пн.";
    //             case "1": return "Вт.";
    //             case "2": return "Ср.";
    //             case "3": return "Чт.";
    //             case "4": return "Пт.";
    //             case "5": return "Сб.";
    //             case "6": return "Вск.";
    //         }
    //     }
    //     if (mode == 'full') {
    //         switch (moment(date).format("d")) {
    //             case "0": return "Понедельник";
    //             case "1": return "Вторник";
    //             case "2": return "Среда";
    //             case "3": return "Четверг";
    //             case "4": return "Пятница";
    //             case "5": return "Суббота";
    //             case "6": return "Воскресенье";
    //         }
    //     }
    // }
    // public static getDateInCalendar(date: number){
    //     return moment(date * 1000).calendar(null, {
    //             sameDay: '[Сегодня] LT',
    //             nextDay: '[Завтра в] LT',
    //             nextNextDay: '[Послезавтра в] LT',
    //             nextWeek: 'DD.MM.YYYY',
    //             lastDay: '[Вчера в] LT',
    //             lastWeek:  function(now) {
    //                 if (moment(this).startOf('day').diff(moment(now).startOf('day'), 'day', true) == -2) {
    //                   return '[Позавчера в] LT';
    //                 } else {
    //                   return 'DD.MM.YYYY';
    //                 }
    //             },
    //             sameElse: 'DD.MM.YYYY'
    //         });
    // }
    //
    // public static getDateForGraph(number: number) {
    //     return moment(number).format("D MMMM");
    // }
    // public static getDateForPhoto(date: number) {
    //     return moment(date * 1000).calendar(null, {
    //         sameDay: '[Сегодня], ' + moment(date* 1000).format("D MMMM, YYYY"),
    //         lastDay: '[Вчера], ' + moment(date* 1000).format("D MMMM, YYYY"),
    //         lastWeek:  now => {
    //             if (moment(date* 1000).startOf('day').diff(moment(now).startOf('day'), 'day', true) == -2) {
    //                 return '[Позавчера], ' + moment(date* 1000).format("D MMMM, YYYY");
    //             } else {
    //                 return moment(date* 1000).format("D MMMM, YYYY");
    //             }
    //         },
    //         sameElse: moment(date* 1000).format("D MMMM, YYYY")
    //     });
    // }
    //
    // public static getTitleDateForGraph(number: number) {
    //     return moment(number).format("D MMMM, YYYY");
    // }
    //
    // public static getNumWithDellimet(n){
    //     n += "";
    //     n = new Array(4 - n.length % 3).join("U") + n;
    //     return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
    // }
    //
    // public static getCurrentTime(number: number) {
    //     return moment(number).get('hour') + ':' + moment(number).get('minute');
    // }
    //
    // public static getFullCurrentTime(number: number) {
    //     return moment(number).get('hour') + ':' + moment(number).get('minute')+ ':' + moment(number).get('second');
    // }
    //
    // public static getNumWithWhitespace(str){
    //     if(!str) return "";
    //     return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    // }
    //
    // public static inLastDay(date: Date) {
    //     return moment().subtract(1, 'days').isBefore(date);
    //
    // }
    //
    // public static trancateFio(fio: string){
    //     if (!fio || fio.trim().length == 0) return null;
    //     let spArray = fio.split(" ");
    //     let ret = spArray[0];
    //     if (spArray.length > 1) {
    //         ret += " " + spArray[1];
    //     }
    //     return ret;
    // }
    //
    // public static getSurname(fio: string){
    //     if(fio){
    //         return fio.split(" ")[0];
    //     }
    //     return null;
    // }
    //
    // public static getFirstName(fio: string, onlyFirst?: boolean){
    //     if(fio){
    //         let spArray = fio.split(" ");
    //         let ret = "";
    //         for(let i = 1; i < spArray.length; ++i){
    //             ret += spArray[i] + " ";
    //             if(onlyFirst){
    //                 break;
    //             }
    //         }
    //         if(ret != "") return ret.trim();
    //     }
    //     return null;
    // }
    //
    // //Функция проверки отнесения аккаунта
    // public canImpact(arr: any[]){
    //     for (let elem of arr) {
    //        if(elem.accountId != this._sessionService.getUser().accountId ||
    //            (elem.agentId && this._sessionService.getUser().id != elem.agentId &&
    //            this._sessionService.getUser().subordinates.indexOf(elem.agentId) == -1))
    //           return false;
    //
    //     }
    //     return true;
    // }
    //
    // public static ceil(num){
    //     return Math.ceil(num);
    // }
    //
    // public findContact(structure: any, contact: any){
    //     let ret_subj = new AsyncSubject() as  AsyncSubject<Contact>;
    //     if(Object.keys(structure).length == 0 && contact.id && contact.type){
    //         let type = contact.type;
    //         contact = new Contact();
    //         contact.type = type;
    //         ret_subj.next(contact);
    //         ret_subj.complete();
    //     } else if(Object.keys(structure).length > 0){
    //         let phones = PhoneBlock.removeSymb(structure);
    //         if(PhoneBlock.check(phones)) {
    //             if(contact.type == "person") {
    //                 this._personService.findByPhone(phones).subscribe((data) => {
    //                     if (data != null) {
    //                         if(data.id != contact.id){
    //                             contact = data;
    //                             contact.type = 'person';
    //                         }
    //                     } else {
    //                         contact.phoneBlock = structure;
    //                         contact.id = null;
    //                     }
    //                     ret_subj.next(contact);
    //                     ret_subj.complete();
    //                 });
    //             } else if(contact.type == "organisation") {
    //                 this._organisationService.findByPhone(phones).subscribe((data)=>{
    //                     if(data != null){
    //                         if(data.id != contact.id){
    //                             contact = data;
    //                             contact.type = 'organisation';
    //                         }
    //                     } else{
    //                         contact.phoneBlock = structure;
    //                         contact.id = null;
    //                     }
    //                     ret_subj.next(contact);
    //                     ret_subj.complete();
    //                 });
    //             }
    //         }
    //     }
    //     return ret_subj;
    // }
}
