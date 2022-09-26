import { ChangeDetection } from '@angular/cli/lib/config/workspace-schema';
import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChange, SimpleChanges,
} from '@angular/core';
import { YaControlType, YaEvent, YaMapComponent, YaReadyEvent } from 'angular8-yandex-maps';
import { Observable, Subscription } from 'rxjs';
import { EventManager } from './event-manager';

@Directive({
    selector: 'app-ya-control'
})
export class YaFullscreenDirective implements OnInit, OnChanges, OnDestroy{

    private readonly _sub = new Subscription();
    private readonly _eventManager = new EventManager(this._ngZone);
    private _control?: any;

    longButton = `
        <div title="{{ data.title }}" class="{{data.class }} {% if state.enabled == false %}disabled{% endif %}
            {% if state.size == "small" %}small{% endif %}
            {% if state.size == "medium" %}medium{% endif %}
            {% if state.size == "large" %}large{% endif %}
            {% if state.selected %} selected {% endif %}">
            <span class="text">{{ data.content }}</span>
        </div>
    `;

    fullscreenButton = `
        {% if !state.selected %}
            <div class="maximize-container"><span class="pi pi-window-maximize"></span></div>
        {% endif %}
        {% if state.selected %} 
            <div class="fullscreenClose-button"><span>Закрыть</span></div> 
        {% endif %}
    `;

    @Input() type: YaControlType = 'FullscreenControl';
    @Input() parameters: any;
    @Input() selected: boolean = false;
    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() ready: EventEmitter<YaReadyEvent<any>> = new EventEmitter<YaReadyEvent<any>>();
    @Output() fullscreenExit: Observable<YaEvent<ymaps.GeoObject>> = this._eventManager.getLazyEmitter('fullscreenexit');
    @Output() fullscreenEnter: Observable<YaEvent<ymaps.GeoObject>> = this._eventManager.getLazyEmitter('fullscreenenter');
    @Output() click: Observable<YaEvent<ymaps.GeoObject>> = this._eventManager.getLazyEmitter('click');


    constructor(private readonly _ngZone: NgZone,
                private readonly _yaMapComponent: YaMapComponent,
                private cd: ChangeDetectorRef) {}

    ngOnChanges(simpleChange: SimpleChanges): void {
        if (this._control) {
            if(simpleChange?.selected){
                if(simpleChange?.selected.currentValue)
                    this._control.select();
                else
                    this._control.deselect();
            }
            if(simpleChange.parameters?.currentValue?.data?.content){
                this._control.data.set("content", simpleChange.parameters?.currentValue?.data?.content);
            }
        }
    }

    ngOnInit(): void {
        if (this._yaMapComponent.isBrowser) {
            const sub = this._yaMapComponent.map$.subscribe((map) => {
                if (map) {
                    if(this.type === 'FullscreenControl'){
                        this.parameters = { ...this.parameters, options: { ...this.parameters.options, layout: ymaps.templateLayoutFactory.createClass(this.fullscreenButton)}};
                    } else if(this.type !== 'RoutePanel'){
                        this.parameters = { ...this.parameters, options: {...this.parameters.options, layout: ymaps.templateLayoutFactory.createClass(this.longButton)}};
                    }
                    const control = new ymaps.control[this.type](this.parameters);
                    // control.state.enabled = false;
                    this._control = control;


                    /**
                     * RoutePanel ignores state in parameters. API bug
                     */
                    if (
                        control instanceof ymaps.control.RoutePanel &&
                        this.parameters &&
                        this.parameters.state
                    ) {
                        control.routePanel.state.set({ ...this.parameters.state });
                    }
                    map.controls.add(this._control);
                    this._eventManager.setTarget(this._control);
                    this._eventManager.getLazyEmitter('select').subscribe((value) => this.select(true));
                    this._eventManager.getLazyEmitter('deselect').subscribe((value) => this.select(false))
                    this._ngZone.run(() => this.ready.emit({ ymaps, target: this._control }));
                }
            });

            this._sub.add(sub);
        }
    }

    ngOnDestroy(): void {
        if (this._control) {
            this._yaMapComponent?.map$.value?.controls.remove(this._control);
        }
    }

    private select(value: boolean) {
        this.selectedChange.emit(value);
        this.cd.detectChanges();
    }
}
