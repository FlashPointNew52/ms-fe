import {
    ChangeDetectorRef,
    Directive, DoCheck,
    EventEmitter,
    Input, IterableDiffer, IterableDiffers,
    NgZone,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { YaMapComponent } from 'angular8-yandex-maps';
import { Subscription } from 'rxjs';
import { EventManager } from './event-manager';
import { GeoData } from './ya-map-view.component';

@Directive({
    selector: 'app-ya-geocollection'
})
export class YaGeoCollectionDirective implements OnInit,DoCheck, OnDestroy{

    private readonly _sub = new Subscription();
    private readonly _eventManager = new EventManager(this._ngZone);
    private _map?: ymaps.Map;
    private _collection?: ymaps.GeoObjectCollection;

    @Input() collection: GeoData[]= [];
    @Input() style: any;
    @Output() click: EventEmitter<GeoData> = new EventEmitter<GeoData>();
    @Output() changeData: EventEmitter<any> = new EventEmitter<any>();

    collectionDiffer: IterableDiffer<GeoData>;

    constructor(private iterableDiffers: IterableDiffers,
                private readonly _ngZone: NgZone,
                private readonly _yaMapComponent: YaMapComponent,
                private cd: ChangeDetectorRef) {
        this.collectionDiffer = iterableDiffers.find(this.collection).create();
    }


    ngOnInit(): void {
        if (this._yaMapComponent.isBrowser) {
            const sub = this._yaMapComponent.map$.subscribe((map) => {
                if (map) {
                    this._map = map;
                    this._collection = new ymaps.GeoObjectCollection({ properties: {

                        }}, {
                        hasHint: false,
                        iconColor: '#004D80',
                        hideIconOnBalloonOpen: false,
                        hasBalloon: true,
                        balloonPanelMaxMapArea: 0
                    });
                    this._eventManager.setTarget(this._collection);
                    this._eventManager.getLazyEmitter('click').subscribe(((event: any) => {
                        let find = this.collection.filter(element => element.coordinates ==
                            (event.event.getSourceEvent()?.originalEvent.target as any).properties._data.data.coordinates);
                        if(find.length > 0){
                            this.click.emit(find[0]);
                        }
                        this.deactivateAll();

                        event.event._sourceEvent.originalEvent.target.options.set("fillColor", this.style.active);
                        event.event._sourceEvent.originalEvent.target.options.set("strokeColor", this.style.active);

                    }))
                    // @ts-ignore
                    map.geoObjects.add(this._collection);
                }
            });

            this._sub.add(sub);
        }
    }

    ngDoCheck() {
        let changes = this.collectionDiffer.diff(this.collection);
        if (changes) {
            let i = 0;
            changes.forEachRemovedItem(el => {

                //@ts-ignore
                this._collection?.splice(el.previousIndex-i, 1);
                i++;
            });
            changes.forEachAddedItem(el => {
                if(el.item.type == 'point'){
                    this._collection?.add(new ymaps.Placemark(
                        el.item.coordinates,
                        {data: el.item},
                        {

                        }
                    ));
                } else if(el.item.type == 'area'){
                    this._collection?.add(new ymaps.Polygon(
                        [el.item.coordinates],
                        {
                            data: el.item,
                        },{
                            strokeOpacity: 1,
                            strokeWidth: 1,
                            strokeColor: this.style.active,
                            fillColor: this.style.active,
                            fillOpacity: 0.15
                        }
                    ));
                }
            });
        }
    }

    getBounds(){
        return this._collection?.getBounds();
    }

    deactivateAll(highlighter?: GeoData){
        let iterator: any = this._collection!.getIterator();
        let element: any;
        while ((element = iterator.getNext()) != iterator.STOP_ITERATION) {
            if (element!.geometry?.getType() == "Polygon") {
                if(element.properties._data.data.coordinates == highlighter?.coordinates){
                    element.options.set("fillColor", this.style.active);
                    element.options.set("strokeColor", this.style.active);
                } else{
                    element.options.set("fillColor", this.style.inactive);
                    element.options.set("strokeColor", this.style.inactive);
                }
            }
        }
    }

    ngOnDestroy(): void {
        if (this._collection) {
            this._map!.geoObjects.remove(this._collection);
            this.cd.detectChanges();
        }
    }
}
