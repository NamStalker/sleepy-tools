import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInspectComponent } from './todo-inspect.component';

describe('TodoInspectComponent', () => {
  let component: TodoInspectComponent;
  let fixture: ComponentFixture<TodoInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInspectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
