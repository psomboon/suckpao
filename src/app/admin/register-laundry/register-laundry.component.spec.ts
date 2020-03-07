import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLaundryComponent } from './register-laundry.component';

describe('RegisterLaundryComponent', () => {
  let component: RegisterLaundryComponent;
  let fixture: ComponentFixture<RegisterLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
