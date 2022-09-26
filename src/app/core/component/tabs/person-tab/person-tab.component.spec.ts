import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTabComponent } from './person-tab.component';

describe('PersonTabComponent', () => {
  let component: PersonTabComponent;
  let fixture: ComponentFixture<PersonTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
