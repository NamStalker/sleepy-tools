import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  currList = 0;
  currTodo = 0;
  _openLists = false;
  _inspectTodo = false;
  lists = [
    {
      id: 1,
      name: 'Today',
      data: [
        {
          id: 1,
          title: '1groceries',
          description: 'get groceries heres a long description that wil have to be cut off get groceries heres a long description that wil have to be cut off get groceries heres a long description that wil have to be cut off',
          completed: false
        },
        {
          id: 2,
          title: '2groceries',
          description: 'get groceries',
          completed: false
        },
        {
          id: 3,
          title: '3groceries',
          description: 'get groceries',
          completed: false
        },
        {
          id: 4,
          title: '4groceries',
          description: 'get groceries',
          completed: false
        },
        {
          id: 5,
          title: '5groceries',
          description: 'get groceries',
          completed: false
        },
        {
          id: 6,
          title: '6groceries',
          description: 'get groceries',
          completed: false
        }
      ]
    }
  ]

  constructor() { }

  doNothing() {
    console.log('nothing');
  }

  addFakeItem() {
    let len = this.lists[this.currList].data.length - 1;
    let nextid = this.lists[this.currList].data[len].id + 1;
    this.lists[this.currList].data.push({
      id: nextid,
      title: 'fake item',
      description: 'this has ben added',
      completed: false
    });
  }

  addFakeList() {
    this.lists.push({
      id: this.lists[this.lists.length - 1].id + 1,
      name: 'new list',
      data: []
    });
  }

  toggleLists() {
    this._openLists = !this._openLists;
  }

  inspectTodo(todoId: number) {
    this._inspectTodo = true;
    this.currTodo = this.getCurrentList().findIndex((x) => x.id === todoId);
  }

  toTodos() {
    this._inspectTodo = false;
    this.currTodo = 0;
  }

  getCurrentTodo() {
    return this.lists[this.currList].data[this.currTodo];
  }

  switchList(newList: number) {
    this.currList = this.lists.findIndex((x) => x.id === newList);
    if (this._openLists)
      this._openLists = false;
  }

  getCurrentListName() {
    return this.lists[this.currList].name;
  }

  getCurrentList() {
    return this.lists[this.currList].data;
  }

  getCurrentTodoName() {
    return this.lists[this.currList].data[this.currTodo].title;
  }
}
