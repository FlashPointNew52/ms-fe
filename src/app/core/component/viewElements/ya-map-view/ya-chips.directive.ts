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
    selector: 'app-ya-chips'
})
export class YaChipsDirective implements OnInit, OnChanges, OnDestroy{

    private readonly _sub = new Subscription();
    private readonly _eventManager = new EventManager(this._ngZone);
    private _control?: any;


    @Input() chips: any[]= [];
    @Input() parameters: any;

    @Input() set newChip(val: any){
        if(this._control){
            this._control.add(val);
        }
    }

    @Output() chipsChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() selected: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() ready: EventEmitter<YaReadyEvent<any>> = new EventEmitter<YaReadyEvent<any>>();
    @Output() click: Observable<YaEvent<ymaps.GeoObject>> = this._eventManager.getLazyEmitter('click');

    constructor(private readonly _ngZone: NgZone, private readonly _yaMapComponent: YaMapComponent,
                private cd: ChangeDetectorRef) {}

    ngOnChanges(simpleChange: SimpleChanges): void {
        if(this._control && simpleChange?.chips?.currentValue)
            this._control.redraw();
    }

    ngOnInit(): void {
        if (this._yaMapComponent.isBrowser) {
            const sub = this._yaMapComponent.map$.subscribe((map) => {
                if (map) {
                    function ChipContainerClass (options?: any) {
                        // @ts-ignore
                        ChipContainerClass.superclass.constructor.call(this, options);
                        // @ts-ignore
                        this.chipsContainer = null;
                        // @ts-ignore
                        this._mapEventGroup = null;
                        // @ts-ignore
                        this.context = options.context;
                        // @ts-ignore
                        this.popup = null;
                        // @ts-ignore
                        this.selectedIndex = -1;
                        // @ts-ignore
                        this.hoverIndex = -1;
                    }

                    ymaps.util.augment(ChipContainerClass, ymaps.collection.Item, {
                        // @ts-ignore
                        onAddToMap: function (map: any) {
                            // @ts-ignore
                            ChipContainerClass.superclass.onAddToMap.call(this, map);
                            // @ts-ignore
                            this._lastCenter = null;
                            // @ts-ignore
                            this.getParent().getChildElement(this).then(this._onGetChildElement, this);
                        },

                        onRemoveFromMap: function (oldMap: any) {
                            // @ts-ignore
                            this._lastCenter = null;
                            // @ts-ignore
                            if (this.chipsContainer) {
                                // @ts-ignore
                                this.chipsContainer.remove();
                                // @ts-ignore
                                this._mapEventGroup.removeAll();
                            }
                            // @ts-ignore
                            ChipContainerClass.superclass.onRemoveFromMap.call(this, oldMap);
                        },
                        // @ts-ignore
                        _onGetChildElement: function (parentDomContainer: any) {
                            parentDomContainer.classList.add("chips-wrapper");
                            parentDomContainer.innerHTML =
                                        `<div class="arrow left"><i class="pi pi-chevron-left"></i></div>
                                         <div class="chips-container">
                                            <div class="chips all selected">
                                            <span class="name">Все</span><span class="delete"></span></div>
</div>
                                         <div class="arrow right"><i class="pi pi-chevron-right"></i></div>
                                        `;
                            // @ts-ignore
                            parentDomContainer.querySelector(".name")!.addEventListener("click", this.select.bind(this, null, null));
                            // @ts-ignore
                            parentDomContainer.querySelector(".chips-container")!.addEventListener("wheel", this.scrollContainer.bind(this));
                            // @ts-ignore
                            parentDomContainer.querySelector(".arrow.left")!.addEventListener("mousedown", this.scrollChips.bind(this, 'left'));
                            // @ts-ignore
                            parentDomContainer.querySelector(".arrow.right")!.addEventListener("mousedown", this.scrollChips.bind(this,'right'));
                            // @ts-ignore
                            this.chipsContainer = parentDomContainer.querySelector(".chips-container");
                            // @ts-ignore
                            this.context.chips.forEach((chips: any) =>{
                                // @ts-ignore
                                this.add(chips, true);
                                // let html = this.chipsContainer.children.item(index + 1);
                                // html!.querySelector('.name').innerText = chips.name;

                                // html!.querySelector('.description').innerText = chips.description;
                            });
                            // @ts-ignore
                            this._mapEventGroup = this.getMap().events.group();
                        },

                        scrollChips: function(direction: any) {
                            // @ts-ignore
                            this.chipsContainer.scrollBy(
                                {
                                    top: 0,
                                    left: direction == 'right' ? 200 : -200,
                                    behavior: 'smooth'
                                });
                        },

                        scrollContainer: function($event: any) {
                            // @ts-ignore
                            this.chipsContainer.scrollBy(
                                {
                                    top: 0,
                                    left: $event.deltaY,
                                    behavior: 'smooth'
                                });
                        },

                        close: function(event: any) {

                        },

                        add: function (element: any, notPush?: boolean){
                            if(!notPush)
                                // @ts-ignore
                                this.context.chips.push(element);
                            // @ts-ignore
                            let el = document.createElement('div');
                            el.className = "chips";
                            let child = document.createElement('span');
                            child.className = "name";
                            child.innerText = element.name;
                            // @ts-ignore
                            child.addEventListener("click", this.select.bind(this, element, el));
                            el.appendChild(child);
                            child = document.createElement('span');
                            child.innerHTML = `<i class="pi pi-times"></i>`;
                            child.className = "delete";
                            // @ts-ignore
                            child.addEventListener("click", this.remove.bind(this, element, el));

                            el.appendChild(child);
                            // @ts-ignore
                            this.chipsContainer.append(el);
                            // @ts-ignore
                            // this.select(element, el);
                        },

                        redraw: function() {
                            // @ts-ignore
                            this.context.chips.forEach((chips: any, index) =>{
                                // @ts-ignore
                                let html = this.chipsContainer.children.item(index + 1);
                                html!.querySelector('.name').innerText = chips.name;
                                // html!.querySelector('.description').innerText = chips.description;
                            });
                        },

                        select: function (element: any, parent: HTMLElement){
                            // @ts-ignore
                            let children = this.chipsContainer.children;

                            for(let i = 0; i < children.length; i++){
                                children.item(i)!.classList.remove("selected");
                            }
                            // @ts-ignore
                            this.context.selected.emit(element || {type: "all"});
                            if(!element){
                                children.item(0)!.classList.add("selected");
                            } else
                                parent.classList.add("selected");
                        },

                        selectByIndex: function(index: number){
                            // @ts-ignore
                            let children = this.chipsContainer.children;

                            for(let i = 0; i < children.length; i++){
                                children.item(i)!.classList.remove("selected");
                            }
                            children.item(index + 1).classList.add("selected");
                        },

                        remove: function (element: any, parent: HTMLElement){
                            // @ts-ignore
                            this.context.chips.splice(this.context.chips.indexOf(element), 1);
                            parent.remove();
                            // @ts-ignore
                            this.context.chipsChange.emit(this.context.chips);
                            // @ts-ignore
                            this.context.deleted.emit(element);

                        },
                    });
                    // @ts-ignore
                    const control = new ChipContainerClass({...this.parameters.options, context: this});

                    // this.parameters = { ...this.parameters, options: {...this.parameters.options}};

                    // control.state.enabled = false;
                    this._control = control;

                    map.controls.add(control);
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

    selectChips(index: number){
        this._control.selectByIndex(index);
    }
}
