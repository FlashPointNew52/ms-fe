import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter, forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-overlay-panel',
    templateUrl: './overlay-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./overlay-panel.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OverlayPanelComponent),
        multi: true
    }],
})
export class OverlayPanelComponent implements OnInit, ControlValueAccessor {

    @ViewChild(OverlayPanel) overlayPanel?: OverlayPanel;

    @Input() options: any[] = [];
    @Input() multiply: boolean = true;
    @Input() label = "";
    @Input() value: any[] = [];

    alreadyAdd: any = {};
    clickHeader: any;

    public onChange = (val: any) => { };
    public onTouched = (val: any) => { };

    page: number = 0;

    constructor(public elementRef: ElementRef,
                private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
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

    public toggle(event: any){
        if(!this.overlayPanel?.overlayVisible && this.value.length == 0){
            this.page = 0;
        }else
            this.page = 1;
        this.overlayPanel?.toggle(event);
        this.clickHeader = event;
    }

    addField(option: any) {
        if(!this.multiply && !this.alreadyAdd[option.code] || this.multiply){
            this.value.push({label: option.label, description: '', code: option.code});
            this.page = 1;
            this.alreadyAdd[option.code] = true;
            this.onChange(this.value);
        }

    }

    remove(i: number, code: string) {
        this.value.splice(i, 1);
        if(this.value.length == 0){
            this.page = 0;
        }
        if(!this.multiply){
            this.alreadyAdd[code] = false
        }
        this.onChange(this.value);
    }

    overlayResize(event: any, overlay: any) {
        setTimeout(() => overlay.align());
    }
}
