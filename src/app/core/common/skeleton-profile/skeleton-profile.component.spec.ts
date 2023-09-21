import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonProfileComponent } from './skeleton-profile.component';

describe('SkeletonProfileComponent', () => {
  let component: SkeletonProfileComponent;
  let fixture: ComponentFixture<SkeletonProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonProfileComponent]
    });
    fixture = TestBed.createComponent(SkeletonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
