import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'app-chips-map-view',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './chips-map-view.component.html',
    styleUrls: ['./chips-map-view.component.scss']
})
export class ChipsMapViewComponent implements OnChanges{
    @Input() value: Array<any> = [];
    @Input() maxShow: number = 3;
    @Output() showOnMap: EventEmitter<any> = new EventEmitter<any>();

    showed = false;

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

}
