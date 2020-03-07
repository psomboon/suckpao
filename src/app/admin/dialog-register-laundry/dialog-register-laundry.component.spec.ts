import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterLaundryComponent } from './dialog-register-laundry.component';

describe('DialogRegisterLaundryComponent', () => {
  let component: DialogRegisterLaundryComponent;
  let fixture: ComponentFixture<DialogRegisterLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegisterLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegisterLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
