import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCategoryComponent } from './forum-category.component';

describe('ForumCategoryComponent', () => {
  let component: ForumCategoryComponent;
  let fixture: ComponentFixture<ForumCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumCategoryComponent]
    });
    fixture = TestBed.createComponent(ForumCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
