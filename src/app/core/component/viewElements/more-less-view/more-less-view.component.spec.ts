import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLessViewComponent } from './more-less-view.component';

describe('MoreLessViewComponent', () => {
  let component: MoreLessViewComponent;
  let fixture: ComponentFixture<MoreLessViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreLessViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreLessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
