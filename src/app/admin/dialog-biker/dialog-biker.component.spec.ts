import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBikerComponent } from '../list-biker/dialog-biker.component';

describe('DialogBikerComponent', () => {
  let component: DialogBikerComponent;
  let fixture: ComponentFixture<DialogBikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
