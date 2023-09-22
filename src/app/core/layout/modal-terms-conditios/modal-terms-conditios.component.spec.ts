import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTermsConditiosComponent } from './modal-terms-conditios.component';

describe('ModalTermsConditiosComponent', () => {
  let component: ModalTermsConditiosComponent;
  let fixture: ComponentFixture<ModalTermsConditiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTermsConditiosComponent]
    });
    fixture = TestBed.createComponent(ModalTermsConditiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
