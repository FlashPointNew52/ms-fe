import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';

export interface ServiceData {
    serviceMethod: any;
    binder: any;
    displayField: string;
    params: any[];
}

@Component({
    selector: 'app-select-search',
    templateUrl: './select-search.component.html',
    styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit {
    @Input() name: string = '';
    @Input() placeholder: string = '';
    // @Input() serviceData: ServiceData;
    @Input() ngModel: any = {};
    @Input() displayFunc: any;
    @Input() selectedFunc: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    // @ViewChild('search', {static: true}) searchTextBox: ElementRef;

    searchResults = [];
    query = '';
    timer: any;

    compareFunc = (a: any, b: any) => a.id === b.id;

    constructor(
        private changeDetector: ChangeDetectorRef
    ){

    }

    ngOnInit(): void {

    }
}


    /* ngOnChanges(changes: SimpleChanges): void{
        if (!this.selectedFunc)
            this.selectedFunc = this.displayFunc;

        if (changes.value && changes.value.currentValue !== changes.value.previousValue){
            let val = this.getValue().length;
            if (val > 0) {
                this.searchResults = [this.value];
            } else {
                this.searchResults = [];
            }
            if(this.searchResults.length == 0 && val > 0)
                this.searchResults.push(this.value)
            else
                this.changeDetector.detectChanges();
        }

    }

    selectionChange(event): void {
        if (event.isUserInput)
            this.ngModelChange.emit(event.source.value);
    }

    getList($event): void{

        $event.stopPropagation();
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            if (this.query.trim().length == 0) {
                return;
            }
            let category_id =
                this.serviceData.serviceMethod.call(this.serviceData.binder, this.query, ...this.serviceData.params).subscribe((data) =>{
                    this.searchResults = data;
                    this.changeDetector.detectChanges();
                })

        }, 500);

    }

    openedChange(isOpen): void {
        if (isOpen) {
            this.searchTextBox.nativeElement.focus();
        } else{
            this.query = '';
        }
    }

    clearQuery(): void {
        this.query = '';
        this.searchResults = [];
    }

    getLabel(res: any): void {
        this.displayFunc.call(res, res);
    }

    getValue(): string {
        if (this.selectedFunc && (typeof this.value === 'object' && Object.keys(this.value).length > 0 || typeof this.value !== 'object')) {
            return this.selectedFunc.call(this.value, this.value);
        }
        else {
            return '';
        }
    }

    clearValue(event: MouseEvent): void {
        event.stopPropagation();
        this.searchResults = [];
        this.ngModelChange.emit(null);
    }

}*/
