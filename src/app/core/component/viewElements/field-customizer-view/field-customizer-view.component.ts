import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Utils } from '../../../models/utils';


export interface Field {
    [key: string]: {
        label: string,
        sections: {
            [key: string]: any
        }
    }
}

export interface SelectedField {
    [key: string]: {
        [key: string]: any[]
    }
}

@Component({
    selector: 'app-field-customizer-view',
    templateUrl: './field-customizer-view.component.html',
    styleUrls: ['./field-customizer-view.component.scss']
})
export class FieldCustomizerViewComponent implements OnInit, OnChanges {
    @Input() fields: Field = {};
    currentChapter: any;
    selected: SelectedField = {};
    utils = Utils;
    radio: any = "1";

    sidebar = {
        visible: false,
        page: 0,
        data: {} as any,

        openPage: function(page: number, data: any){
            this.page = page;
            this.data = data
        }
    };

    constructor() { }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.fields && changes.fields.currentValue != changes.fields.previousValue){
            this.recalcSelected();
        }
    }

    public show(){
        this.sidebar.visible = true;
    }

    recalcSelected(){
        for(let data in this.fields){
            let section: any = {};
            for(let sec in this.fields[data].sections)
                section[sec] = [];
            this.selected[data] = section;
        }
    }

    addField() {
        // if(!this.selected[this.currentChapter])
        this.selected[this.currentChapter][this.sidebar.data.section].push(this.sidebar.data.field);
        // selected.push({label: sidebar.data.label, value: textAreaElement.value});
        this.sidebar.openPage(0, {})
    }

    remove(section: any, field: any) {
        const array = this.selected[this.currentChapter][section]
        const i = array.indexOf(field);
        if(i >= 0)
            array.splice(i, 1);
        this.sidebar.openPage(0, {})
    }
}
