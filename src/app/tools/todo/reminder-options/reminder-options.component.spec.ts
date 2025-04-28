import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderOptionsComponent } from './reminder-options.component';

describe('ReminderOptionsComponent', () => {
  let component: ReminderOptionsComponent;
  let fixture: ComponentFixture<ReminderOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
