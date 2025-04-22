import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OopsiesComponent } from './oopsies.component';

describe('OopsiesComponent', () => {
  let component: OopsiesComponent;
  let fixture: ComponentFixture<OopsiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OopsiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OopsiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
