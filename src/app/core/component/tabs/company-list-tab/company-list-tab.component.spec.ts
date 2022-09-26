import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListTabComponent } from './company-list-tab.component';

describe('CompanyListTabComponent', () => {
  let component: CompanyListTabComponent;
  let fixture: ComponentFixture<CompanyListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
