import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminProfileComponent } from './create-admin-profile.component';

describe('CreateAdminProfileComponent', () => {
  let component: CreateAdminProfileComponent;
  let fixture: ComponentFixture<CreateAdminProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdminProfileComponent]
    });
    fixture = TestBed.createComponent(CreateAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
