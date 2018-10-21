import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuideComponent } from './auth-guide.component';

describe('AuthGuideComponent', () => {
  let component: AuthGuideComponent;
  let fixture: ComponentFixture<AuthGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
