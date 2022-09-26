import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

moment.locale('ru');
moment.updateLocale('ru', {
    calendar: {
        lastDay: '[Вчера,] DD MMMM YYYY г., в HH:mm',
        sameDay: '[Сегодня,] DD MMMM YYYY г., в HH:mm',
        nextDay: '[Завтра,] DD MMMM YYYY г., в HH:mm',
        nextNextDay: '[Послезавтра, ] DD MMMM YYYY г., в HH:mm',
        nextWeek: 'DD MMMM YYYY г., в HH:mm',
        sameElse: 'DD MMMM YYYY г., в HH:mm'
    },
    weekdays : [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ]
});

@Pipe({
    name: 'mDate'
})
export class DatePipe implements PipeTransform {
    default = 'dddd, DD MMMM YYYY г., в HH:mm';

    transform(value: any, format?: string): any {
        const date = moment(value);
        if(date.isValid()){
            return date.format(format || this.default);
        }
        return value;
    }

}
