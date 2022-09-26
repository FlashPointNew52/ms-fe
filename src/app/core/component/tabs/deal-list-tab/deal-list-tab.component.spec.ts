import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealListTabComponent } from './deal-list-tab.component';

describe('DealListTabComponent', () => {
  let component: DealListTabComponent;
  let fixture: ComponentFixture<DealListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
