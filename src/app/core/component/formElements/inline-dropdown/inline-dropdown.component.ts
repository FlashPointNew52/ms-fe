import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-inline-dropdown',
  templateUrl: './inline-dropdown.component.html',
  styleUrls: ['./inline-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InlineDropdownComponent),
    multi: true
  }],
})
export class InlineDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() postfix: string = '';
  @Input() options: Array<any> = [];
  @Input() value: any;
  @Input() placeholder: string = '';
  @Input() optionValue: string = 'code';

  public onChange = (val: any) => { };
  public onTouched = (val: any) => { };

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  writeValue(obj: any): void {
    this.value = obj;
  }

}
