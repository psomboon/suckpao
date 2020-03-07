import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMoneyComponent } from './status-money.component';

describe('StatusMoneyComponent', () => {
  let component: StatusMoneyComponent;
  let fixture: ComponentFixture<StatusMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
