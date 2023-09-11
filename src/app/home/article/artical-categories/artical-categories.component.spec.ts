import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticalCategoriesComponent } from './artical-categories.component';

describe('ArticalCategoriesComponent', () => {
  let component: ArticalCategoriesComponent;
  let fixture: ComponentFixture<ArticalCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticalCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticalCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
