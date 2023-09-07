import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aside2Component } from './aside2.component';

describe('Aside2Component', () => {
  let component: Aside2Component;
  let fixture: ComponentFixture<Aside2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Aside2Component]
    });
    fixture = TestBed.createComponent(Aside2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
