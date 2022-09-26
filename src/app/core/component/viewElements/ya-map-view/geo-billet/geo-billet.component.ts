import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utils } from '../../../../models/utils';
import { GeoData } from '../ya-map-view.component';

@Component({
    selector: 'app-geo-billet',
    templateUrl: './geo-billet.component.html',
    styleUrls: ['./geo-billet.component.scss']
})

export class GeoBilletComponent implements OnInit {
    @Input() data?: GeoData;

    stopTypes = Utils.stopTypes as any;

    @Output() delete: EventEmitter<GeoData> = new EventEmitter<GeoData>();

    constructor() { }

    ngOnInit(): void {
    }

}
