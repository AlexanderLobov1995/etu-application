import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryThreeComponent } from './laboratory-three.component';

describe('LaboratoryThreeComponent', () => {
  let component: LaboratoryThreeComponent;
  let fixture: ComponentFixture<LaboratoryThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
