import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsMapViewComponent } from './chips-map-view.component';

describe('ChipsMapViewComponent', () => {
  let component: ChipsMapViewComponent;
  let fixture: ComponentFixture<ChipsMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsMapViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
