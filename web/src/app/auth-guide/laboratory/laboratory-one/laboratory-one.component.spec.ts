import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryOneComponent } from './laboratory-one.component';

describe('LaboratoryOneComponent', () => {
  let component: LaboratoryOneComponent;
  let fixture: ComponentFixture<LaboratoryOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
