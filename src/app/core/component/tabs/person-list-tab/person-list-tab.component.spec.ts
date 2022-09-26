import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListTabComponent } from './person-list-tab.component';

describe('PersonListTabComponent', () => {
  let component: PersonListTabComponent;
  let fixture: ComponentFixture<PersonListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
