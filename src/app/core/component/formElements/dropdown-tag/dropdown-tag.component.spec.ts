import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdawnTagComponent } from './sliding-tag.component';

describe('SlidingTagComponent', () => {
  let component: DropdawnTagComponent;
  let fixture: ComponentFixture<DropdawnTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdawnTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdawnTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
