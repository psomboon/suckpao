import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTotalAmountBikerComponent } from './dialog-total-amount-biker.component';

describe('DialogTotalAmountBikerComponent', () => {
  let component: DialogTotalAmountBikerComponent;
  let fixture: ComponentFixture<DialogTotalAmountBikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTotalAmountBikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTotalAmountBikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
