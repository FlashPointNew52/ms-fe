import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { Utils } from '../../../models/utils';
import {
    Field,
    FieldConfig,
    FieldCustomizerService,
    FieldType,
    Section,
    Sections
} from '../../../services/field-customizer.service';

export interface SelectedField {
    [key: string]: {
        [key: string]: Map<Field, FieldConfig>
    }
}

export interface Sidebar {
    visible: boolean;
    page: number;
    section: keyof Sections;
    group?: keyof Section["groups"];
    field?: Field;
    alreadyAdd: boolean;
}

@Component({
    selector: 'app-field-customizer-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './field-customizer-view.component.html',
    styleUrls: ['./field-customizer-view.component.scss']
})
export class FieldCustomizerViewComponent implements OnInit, OnChanges {
    @Input() sections: Sections;
    @Input() header: string = '';
    selected: SelectedField = {};
    utils = Utils;
    selectedConfig?: FieldConfig;
    FieldType = FieldType;

    sidebar: Sidebar = {
        field: undefined,
        page: 0,
        section: "MAIN",
        group: undefined,
        visible: false,
        alreadyAdd: false
    };

    toMainPage(){
        this.sidebar.page = 0;
    }

    toSecondPage(section: keyof Sections, group: keyof Section["groups"], field: Field){
        this.sidebar.section = section;
        this.sidebar.group = group;
        this.sidebar.field = field;
        // if(field.config.length < 2){
        //     this.addField();
        //     return;
        // }
        this.sidebar.page = 1;
        this.sidebar.alreadyAdd = this.alreadyAdd(group, field);

        let config = this.selected[section][group].get(field);
        if(config){
            this.selectedConfig = config;
        } else
            this.selectedConfig = field.config[0];
        this.cd.detectChanges();
    }

    constructor(private fieldCustomizerService: FieldCustomizerService,
                private cd: ChangeDetectorRef) {
        this.sections = fieldCustomizerService.getAllFields();
        this.recalcSelected();
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.fields && changes.fields.currentValue != changes.fields.previousValue){
            this.recalcSelected();
        }
    }

    public show(){
        this.toMainPage();
        this.sidebar.visible = true;
        this.cd.markForCheck();
    }

    recalcSelected(){
        for(let sectionKey of Object.keys(this.sections)){
            let section: any = {};
            for(let groupKey of Object.keys(this.sections[sectionKey].groups))
                section[groupKey] = new Map<Field, FieldConfig>();
            this.selected[sectionKey] = section;
        }
    }

    addField() {
        this.selected[this.sidebar.section!][this.sidebar.group!].set(this.sidebar.field!, this.selectedConfig!)
        this.toMainPage();

    }

    remove(group: any, field: any) {
        this.selected[this.sidebar.section!][group].delete(field);
        this.toMainPage();
    }

    getValue(value: Map<Field, FieldConfig>) {
        return Array.from(value.keys());
    }

    alreadyAdd(group: any, field: Field): boolean {
        return this.selected[this.sidebar.section!][group].has(field);
    }
}
