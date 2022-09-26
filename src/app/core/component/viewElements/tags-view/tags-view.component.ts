import { Component, Input } from '@angular/core';
import { Tags } from '../../../models/tags';

@Component({
    selector: 'app-tags-view',
    templateUrl: './tags-view.component.html',
    styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent{
    @Input() value: any[] = [];

    constructor() { }

}
