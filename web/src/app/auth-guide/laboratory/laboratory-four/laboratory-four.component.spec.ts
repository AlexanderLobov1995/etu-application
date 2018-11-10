import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryFourComponent } from './laboratory-four.component';

describe('LaboratoryFourComponent', () => {
  let component: LaboratoryFourComponent;
  let fixture: ComponentFixture<LaboratoryFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
