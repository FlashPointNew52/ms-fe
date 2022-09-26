import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsOptionComponent } from './chips-option.component';

describe('ChipsOptionComponent', () => {
  let component: ChipsOptionComponent;
  let fixture: ComponentFixture<ChipsOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
