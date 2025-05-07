import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TodoInspectComponent } from "./todo-inspect/todo-inspect.component";
import { TodoListsComponent } from "./todo-lists/todo-lists.component";
import { TodoTodosComponent } from './todo-todos/todo-todos.component';

@Component({
  selector: 'app-todo',
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    TodoInspectComponent,
    TodoListsComponent,
    TodoTodosComponent
],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  currList: number = 0;
  currTodo: number = 0;
  lists: todoList[] = [];
  _openLists = false;
  isList: boolean = true;
  isTodo: boolean = false;
  
  todoCompleted = false;

  constructor(public dialog: MatDialog) { 
    this.refreshLists();
  }

  refreshLists() {
    fetch('/api/todo/items/').then((res) => res.json()).then((data) => {
      this.lists = (<todoList[]>data).sort((x,y) => x.id <= y.id ? -1 : 1);
    });
  }

  toggleLists() {
    this._openLists = !this._openLists;
  }

  getParentList(todo: any) {
    return this.lists[this.lists.findIndex((x) => x.id === todo.parentId)].name;
  }

  getCurrentListName() {
    if (this.lists.length === 0) {
      return '';
    }
    return this.lists[this.currList].name;
  }

  getCurrentList() {
    if (this.lists.length === 0) {
      return [];
    }
    if (this.currList === 0) {
      let today = [{
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
      }];
      today.pop();
      this.lists.forEach((x) => {
        if (x.id !== 0) {
          x.data.forEach((y) => {
            if (new Date(y.due) <= new Date()) {
              today.push(y);
            }
          });
        }
      });
      return this.lists[this.currList].data.concat(today).sort((x,y) => {
        if (y.due === '')
          return -1;
        return new Date(x.due).getTime() <= new Date(y.due).getTime() ? -1 : 1
      });
    }
    return this.lists[this.currList].data.sort((x,y) => {
      if (y.due === '')
        return -1;
      return new Date(x.due).getTime() <= new Date(y.due).getTime() ? -1 : 1
    });
  }

  getCurrentTodo() {
    return this.lists[this.currList].data[this.currTodo];
  }

  itemAdded(event: boolean) {
    if (event) {
      this.refreshLists();
    }
  }

  listAdded(event: boolean) {
    if (event) {
      this.refreshLists();
    }
  }

  listChanged(event: number) {
    if (event !== -1) {
      if (this._openLists) {
        this.toggleLists();
      }
      this.currList = this.lists.findIndex((x) => x.id === event);
      this.refreshLists();
    }
  }

  itemSaved(event: boolean) {
    if (event) {
      this.refreshLists();
    }
  }
}

export interface todoItem {
  id: number,
  parentId: number,
  parentTitle: string,
  title: string,
  description: string,
  completed: boolean,
  due: string,
  notifLength: string,
  notifUnit: string,
  repeatLength: string,
  repeatUnit: string
}

export interface todoList {
  id: number,
  name: string,
  data: todoItem[]
}