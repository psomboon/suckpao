import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBikerComponent } from './list-biker.component';

describe('ListBikerComponent', () => {
  let component: ListBikerComponent;
  let fixture: ComponentFixture<ListBikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
