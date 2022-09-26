import {
    AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'app-more-less-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './more-less-view.component.html',
    styleUrls: ['./more-less-view.component.scss']
})
export class MoreLessViewComponent implements OnInit, AfterContentChecked {
    @Input() maxLines: number = 4;
    @Input() lineHeight: number = 30;
    @Input() elementSize: number = 0;

    showed: boolean = false;
    _maxHeight: any = '30px';

    constructor(private cd: ChangeDetectorRef,
                private elementRef: ElementRef) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(): void {
         setTimeout(()=> {
             this._maxHeight = 0;
             for(let [i, value] of this.elementRef.nativeElement.children.item(0).childNodes.entries()){
                 if(i < this.maxLines){
                     this._maxHeight += value.offsetHeight || 30;
                 }
             }
             this._maxHeight += 'px';
             this.cd.detectChanges();
         });

    }

    changeSize() {
        this.showed = !this.showed;
        this.cd.detectChanges();
    }
}
