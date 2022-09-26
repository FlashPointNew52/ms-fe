import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input, OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Utils } from '../../../models/utils';
import { MapConfig } from '../../../services/map.service';
import { YaGeoCollectionDirective } from './ya-geocollection.directive';
import { YaMapRef } from './ya-map-ref';
import { YaSearchDirective } from './ya-search.directive';

export interface IButtons {
    list: boolean;
    panorama: boolean;
    routes: boolean;
    draw: boolean;
}

interface PointInfo {
    stopType: 'urban' | 'underground' | 'railway';
    undergroundData: any;
}

export type GeoData = {
    type: 'area' | 'point' | 'mainPlacemark' | 'objectList';
    subtype: 'business' | 'stop' | 'area' | 'address';
    name: string;
    description: string;
    notice: string;
    coordinates: [] | [][];
    dateCreate?: Date;
    info?: PointInfo
}

export type Sidebar = {
    open: boolean;
    source: 'search' | 'poi' | 'draw' | 'array';
    data: GeoData;
}

const sidebarInit: Sidebar = {
    open: false,
    source: 'array',
    data: {
        type: 'area',
        subtype: 'business',
        name: '',
        description: '',
        notice: '',
        coordinates: [],
    }
};

@Component({
    selector: 'app-ya-map-view',
    templateUrl: './ya-map-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./ya-map-view.component.scss'],
    providers: [DialogService]
})
export class YaMapViewComponent implements OnInit, OnChanges {
    map?: ymaps.Map;
    _mainPlacemark: GeoData = {type: 'mainPlacemark', subtype: 'business', coordinates: [], description: '', name: '', notice: ''};
    buttons: IButtons = {
        list: false,
        panorama: false,
        routes: false,
        draw: false,
    };

    @Input() displayMode: 'selection' | 'definition' = 'selection';
    @Input() fullscreen: boolean = true;
    @Input() mainPlacemarkLabel: string = '';

    @Input() set mainPlacemark(value: any) {
        this._mainPlacemark.coordinates = (value.coordinates[0] && value.coordinates[1] ? value.coordinates : [] );
        this._mainPlacemark.description = value.description;
        this._mainPlacemark.name = value.name;

        if(this.map && this._mainPlacemark.coordinates?.length > 0)
            this.requireCenterAndZoom([this._mainPlacemark.coordinates as [], this._mainPlacemark.coordinates as []]);
    }

    @Output() fullscreenChange: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(YaGeoCollectionDirective) geoCollectionDirective: YaGeoCollectionDirective | undefined;
    @ViewChild(YaSearchDirective) searchDirective: YaSearchDirective | undefined;

    nearPoints: GeoData[] = [];
    searchZones: GeoData[] = [];

    coordinates: [][] = [];

    placemarksColors: any = {
        placemarkHome: {active: '#F27200', inactive: '#7ba05b'},
        placemark: {active: '#F27200', inactive: '#2b4d96'},
        placemarkTemp: {active: '#F27200', inactive: '#F27200'},
        area: {active: '#F27200', inactive: '#003153'},
        default: {active: '#F27200', inactive: '#2b4d96'}
    }

    tempPoint?: any[];
    sidebar: Sidebar = this.getInit();

    state: any = {
        center: [55.751952, 37.600739],
        zoom: 16,
        type: 'yandex#map',
        controls: [],
    };

    mainListParams: any = {}

    stopTypes = Utils.stopTypes;

    constructor(private dialogService: DialogService,
                private cd: ChangeDetectorRef,
                public ref: YaMapRef,
                public config: MapConfig) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.displayMode && changes.displayMode.currentValue != changes.displayMode.previousValue){
            this.nearPoints = [];
            this.searchZones = [];
            this.map?.setCenter([55.751952, 37.600739]);
            if(changes.displayMode.currentValue == 'definition'){
                this.placemarksColors.placemark.inactive = this.placemarksColors.default.inactive;
                this.mainListParams = {
                    displayMainPlacemark: true,
                    structures: [
                        {label: 'Транспортная доступность', array: this.getPoints('stop')},
                        {label: 'Доступность инфраструктуры', array: this.getPoints('business')},
                    ],
                    emptyText: 'Добавьте остановки и объекты инфраструктуры, для этого на карте, на выбранное место, ' +
                        'кликните мышкой, или воспользуйтесь поисковой строкой'
                };
            }else {
                this.placemarksColors.placemark.inactive = this.placemarksColors.placemarkHome.inactive;
                this.mainListParams = {
                    displayMainPlacemark: false,
                    structures: [
                        {label: 'Выделенные локации', array: this.searchZones},
                        {label: 'Выбранные адреса', array: this.nearPoints},
                    ],
                    emptyText: 'Добавьте локации и адреса, для этого активируйте режим рисования или воспользуйтесь поисковой строкой'
                };
                this._mainPlacemark.coordinates = [];
            }
        }

    }

    ngOnInit(): void {
        this.displayMode = this.config?.data?.displayMode || this.displayMode;
        this.fullscreen = this.config?.data?.fullscreen || this.fullscreen;
        if(this.config?.data?.selectedGeo && this.config?.data?.selectedGeo.subtype != 'area')
            this.map?.setCenter(this.config?.data?.selectedGeo.coordinates);
        else
            this.map?.setCenter([55.751952, 37.600739]);
        this.mainPlacemark = this.config?.data?.mainPlacemark;
        this.mainPlacemarkLabel =  this.config?.data?.mainPlacemarkLabel;
    }

    click(): void {
        if(!this.fullscreen){
            this.map?.balloon.close();
        }
        return;
    }

    // addChips(data: any) {
    //     let double;
    //     if(data.type === 'point'){
    //         double = this.chips.find((chips) =>
    //             chips.coordinates[0] == data.coordinates[0] && chips.coordinates[1] == data.coordinates[1]);
    //     } else if(data.type === 'area'){
    //         double = this.chips.find((chips) => chips.coordinates == data.coordinates);
    //     }
    //     if(double){
    //         double.name = data.name;
    //         double.description = data.description;
    //         this.chips = [...this.chips];
    //         this.cd.detectChanges();
    //         return;
    //     } else{
    //         this.newChip = data;
    //         this.buttons.draw = false;
    //     }
    //
    //     this.chipsChange.emit(this.chips);
    //     this.sidebar = sidebarInit;
    //     this.cd.detectChanges();
    //
    // }
    //
    // clearMap($event?: any) {
    //     this.coordinates = {};
    //     this.geoArray = [...this.chips];
    //     this.cd.detectChanges();
    // }
    //
    // showOnMap($event?: any) {
    //     if($event?.type === "all"){
    //         this.geoArray = [...this.chips];
    //         this.coordinates = {};
    //     } else if($event?.type === 'area' && this.coordinates != $event){
    //         this.geoArray = [$event];
    //         this.coordinates = {};
    //     } else if($event?.type === 'point'){
    //         this.geoArray = [$event];
    //         this.coordinates = {};
    //     } else{
    //         this.geoArray = [...this.chips];
    //         this.coordinates = {};
    //     }
    //     this.cd.detectChanges();
    // }
    //
    // selectChips(event: any){
    //     this.chipsDirective?.selectChips(this.chips.indexOf(event));
    // }

    requireCenterAndZoom(bounds?: number[][]){
        if(!bounds){
            let mapBounds = this.map?.geoObjects.getBounds();
            let collectionBounds = this.geoCollectionDirective?.getBounds();
            if(mapBounds?.length && collectionBounds?.length){
                bounds = [
                    [
                        mapBounds[0][0] <= collectionBounds[0][0] ? mapBounds[0][0] : collectionBounds[0][0],
                        mapBounds[0][1] <= collectionBounds[0][1] ? mapBounds[0][1] : collectionBounds[0][1]
                    ],[
                        mapBounds[1][0] >= collectionBounds[1][0] ? mapBounds[1][0] : collectionBounds[1][0],
                        mapBounds[1][1] >= collectionBounds[1][1] ? mapBounds[1][1] : collectionBounds[1][1]
                    ]
                ];
            } else{
                bounds = collectionBounds || mapBounds || undefined;
            }
        }
        if(bounds){
            ymaps.util.requireCenterAndZoom(
                this.map?.getType() || 'yandex#map',
                bounds,
                this.map!.container.getSize(),
                {inscribe: true, margin: [0, 370, 0, 0]}
            ).then((result) => {
                this.map!.setCenter(result.center, result.zoom > 16 ? 16 : result.zoom);
            });
        }

    }

    ready($event: any) {
        this.map = $event.target;
        if(this.config?.data?.arrays){
            this.nearPoints = this.config?.data?.arrays?.points || [];
            this.searchZones = this.config?.data?.arrays?.zones || [];
        } else{
            this.nearPoints = [];
            this.searchZones = [];
        }
        if(this.displayMode == 'definition'){
            this.placemarksColors.placemark.inactive = this.placemarksColors.default.inactive;
            this.mainListParams = {
                displayMainPlacemark: true,
                structures: [
                    {label: 'Транспортная доступность', array: this.getPoints('stop')},
                    {label: 'Доступность инфраструктуры', array: this.getPoints('business')},
                ],
                emptyText: 'Добавьте остановки и объекты инфраструктуры, для этого на карте, на выбранное место, ' +
                    'кликните мышкой, или воспользуйтесь поисковой строкой'
            };
        } else {
            this.placemarksColors.placemark.inactive = this.placemarksColors.placemarkHome.inactive;
            this.mainListParams = {
                displayMainPlacemark: false,
                structures: [
                    {label: 'Выделенные локации', array: this.searchZones},
                    {label: 'Выбранные адреса', array: this.nearPoints},
                ],
                emptyText: 'Добавьте локации и адреса, для этого активируйте режим рисования или воспользуйтесь поисковой строкой'
            };
            this._mainPlacemark.coordinates = [];
        }



        ymaps.modules.require(['poi.BalloonManager', 'poi.fetcher']).spread(
             function (poi, poiFetcher) {
                 //@ts-ignore
                 poi.prototype.context = this;
                //@ts-ignore
                poi.prototype._getPoiDataAndOpen = function (hotspot, position, zoom) {
                    //@ts-ignore
                    if(this.displayMode == 'selection') return;
                    //@ts-ignore
                    let deferred = ymaps.vow.defer()
                    //@ts-ignore
                    poiFetcher.getProperties(hotspot, zoom).then(function (properties) {
                        if(properties._data.boundedBy[0][0] > properties._data.point[0] ||
                            properties._data.boundedBy[1][0] < properties._data.point[0]
                        )
                            properties._data.point = properties._data.point.reverse();
                        let data: GeoData = {
                            type: 'point',
                            name: properties._data.name.replaceAll('\n', " "),
                            coordinates: properties._data.point,
                            subtype: properties._data.type == 'poi' ? 'business' : properties._data.type,
                            description: '',
                            notice: '',
                        }

                        if(properties?._data?.mtrData){
                            data.info = {
                                stopType: properties._data.mtrData.type,
                                undergroundData: properties._data?.mtrData?.undergroundLineMeta
                            }
                            //@ts-ignore
                            data.description = data?.info?.undergroundData?.name || this.stopTypes[data?.info?.stopType]?.labelLong;
                        } else {
                            data.description = properties?._data?.categories?.join(", ");
                        }

                        //@ts-ignore
                        this.tempPoint = data.coordinates;
                        //@ts-ignore
                        this.deactivateAll();
                        //@ts-ignore
                        this.openSidebar('point', data, 'poi');
                        //@ts-ignore
                        this.searchDirective?.clearSearch();
                        //@ts-ignore
                    }, this);
                    return deferred.promise();
                    //@ts-ignore
                }.bind(this);
            }, undefined, this
        );
        this.cd.detectChanges();

        this.deactivateAll();
        if(this.config?.data?.selectedGeo){
            this.select(this.config?.data?.selectedGeo);
        }else{
            // this.config?.data?.selectedGeo ? this.config?.data?.selectedGeo : undefined;
            this.requireCenterAndZoom();
        }

        // if(this._mainPlacemark.coordinates?.length > 0)
        //     this.requireCenterAndZoom([this._mainPlacemark.coordinates as [], this._mainPlacemark.coordinates as []]);

    }

    exitMap() {
        // this.showOnMap();
        this.ref.close({zones: this.searchZones, points: this.nearPoints});
        this.ref.destroy();
        this.fullscreen = false;
        this.map!.balloon.close();
        this.buttons.routes = false;
        this.buttons.panorama = false;
        this.buttons.draw = false;
        this.coordinates = [];
        this.sidebar = this.getInit();
        // if(this._point.lat && this._point.lon)
        //     this.setCenter();
        // else
            this.requireCenterAndZoom();
        this.fullscreenChange.emit(this.fullscreen);

    }

    getInit(){
        return JSON.parse(JSON.stringify(sidebarInit))
    }

    openSearchPoint(event: any) {
        // let data: GeoData = this.nearPoints.filter((point) => point.coordinates[0] == event.geometry.getCoordinates()[0]
        //                             && point.coordinates[1] == event.geometry.getCoordinates()[1])[0];
        // if(data == null){
        let data: GeoData = {
                type: 'point',
                subtype: 'address',
                coordinates: event.geometry.getCoordinates(),
                name: event.properties.get('text'),
                description: '',
                notice: ''
            }
        this.openSidebar('point', data, 'search');
        this.buttons.draw = false;
        this.tempPoint = undefined;
        this.cd.detectChanges();
        this.deactivateAll(data);
    }

    openDrawZone(event: GeoData | [][], source: Sidebar["source"] = 'draw'){
        let data: GeoData;
        if((event as any).__proto__.constructor.name == 'Array'){
            if((event as []).length < 1) return;
            data =  {
                type: 'area',
                subtype: 'area',
                coordinates: (event as []),
                name: '',
                description: '',
                notice: ''
            }
        } else{
            data = (event as GeoData);
        }

        this.deactivateAll();

        this.openSidebar('area', data, source);
        this.searchDirective?.clearSearch();
    }

    openSidebar(type: GeoData["type"], event?: GeoData, source: Sidebar["source"] = 'array') {
        this.sidebar.open = true;
        this.sidebar.data.type = type;
        this.sidebar.source = source;
        if(type != 'objectList'){
            this.buttons.list = false;
            if(source == 'array'){
                this.buttons.draw = false;
                let bounds = ymaps.util.bounds.fromPoints(
                    type != 'area' ? [event?.coordinates as []] : (event?.coordinates as [][]));
                this.requireCenterAndZoom(bounds);
            }
        } else{
            this.buttons.draw = false;
            this.searchDirective?.clearSearch();
            this.requireCenterAndZoom();
        }

        switch (type) {
            case 'point':
            case 'area':
                this.sidebar.data = {...event!};
                this.sidebar.data.type = type;
                break;

        }
        this.cd.detectChanges();
    }

    hideSidebar() {
        this.sidebar.open = false;
        this.buttons.list = false;
        if(this.sidebar.source == 'draw'){
            this.buttons.draw = false;
            this.coordinates = [];
        } else if(this.sidebar.source == 'search'){
            this.searchDirective?.clearSearch();
        }
        this.sidebar = this.getInit();
        this.tempPoint = undefined;

        this.deactivateAll();
        this.cd.detectChanges();
    }

    saveGeo(data: GeoData, array: GeoData[]) {
        let elem = array.filter( geo => this.sidebar.data.coordinates == geo.coordinates);
        if(elem.length == 0){
            this.sidebar.data.dateCreate = new Date();
            array.push({...this.sidebar.data});
        } else{
            elem[0] = this.sidebar.data;
        }

        if(this.sidebar.data.type == 'point'){
            this.tempPoint = undefined;
            this.recalculateMainListArrays();
        }

        if(this.sidebar.source == 'search')
            this.searchDirective?.clearSearch();
        else if(this.sidebar.source == 'draw'){
            this.coordinates = [];
            this.buttons!.draw = false;
        }
        this.cd.detectChanges();
        this.deactivateAll(this.sidebar.data);
    }

    recalculateMainListArrays(){
        if(this.displayMode == 'definition'){
            this.mainListParams.structures[0].array = this.getPoints('stop');
            this.mainListParams.structures[1].array = this.getPoints('business');
        }
    }

    getPoints(subtype: "business" | "stop"): GeoData[] {
        return this.nearPoints.filter(data => subtype == 'business' ? data.subtype != 'stop' : data.subtype == 'stop');
    }

    fullscreenOn() {
        this.fullscreen = true;
        this.requireCenterAndZoom();
    }

    removeFromArray(elem: GeoData, array: any[]) {
        let index = array.indexOf(elem);
        array.splice(index, 1);
        this.recalculateMainListArrays();
        this.cd.detectChanges();
    }

    select(obj: GeoData) {
        this.openSidebar(obj.type, obj);
        this.tempPoint = undefined;
        this.deactivateAll(obj);
    }

    removeAndClose(elem: GeoData, array: any[]){
        this.removeFromArray(elem, array);
        this.hideSidebar();
    }

    getSaveParams(type: 'area' | 'point') {
        let elem;
        if(type == 'point')
            elem = this.nearPoints.find(data => data.coordinates == this.sidebar.data.coordinates);
        else
            elem = this.searchZones.find(data => data.coordinates == this.sidebar.data.coordinates);
        return !elem ? {
            saveLabel: 'Сохранить',
            cancelLabel: 'Отменить',
            saveAction: this.saveGeo.bind(this),
            cancelAction: this.hideSidebar.bind(this),
            actionClass: '',
            element: elem,
            removeArray: type == 'point' ? this.nearPoints : this.searchZones
        } : {
            saveLabel: 'Удалить',
            cancelLabel: 'Закрыть',
            saveAction: this.removeAndClose.bind(this),
            cancelAction: this.hideSidebar.bind(this),
            actionClass: 'red',
            element: elem,
            removeArray: type == 'point' ? this.nearPoints : this.searchZones
        }
    }

    hideSidebarBySearch() {
        let elem = this.nearPoints.filter( geo => this.sidebar.data.coordinates == geo.coordinates
                                                &&  this.sidebar.data.dateCreate == geo.dateCreate);
        if(elem.length == 0 && this.sidebar.open && this.sidebar.source == 'search')
            this.hideSidebar();
        else
            this.cd.detectChanges();
    }

    deactivateAll(highlighter?: GeoData) {
        let iterator: any = this.map?.geoObjects!.getIterator();
        let element: any;
        while ((element = iterator.getNext()) != iterator.STOP_ITERATION) {
            let type = element.options.get('type');
            if (element!.geometry?.getType() == "Polygon") {
                if(element?.geometry.getCoordinates() == highlighter?.coordinates){
                    element.options.set("fillColor", this.placemarksColors[type].active);
                    element.options.set("strokeColor", this.placemarksColors[type].active);
                } else{
                    element.options.set("fillColor", this.placemarksColors[type].inactive);
                    element.options.set("strokeColor", this.placemarksColors[type].inactive);
                }
            } else if(element!.geometry?.getType() == "Point"){
                if(element?.geometry.getCoordinates() == highlighter?.coordinates){
                    element.options.set('iconColor', this.placemarksColors[type].active);
                } else{
                    element.options.set('iconColor', this.placemarksColors[type].inactive);
                }
            }
        }
        this.geoCollectionDirective?.deactivateAll(highlighter);
        this.searchDirective?.deactivatePlacemarks(highlighter);
    }

    openListBar(event: any) {
        this.deactivateAll();
        if(this.buttons.list){
            this.tempPoint = undefined;
            this.openSidebar('objectList');
        }

        else if(this.sidebar.data.type == 'objectList')
            this.hideSidebar();

    }

    checkSave(arrayName: string) {
        if(this.sidebar.data.dateCreate){
            let array = this[arrayName == 'area' ? 'searchZones' : 'nearPoints'];
            let data = array.filter(el => this.sidebar.data.coordinates == el.coordinates)[0];
            data.name = this.sidebar.data.name;
            data.description = this.sidebar.data.description;
            data.notice = this.sidebar.data.notice;
        }
    }

    deleteBillet(event: GeoData) {
        if(event.subtype == 'area')
            this.removeFromArray(event, this.searchZones);
        else if(event.subtype == 'business' || event.subtype == 'address'){
            this.removeFromArray(event, this.nearPoints);
            this.recalculateMainListArrays();
        } else{
            this.removeFromArray(event, this.nearPoints)
        }

    }
}
