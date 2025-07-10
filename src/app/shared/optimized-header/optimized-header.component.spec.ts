import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizedHeaderComponent } from './optimized-header.component';

describe('OptimizedHeaderComponent', () => {
  let component: OptimizedHeaderComponent;
  let fixture: ComponentFixture<OptimizedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizedHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
