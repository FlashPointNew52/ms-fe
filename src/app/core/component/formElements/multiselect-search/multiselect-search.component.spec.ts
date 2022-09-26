import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectSearchComponent } from './multiselect-search.component';

describe('MultiselectSearchComponent', () => {
  let component: MultiselectSearchComponent;
  let fixture: ComponentFixture<MultiselectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
