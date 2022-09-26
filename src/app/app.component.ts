import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private config: PrimeNGConfig) {}

    ngOnInit() {
        this.config.setTranslation({
            "dayNames": ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            "dayNamesShort": ["Вск", "Пнд", "Втр", "Ср", "Чтв", "Птн", "Сб"],
            "dayNamesMin": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            "monthNames": ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
            "monthNamesShort": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн","Июл", "Авг", "Сен", "Окт", "Нбр", "Дек"],
            //@ts-ignore
            "dateFormat": "DD dd MM yy",
            // "firstDayOfWeek": 0,
            "today": "Сегодня",
            "weekHeader": "Wk",
        });
    }
}
