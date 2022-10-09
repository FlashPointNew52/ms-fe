import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
} from '@angular/core';
import { YaControlType, YaEvent, YaMapComponent, YaReadyEvent } from 'angular8-yandex-maps';
import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '../../../pipes/date.pipe';
import { EventManager } from './event-manager';
import { GeoData } from './ya-map-view.component';


@Directive({
    selector: 'app-ya-search'
})
export class YaSearchDirective implements OnInit, OnChanges, OnDestroy{

    private readonly _sub = new Subscription();
    private readonly _eventManager = new EventManager(this._ngZone);
    private _control?: any;
    private _map?: any;
    private placemarks?: ymaps.GeoObjectCollection;

    @Input() parameters: any;
    @Input() placemarksData: any[] = [];
    @Output() ready: EventEmitter<YaReadyEvent<any>> = new EventEmitter<YaReadyEvent<any>>();
    @Output() click: Observable<YaEvent<ymaps.GeoObject>> = this._eventManager.getLazyEmitter('click');
    @Output() submit: Observable<YaEvent<ymaps.GeoObject>> = this._eventManager.getLazyEmitter('submit');

    @Output() addPoint: EventEmitter<any> = new EventEmitter<any>();
    @Output() newBounds: EventEmitter<any> = new EventEmitter<any>();
    @Output() cleared: EventEmitter<any> = new EventEmitter<any>();

    constructor(private readonly _ngZone: NgZone,
                private readonly _yaMapComponent: YaMapComponent,
                private cd: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.placemarksData?.currentValue && changes.placemarksData?.currentValue != changes.placemarksData?.previousValue){
            if(changes.placemarksData?.currentValue?.length > 0){

                // this.createPolygon();
                // this.drawPath = new ymaps.Polygon([this.coordinates], {}, this.style);
                // this._map!.geoObjects.add(this.drawPath);
                // this.bounds = this.drawPath!.geometry!.getBounds();
            }
        }
    }

    ngOnInit(): void {
        if (this._yaMapComponent.isBrowser) {
            const sub = this._yaMapComponent.map$.subscribe((map) => {
                if (map) {
                    this._map = map;
                    let formLayout = ymaps.templateLayoutFactory.createClass(`
                        <div class="input-wrapper">
                            <div>
                                <input placeholder="Город, адрес, метро, ...">
                                <div class="clear pi pi-times"></div>
                            </div>
                            <div class="suggest-wrapper"></div>
                        </div>
                    `,{
                        build: function () {
                            formLayout.superclass.build.call(this);
                            // @ts-ignore
                            let parent = this._parentElement;
                            // @ts-ignore
                            this.suggestWrapper = parent.querySelector(".suggest-wrapper");
                            // @ts-ignore
                            this.suggestWrapper.addEventListener("click", this.select.bind(this));
                            parent.querySelector(".clear").addEventListener("click", this.clear.bind(this));
                            parent.classList.add("search-wrapper");
                            // @ts-ignore
                            this.input = parent.querySelector("input");
                            // @ts-ignore
                            this.inputWrapper = parent.querySelector(".input-wrapper");
                            // @ts-ignore
                            this.input.addEventListener("focus",  (event) => {
                                // @ts-ignore
                                this.inputWrapper.classList.add("focused");
                            });
                            // @ts-ignore
                            this.input.addEventListener("keyup", this.suggest.bind(this));
                            document.addEventListener("click", this.offclick.bind(this))
                        },

                        suggest: function(event: any){
                            // @ts-ignore
                            clearTimeout(this.timeout);
                            // @ts-ignore
                            // @ts-ignore
                            this.timeout = setTimeout(() => {
                                // @ts-ignore
                                let suggestWrapper = this.suggestWrapper;
                                // @ts-ignore
                                let inputWrapper = this.inputWrapper;
                                // @ts-ignore
                                // control?.clear();
                                if(event?.target.value.length < 3){
                                    suggestWrapper.innerHTML = "";
                                    return;
                                }
                                // @ts-ignore
                                let data = this;
                                // @ts-ignore
                                let value = event.target.value;
                                if(event.key == "Enter"){
                                    control.search(value);
                                    // @ts-ignore
                                    inputWrapper.classList.remove("focused");
                                    // @ts-ignore
                                    this.input.blur();
                                    return;
                                }
                                // @ts-ignore
                                ymaps.suggest(value, {
                                    results: 10,
                                    provider: "yandex#map",
                                    boundedBy: map.getBounds()
                                }).then( (items: any[]) => {
                                    suggestWrapper.innerHTML = items.reduce((html: string, item) => {
                                        let titles = item.displayName.split(",");
                                        let mainText = "";
                                        let subText = "";
                                        if(titles.length > 2){
                                            mainText = titles.slice(0, 2).join(', ');
                                            subText = titles.slice(2).join(", ");
                                        } else{
                                            mainText = titles.shift();
                                            subText = titles.join(", ");
                                        }
                                        mainText = mainText.replace(new RegExp(value.replaceAll(" ", "|"), "gi"), (match) => `<mark>${match}</mark>`);

                                        return html+= `<div class="suggest">
                                                    <span class="main-text">${mainText}</span>
                                                    <span class="dop-text">${subText}</span>
                                                </div>`

                                    }, "");

                                    // @ts-ignore
                                    data.items = items;
                                });
                            }, 100);
                        },

                        select: function (event: any) {
                            let node = event.target;
                            if(node.tagName == "SPAN")
                                node = node.parentNode;
                            else if(node.tagName == "MARK")
                                node = node.parentNode.parentNode;
                            // @ts-ignore
                            let index = Array.from(this.suggestWrapper.childNodes).indexOf(node);
                            // @ts-ignore
                            this.items[index].value;
                            // @ts-ignore
                            this.input.value = this.items[index].value;
                            // @ts-ignore
                            control.search(this.input.value);
                            // @ts-ignore
                            this.inputWrapper.classList.remove("focused");
                        },
                        clear: function (event: any) {
                            // @ts-ignore
                            this.input.value = "";
                            // @ts-ignore
                            this.suggestWrapper.innerHTML = "";
                            // @ts-ignore
                            control?.clear();
                        },

                        offclick: function (event: any) {
                            if (event.target.tagName == "INPUT") return;
                            // @ts-ignore
                            this.inputWrapper.classList.remove("focused");
                        }
                    });

                    this.parameters = { ...this.parameters, options: {
                            ...this.parameters.options,
                            useMapBounds: true,

                            layout: formLayout
                        }};
                    const control = new ymaps.control['SearchControl'](this.parameters);
                    this._control = control;
                    this.placemarks = new ymaps.GeoObjectCollection({ properties: {
                            hasHint: false,
                        }}, {
                    });
                    this.placemarks.events.add(['click'],  (event: any) =>  {
                        let iterator: any = this.placemarks!.getIterator();
                        let element: any;
                        this.addPoint.emit(event._sourceEvent.originalEvent.target);
                        while ((element = iterator.getNext()) != iterator.STOP_ITERATION) {
                            if (element!.geometry?.getType() == "Point") {
                                if(event._sourceEvent.originalEvent.target == element){
                                    element.options.set("iconColor", this.parameters.iconActiveColor);
                                } else{
                                    element.options.set("iconColor", this.parameters.iconColor);
                                }
                            }
                        }
                    });

                    map.controls.add(control);

                    map.geoObjects.add(this.placemarks);
                    this._eventManager.setTarget(control);
                    this._eventManager.getLazyEmitter('load').subscribe((value) => this.selector(value));
                    this._eventManager.getLazyEmitter('clear').subscribe((value) => this.clear());
                    this._eventManager.getLazyEmitter('resultselect').subscribe((value) => this.resultShow(value))
                    this._ngZone.run(() => this.ready.emit({ ymaps, target: control }));
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

    private selector(value: YaEvent) {
        this.placemarks?.removeAll();
        let unique = this._control.getResultsArray()[0];
        unique.options._options.hasBalloon = false;
        unique.options._options.preset = this.parameters.options.preset;
        this.placemarks?.add(unique);
        this.newBounds.emit(this.placemarks!.getBounds());
        this.addPoint.emit(unique);
    }

    private resultShow(value: YaEvent) {
        (this.placemarks?.getParent() as any)._map.balloon.close();
    }

    private clear(){
        this.placemarks?.removeAll();
        this.cleared.emit();
    }

    public clearSearch(){
        this._control.clear();
        this._control._layout.input.value = '';
        this._control._layout.suggestWrapper.innerHTML = '';
        this.clear();
    }

    public deactivatePlacemarks(highlighter?: GeoData){
        let iterator: any = this.placemarks!.getIterator();
        let element: any;
        while ((element = iterator.getNext()) != iterator.STOP_ITERATION) {
            if (element!.geometry?.getType() == "Point") {
                if(element?.geometry.getCoordinates() == highlighter?.coordinates)
                    element.options.set('iconColor', this.parameters.iconActiveColor);
                else
                    element.options.set("iconColor", this.parameters.iconColor);
            }
        }
    }
}
