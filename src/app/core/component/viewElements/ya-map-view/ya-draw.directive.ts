import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    Input, NgZone,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { YaMapComponent } from 'angular8-yandex-maps';
import { Subscription } from 'rxjs';
import { EventManager } from './event-manager';
import GeoObject = ymaps.GeoObject;
import IPane = ymaps.IPane;


@Directive({
    selector: 'app-ya-draw'
})
export class YaDrawDirective implements OnInit, OnChanges, OnDestroy{
    private readonly _sub = new Subscription();
    private readonly _eventManager = new EventManager(this._ngZone);

    @Input() drawEnabled: boolean = false;
    @Input() coordinates?: [][];
    @Input() style: any;
    @Output() coordinatesChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() drawDataChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() newBounds: EventEmitter<any> = new EventEmitter<any>();
    @Output() click: EventEmitter<[][]> = new EventEmitter<[][]>();

    private drawActive: boolean = true;
    private _map?: ymaps.Map;
    private pane?: ymaps.IPane;
    private drawPath?: ymaps.IGeoObject;


    paintProcess: any;


    ngOnChanges(changes: SimpleChanges): void {
        if(this._map){
            if(changes.coordinates?.currentValue != null  && changes.coordinates?.currentValue != changes.coordinates?.previousValue){
                this._map!.geoObjects.remove(this.drawPath as GeoObject);
                if(changes.coordinates?.currentValue?.length > 0){
                    this.createPolygon();
                    this.newBounds.emit(this.drawPath!.geometry!.getBounds());
                }
            }
            if(changes?.drawEnabled?.currentValue != null && changes.drawEnabled?.currentValue != changes.drawEnabled?.previousValue){
                if(changes?.drawEnabled?.currentValue){
                    this.drawActive = true;
                } else{
                    this.drawActive = false;
                    this.coordinates = undefined;
                    this._map!.geoObjects.remove(this.drawPath as GeoObject);
                }
            }
        }

    }

    constructor(private readonly _yaMapComponent: YaMapComponent, private cd: ChangeDetectorRef,
                private readonly _ngZone: NgZone) { }

    ngOnInit(): void {
        if (this._yaMapComponent.isBrowser) {
            const sub = this._yaMapComponent.map$.subscribe((map) => {
                if (map) {
                    map.events.add('mousedown', this.startDraw as () => void, this);
                    map.events.add('mouseup', this.stopDraw as () => void, this);
                    this._map = map;
                }
            });

            this._sub.add(sub);
        }
    }

    ngOnDestroy(): void {
        if (this.drawPath) {
            this._map!.geoObjects.remove(this.drawPath as GeoObject);
        }
    }

    public startDraw(event: any) {
        if (this.drawActive && this.drawEnabled && event._sourceEvent.originalEvent.domEvent.originalEvent.button == 0) {
            this.drawActive = true;
            this.paintProcess = this.paintOnMap();
        }
    }

    private stopDraw(event: any) {
        if (this.paintProcess && event._sourceEvent.originalEvent.domEvent.originalEvent.button == 0) {
            this.coordinates = this.paintProcess.finishPaintingAt();
            this.paintProcess = null;

            if (this.drawActive) {
                this._map!.behaviors.enable('drag');
                this.createPolygon();
                this.coordinatesChange.emit(this.coordinates);
            }
            this.drawActive = false;
            this.cd.detectChanges();
        }
    }

    paintOnMap(): any  {
        if(this._map){
            this._map.behaviors.disable('drag');
            let style = {
                strokeColor: '#003153',
                strokeOpacity: 0.7,
                strokeWidth: 1,
                fillColor: '#252f32',
                fillOpacity: 0.4
            };


            this.pane = new ymaps.pane.EventsPane(this._map, {
                zIndex: 99999,
                transparent: true
            });

            this._map.panes.append('ext-paint-on-map', this.pane);

            let canvas = document.createElement('canvas');
            let ctx2d = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            ctx2d!.globalAlpha = style.strokeOpacity;
            ctx2d!.strokeStyle = style.strokeColor;
            ctx2d!.lineWidth = style.strokeWidth;

            canvas.style.width = '100%';
            canvas.style.height = '100%';

            this.pane.getElement().appendChild(canvas);

            let bounds = this._map.getBounds();
            let latDiff = bounds[1][0] - bounds[0][0];
            let lonDiff = bounds[1][1] - bounds[0][1];

            let coordinates: any[] = [];

            canvas.onmousemove = (ev) => {
                coordinates.push([ev.offsetX, ev.offsetY]);
                ctx2d!.clearRect(0, 0, canvas.width, canvas.height);
                ctx2d!.beginPath();
                ctx2d!.moveTo(coordinates[0][0], coordinates[0][1]);
                for (let i = 1; i < coordinates.length; i++) {
                    ctx2d!.lineTo(coordinates[i][0], coordinates[i][1]);
                }
                ctx2d!.stroke();
            }

            return  {
                finishPaintingAt: () => {

                    this._map!.panes.remove(this.pane as IPane);

                    let calc = Math.floor(coordinates.length / 40);
                    let coords: any[] = [];
                    for (let i = 0; i < coordinates.length; i++) {
                        if (i % calc == 0) {
                            let lon = bounds[0][1] + (coordinates[i][0] / canvas.width) * lonDiff;
                            let lat = bounds[0][0] + (1 - coordinates[i][1] / canvas.height) * latDiff;
                            coords.push([lat, lon]);
                        }
                    }

                    return coords;
                }
            };
        }
    }

    private createPolygon(){
        this.drawPath = new ymaps.Polygon(
            [this.coordinates],
            {
                balloonOffset: [3, -200],
            },{
                strokeColor: this.style.active,
                fillColor: this.style.active,
                strokeOpacity: 1,
                strokeWidth: 1,
                fillOpacity: 0.15,
                hasBalloon: true,
                hasHint: false,
                //@ts-ignore
                type: 'area',
            });
        this._eventManager.setTarget(this.drawPath);
        this._eventManager.getLazyEmitter('click').subscribe(() => {
            this.click.emit(this.coordinates);
            this.drawPath?.options.set('strokeColor', this.style.active);
            this.drawPath?.options.set('fillColor', this.style.active);
        });

        this._map!.geoObjects.add(this.drawPath);

    }


}
