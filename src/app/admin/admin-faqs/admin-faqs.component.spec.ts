import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaqsComponent } from './admin-faqs.component';

describe('AdminFaqsComponent', () => {
  let component: AdminFaqsComponent;
  let fixture: ComponentFixture<AdminFaqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFaqsComponent]
    });
    fixture = TestBed.createComponent(AdminFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
