import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTodosComponent } from './todo-todos.component';

describe('TodoTodosComponent', () => {
  let component: TodoTodosComponent;
  let fixture: ComponentFixture<TodoTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
