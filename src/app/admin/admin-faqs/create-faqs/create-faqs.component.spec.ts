import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFaqsComponent } from './create-faqs.component';

describe('CreateFaqsComponent', () => {
  let component: CreateFaqsComponent;
  let fixture: ComponentFixture<CreateFaqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFaqsComponent]
    });
    fixture = TestBed.createComponent(CreateFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
