import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFaqsComponent } from './view-faqs.component';

describe('ViewFaqsComponent', () => {
  let component: ViewFaqsComponent;
  let fixture: ComponentFixture<ViewFaqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFaqsComponent]
    });
    fixture = TestBed.createComponent(ViewFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
