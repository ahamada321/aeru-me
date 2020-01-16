import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSaasComponent } from './landing-saas.component';

describe('LandingComponent', () => {
  let component: LandingSaasComponent;
  let fixture: ComponentFixture<LandingSaasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingSaasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
