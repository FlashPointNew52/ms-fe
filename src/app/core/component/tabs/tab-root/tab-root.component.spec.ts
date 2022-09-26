import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRootComponent } from './tab-root.component';

describe('TabRootComponent', () => {
  let component: TabRootComponent;
  let fixture: ComponentFixture<TabRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
