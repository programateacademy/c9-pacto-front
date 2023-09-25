import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAsideComponent } from './skeleton-aside.component';

describe('SkeletonAsideComponent', () => {
  let component: SkeletonAsideComponent;
  let fixture: ComponentFixture<SkeletonAsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonAsideComponent]
    });
    fixture = TestBed.createComponent(SkeletonAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
