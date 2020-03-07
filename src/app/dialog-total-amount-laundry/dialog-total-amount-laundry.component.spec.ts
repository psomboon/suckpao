import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTotalAmountLaundryComponent } from "./dialog-total-amount-laundry.component";

describe('DialogTotalAmountLaundryComponent', () => {
  let component: DialogTotalAmountLaundryComponent;
  let fixture: ComponentFixture<DialogTotalAmountLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTotalAmountLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTotalAmountLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
