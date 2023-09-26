import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonComentsComponent } from './skeleton-coments.component';

describe('SkeletonComentsComponent', () => {
  let component: SkeletonComentsComponent;
  let fixture: ComponentFixture<SkeletonComentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonComentsComponent]
    });
    fixture = TestBed.createComponent(SkeletonComentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
