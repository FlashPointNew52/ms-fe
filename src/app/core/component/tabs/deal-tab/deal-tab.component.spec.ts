import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealTabComponent } from './deal-tab.component';

describe('DealTabComponent', () => {
  let component: DealTabComponent;
  let fixture: ComponentFixture<DealTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
