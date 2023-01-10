import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input,
    OnChanges,
    OnInit, Output,
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
        [key: string]: Field[]
    }
}

export interface Sidebar {
    visible: boolean;
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
    @Input() selected: SelectedField = {};
    @Output() selectedChange: EventEmitter<SelectedField> = new EventEmitter<SelectedField>();

    utils = Utils;
    FieldType = FieldType;

    sidebar: Sidebar = {
        field: undefined,
        section: "MAIN",
        group: undefined,
        visible: false,
        alreadyAdd: false
    };

    toSecondPage(section: keyof Sections, group: keyof Section["groups"], field: Field){
        this.sidebar.section = section;
        this.sidebar.group = group;
        this.sidebar.field = field;
        this.addField();
        return;

        // this.sidebar.page = 1;
        // this.sidebar.alreadyAdd = this.alreadyAdd(group, field);
        //
        // let config = this.selected[section][group].get(field);
        // if(config){
        //     this.selectedConfig = config;
        // } else
        //     this.selectedConfig = field.config[0];
        // this.cd.detectChanges();
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
        this.sidebar.visible = true;
        this.cd.markForCheck();
    }

    recalcSelected(){
        for(let sectionKey of Object.keys(this.sections)){
            let section: any = {};
            for(let groupKey of Object.keys(this.sections[sectionKey].groups))
                section[groupKey] = [];
            this.selected[sectionKey] = section;
        }
    }

    addField() {
        this.selected[this.sidebar.section!][this.sidebar.group!] = [...this.selected[this.sidebar.section!][this.sidebar.group!], this.sidebar.field!];
        this.cd.detectChanges();
    }

    remove(group: any, field: any) {
        let index =this.selected[this.sidebar.section!][group].indexOf(field);
        this.selected[this.sidebar.section!][group].splice(index, 1);
    }

    update() {
        this.selectedChange.emit(this.selected);
        this.sidebar.visible = false;
    }
}
