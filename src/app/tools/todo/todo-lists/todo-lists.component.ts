import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { todoList } from '../todo.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-lists',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './todo-lists.component.html',
  styleUrl: './todo-lists.component.scss'
})
export class TodoListsComponent {
  @Input()
  _lists: todoList[] = [];
  _currListId: number = 0;

  @Output()
  listAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  listRemoved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  listChanged: EventEmitter<number> = new EventEmitter<number>();

  addList = new FormGroup({
    title: new FormControl('')
  });
  
  constructor() {}

  switchList(newList: number) {
    let currId = this._lists.findIndex((x) => x.id === newList);
    if (currId !== -1) {
      this._currListId = currId;
      this.listChanged.emit(this._currListId);
    }
  }

  addListInputActive() {
    return this.addList.controls.title.getRawValue() !== '';
  }

  clearNewList() {
    this.addList.controls.title.setValue('');
  }

  saveNewList() {
    let title = this.addList.controls.title.getRawValue();
    if(title) {
      let newList = {
        id: this._lists.sort((x,y) => x.id <= y.id ? 1 : -1)[0].id + 1,
        name: title,
        data: []
      };
  
      let res = fetch('/api/todo/items/add/list/', {
        method: 'POST',
        body: JSON.stringify(newList),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      }).then((res) => {
        if (res.ok) {
          this.listAdded.emit(true);
        }
      });
    }

    this.clearNewList();
  }
}
