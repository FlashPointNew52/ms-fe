import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CalendarModule } from 'primeng/calendar'
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { YaMapViewComponent } from './component/viewElements/ya-map-view/ya-map-view.component';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { TabRootComponent } from './component/tabs/tab-root/tab-root.component';
import { MainTabComponent } from './component/tabs/main-tab/main-tab.component';
import { PersonTabComponent } from './component/tabs/person-tab/person-tab.component';
import { PersonListTabComponent } from './component/tabs/person-list-tab/person-list-tab.component';
import { MultiselectComponent } from './component/formElements/multiselect/multiselect.component';
import { DropdownTagComponent } from './component/formElements/dropdown-tag/dropdown-tag.component';
import { AddressInputComponent } from './component/formElements/address-input/address-input.component';
import { AddressInputShortComponent } from './component/formElements/address-input-short/address-input-short.component';
import { SearchPanelComponent } from './component/formElements/search-panel/search-panel.component';
import { ChipsOptionComponent } from './component/formElements/chips-option/chips-option.component';
import { DropdownComponent } from './component/formElements/dropdown/dropdown.component';
import { SimpleInputComponent } from './component/formElements/simple-input/simple-input.component';
import { DatePipe } from './pipes/date.pipe';
import { ChipsViewComponent } from './component/viewElements/chips-view/chips-view.component';
import { AddressPipe } from './pipes/address.pipe';
import { TagPipe } from './pipes/tag.pipe';
import { TagsViewComponent } from './component/viewElements/tags-view/tags-view.component';
import { TaskViewComponent } from './component/viewElements/task-view/task-view.component';
import { CustomViewComponent } from './component/viewElements/custom-view/custom-view.component';
import { ListboxComponent } from './component/formElements/listbox/listbox.component';
import { EntityViewComponent } from './component/viewElements/entity-view/entity-view.component';
import { CompanyListTabComponent } from './component/tabs/company-list-tab/company-list-tab.component';
import { CompanyTabComponent } from './component/tabs/company-tab/company-tab.component';
import { DealTabComponent } from './component/tabs/deal-tab/deal-tab.component';
import { DealListTabComponent } from './component/tabs/deal-list-tab/deal-list-tab.component';
import { DealViewComponent } from './component/viewElements/deal-view/deal-view.component';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { YaFullscreenDirective } from './component/viewElements/ya-map-view/ya-control.directive';
import { YaDrawDirective } from './component/viewElements/ya-map-view/ya-draw.directive';
import { YaPanoramaDirective } from './component/viewElements/ya-map-view/ya-panorama.directive';
import { YaSearchDirective } from './component/viewElements/ya-map-view/ya-search.directive';
import { YaChipsDirective } from './component/viewElements/ya-map-view/ya-chips.directive';
import { YaGeoCollectionDirective } from './component/viewElements/ya-map-view/ya-geocollection.directive';
import { ChipsMapViewComponent } from './component/viewElements/chips-map-view/chips-map-view.component';
import { CalendarComponent } from './component/formElements/calendar/calendar.component';
import { MoreLessViewComponent } from './component/viewElements/more-less-view/more-less-view.component';
import { GeoBilletComponent } from './component/viewElements/ya-map-view/geo-billet/geo-billet.component';
import { OverlayPanelComponent } from './component/formElements/overlay-panel/overlay-panel.component';
import { SimpleBilletComponent } from './component/viewElements/simple-billet/simple-billet.component';
import { FieldCustomizerViewComponent } from './component/viewElements/field-customizer-view/field-customizer-view.component';
import { FieldPipe } from './pipes/field.pipe'

const maskConfigFunction: () => Partial<IConfig> = () => {
    return {
        validation: true,
    };
};



@NgModule({

    declarations: [CoreComponent, TabRootComponent, MainTabComponent, PersonTabComponent, PersonListTabComponent,
        MultiselectComponent, DropdownTagComponent, AddressInputComponent, AddressInputShortComponent, SearchPanelComponent, ChipsOptionComponent, DropdownComponent,
        SimpleInputComponent, DatePipe, ChipsViewComponent, AddressPipe, TagPipe, TagsViewComponent, TaskViewComponent,
        CustomViewComponent, ListboxComponent, EntityViewComponent, CompanyListTabComponent, CompanyTabComponent, DealTabComponent, DealListTabComponent,
        DealViewComponent, YaMapViewComponent, YaFullscreenDirective, YaDrawDirective, YaPanoramaDirective, YaSearchDirective, YaChipsDirective,
        YaGeoCollectionDirective,
        ChipsMapViewComponent,
        CalendarComponent,
        MoreLessViewComponent,
        GeoBilletComponent,
        OverlayPanelComponent,
        SimpleBilletComponent,
        FieldCustomizerViewComponent,
        FieldPipe],
    imports: [
        CommonModule,
        CoreRoutingModule,
        TabViewModule,
        MultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule,
        ChipsModule,
        ContextMenuModule,
        CalendarModule,
        DropdownModule,
        InputNumberModule,
        InputSwitchModule,
        InputTextareaModule,
        AutoCompleteModule,
        SplitButtonModule,
        MenuModule,
        MenubarModule,
        NgxMaskModule.forRoot(maskConfigFunction),
        AvatarModule,
        AccordionModule,
        SelectButtonModule,
        TableModule,
        TagModule,
        SidebarModule,
        ListboxModule,
        OverlayPanelModule,
        OrderListModule,
        DynamicDialogModule,
        RadioButtonModule,
        PickListModule,
        TieredMenuModule,
        TooltipModule,
        AngularYandexMapsModule,
        CommonModule
    ]
})
export class CoreModule { }
