import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { DatePipe } from '../../../pipes/date.pipe';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CalendarComponent),
        multi: true
    }, DatePipe],
})
export class CalendarComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnChanges {
    value: any[] = [];
    @Input() placeholder: string = '';
    @Input() dateFormat?: string;
    @Input() selectionMode: string = 'single';
    @Input() view: string = 'date'

    @ViewChild(Calendar) calendar?: CalendarComponent;

    public asQuartet: boolean = false;
    filled: boolean = false;
    focus: boolean = false;
    opened: boolean = false;

    public onChange = (val: any) => {
    };
    public onTouched = (val: any) => {
    };

    constructor(private cd: ChangeDetectorRef, private datePipe: DatePipe) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes?.dateFormat?.currentValue != changes?.dateFormat?.previousValue){
            this.update();
        }
        if(changes?.selectionMode?.currentValue != changes?.selectionMode?.previousValue){
            this.value = this.value ? this.value[0] : changes?.selectionMode?.currentValue == 'single' ? null : [];
        }
    }

    ngOnInit(): void {
    }

    formatDate(date: any){
        let value;
        if(this.asQuartet){
            if(date === this.value[1]){
                let quartetFirst = this.getQuartet(this.value[0]);
                let quartetLast = this.getQuartet(date);
                if (quartetFirst == quartetLast && date.getFullYear() == this.value[0].getFullYear()) return "";
            }

            value = this.getQuartet(date) + " кв. " + date.getFullYear() + " г.";
        } else{
            value = this.datePipe.transform(date, this.dateFormat);
            value = value.replace(/^.{1}/, value.charAt(0).toUpperCase());
        }
        return value;
    }

    getQuartet(date: any){
        let quartet = Math.floor(date.getMonth() / 3 + 1);
        let value = "";
        switch (quartet) {
            case 1: value = "I"; break;
            case 2: value = "II"; break;
            case 3: value = "III"; break;
            case 4: value = "IV"; break;
        }
        return value;
    }

    isMonthSelected(month: any) {
        // @ts-ignore
        if (this.isComparable() && this.isRangeSelection()) {
            if(this.value[0] && this.value[1]) {
                // @ts-ignore
                let date = new Date(this.currentYear, month).getTime();
                return this.value[0].getTime() <= date && date <= this.value[1].getTime();
            } else if(this.value[0]){
                // @ts-ignore
                return this.value[0].getMonth() === month && this.value[0].getFullYear() === this.currentYear;
            }
        }

        return false;
    }

    isYearSelected(year: any) {
        // @ts-ignore
        if (this.isComparable() && this.isRangeSelection()) {
            if(this.value[0] && this.value[1]) {
                return this.value[0].getFullYear() <= year && year <= this.value[1].getFullYear();
            } else if(this.value[0]){
                return this.value[0].getFullYear() === year;
            }
        }

        return false;
    }

    ngAfterViewInit(): void {
        (this.calendar as any).formatDate = this.formatDate.bind(this);
        (this.calendar as any).isMonthSelected = this.isMonthSelected;
        (this.calendar as any).isYearSelected = this.isYearSelected;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        this.value = obj;
        this.cd.markForCheck();
    }

    change($event: any): void{
        this.onTouched(true);
        this.onChange(this.value);
        setTimeout(()=> {
            this.trimDate();
        }, 0);

    }

    update() {
        (this.calendar as any)?.updateInputfield();
        this.trimDate();
    }


    private trimDate() {
        if(this.calendar == null) return;
        (this.calendar as any).inputFieldValue = (this.calendar as any)
            .inputFieldValue?.trim()?.replace(/-$/g, "");
        if ((this.calendar as any).inputfieldViewChild && (this.calendar as any).inputfieldViewChild.nativeElement) {
            (this.calendar as any).inputfieldViewChild.nativeElement.value = (this.calendar as any).inputFieldValue;
        }
    }

    stateEvent($event: any) {
        if($event?.fromState == "void"){
            this.focus = true;
        } else
            this.focus = false;
    }
}
