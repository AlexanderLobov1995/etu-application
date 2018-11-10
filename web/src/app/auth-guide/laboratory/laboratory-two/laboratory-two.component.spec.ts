import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryTwoComponent } from './laboratory-two.component';

describe('LaboratoryTwoComponent', () => {
  let component: LaboratoryTwoComponent;
  let fixture: ComponentFixture<LaboratoryTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
