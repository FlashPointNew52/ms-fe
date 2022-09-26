import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { YaApiLoaderService, YaMapComponent } from 'angular8-yandex-maps';

@Directive({
    selector: 'app-ya-panorama'
})
export class YaPanoramaDirective implements OnInit{

    @Input() set active(value: boolean) {
        value ? this.enable() : this.disable();
    }

    _manager?: ymaps.panorama.Manager;

    constructor(private readonly _yaMapComponent: YaMapComponent) { }

    ngOnInit(): void {
        if (this._yaMapComponent.isBrowser) {
            this._yaMapComponent.map$.subscribe((map) => {
                if (map) {
                    map.getPanoramaManager().then( manager => this._manager = manager)
                }
            });
        }
    }

    enable(){
        // this._manager?.getPlayer().setPanorama(.);
        this._manager?.enableLookup();
    }

    disable(){
        this._manager?.disableLookup();
        this._manager?.closePlayer();
    }
}
