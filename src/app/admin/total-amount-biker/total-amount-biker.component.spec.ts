import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAmountBikerComponent } from './total-amount-biker.component';

describe('TotalAmountBikerComponent', () => {
  let component: TotalAmountBikerComponent;
  let fixture: ComponentFixture<TotalAmountBikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalAmountBikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAmountBikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
