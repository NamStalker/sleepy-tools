import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { todoItem } from '../todo.component';

@Component({
  selector: 'app-todo-inspect',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './todo-inspect.component.html',
  styleUrl: './todo-inspect.component.scss'
})
export class TodoInspectComponent {
  todoForm = new FormGroup({
    title: new FormControl(''),
    notes: new FormControl(''),
    due: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
  });
  @Input()
  _todo: todoItem = {
    id: 0,
    parentId: 0,
    parentTitle: '',
    title: '',
    description: '',
    completed: false,
    due: '',
    notifLength: '',
    notifUnit: '',
    repeatLength: '',
    repeatUnit: ''
  };


  saveTodo() {
    let tmpTitle = this.todoForm.controls.title.getRawValue();
    let tmpNotes = this.todoForm.controls.notes.getRawValue();
    let tmpDue = this.todoForm.controls.due.getRawValue();
    if (tmpTitle && tmpNotes && tmpDue) {
      this.setCurrentTodo(this._todo, tmpTitle, tmpNotes, new Date(tmpDue).toISOString().replace('Z', ''));
    }
  }

  setCurrentTodo(todo: any, title: string, notes: string, due: string) {
    /*let listId = this.lists.findIndex(x => x.id === todo.parentId);
    let todoId = this.lists[listId].data.findIndex(x => x.id === todo.id);
    this.lists[listId].data[todoId].title = title;
    this.lists[listId].data[todoId].description = notes;
    this.lists[listId].data[todoId].due = due;
    this.lists[listId].data[todoId].completed = false;*/
  }
}
