import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLaundryComponent } from './list-laundry.component';

describe('ListLaundryComponent', () => {
  let component: ListLaundryComponent;
  let fixture: ComponentFixture<ListLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
