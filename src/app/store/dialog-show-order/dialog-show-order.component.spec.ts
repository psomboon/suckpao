import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowOrderComponent } from './dialog-show-order.component';

describe('DialogShowOrderComponent', () => {
  let component: DialogShowOrderComponent;
  let fixture: ComponentFixture<DialogShowOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
