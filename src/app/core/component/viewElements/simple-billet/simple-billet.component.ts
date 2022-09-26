import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SimpleData {
  label: string;
  description: string;
}

@Component({
  selector: 'app-simple-billet',
  templateUrl: './simple-billet.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./simple-billet.component.scss']
})

export class SimpleBilletComponent implements OnInit {

  @Input() data: SimpleData = {label: '', description: ''};
  @Output() delete: EventEmitter<SimpleData> = new EventEmitter<SimpleData>();

  constructor() { }

  ngOnInit(): void {
  }

}
