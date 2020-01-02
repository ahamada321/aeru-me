import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBottomComponent } from './navbar-bottom.component';

describe('BottomNavbarComponent', () => {
  let component: NavbarBottomComponent;
  let fixture: ComponentFixture<NavbarBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
