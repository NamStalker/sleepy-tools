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
import { ReminderOptionsComponent } from './reminder-options/reminder-options.component';

@Component({
  selector: 'app-todo',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  currList = 0;
  currTodo = 0;
  _openLists = false;
  _addItemActive = false;
  addTodo = new FormGroup({
    title: new FormControl(''),
    due: new FormControl(''),
    notif: new FormControl(''),
    repeat: new FormControl('')
  });
  todoCompleted = false;
  lists = [
    {
      id: 0,
      name: 'My Day',
      data: []
    },
    {
      id: 1,
      name: 'New List',
      data: [
        {
          id: 1,
          parentId: 1,
          title: '1groceries',
          description: 'get groceries heres a long description that wil have to be cut off get groceries heres a long description that wil have to be cut off get groceries heres a long description that wil have to be cut off',
          completed: false,
          due: '2025-04-25T00:00:00.000',
          notifLength: '12',
          notifUnit: 'hours',
          repeatLength: '13',
          repeatUnit: 'months'
        },
        {
          id: 2,
          parentId: 1,
          title: '2groceries',
          description: 'get groceries',
          completed: false,
          due: '2025-04-25T00:00:00.000',
          notifLength: '12',
          notifUnit: 'hours',
          repeatLength: '13',
          repeatUnit: 'months'
        },
        {
          id: 3,
          parentId: 1,
          title: '3groceries',
          description: 'get groceries',
          completed: false,
          due: '2025-04-25T00:00:00.000',
          notifLength: '12',
          notifUnit: 'hours',
          repeatLength: '13',
          repeatUnit: 'months'
        },
        {
          id: 4,
          parentId: 1,
          title: '4groceries',
          description: 'get groceries',
          completed: false,
          due: '2025-04-25T00:00:00.000',
          notifLength: '12',
          notifUnit: 'hours',
          repeatLength: '13',
          repeatUnit: 'months'
        },
        {
          id: 5,
          parentId: 1,
          title: '5groceries',
          description: 'get groceries',
          completed: false,
          due: '2025-04-25T00:00:00.000',
          notifLength: '12',
          notifUnit: 'hours',
          repeatLength: '13',
          repeatUnit: 'months'
        },
        {
          id: 6,
          parentId: 1,
          title: '6groceries',
          description: 'get groceries',
          completed: false,
          due: '2025-04-25T00:00:00.000',
          notifLength: '12',
          notifUnit: 'hours',
          repeatLength: '13',
          repeatUnit: 'months'
        }
      ]
    }
  ]

  constructor(public dialog: MatDialog) { }

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

  getParentList(todo: any) {
    return this.lists[this.lists.findIndex((x) => x.id === todo.parentId)].name;
  }

  getDueDesc(dueDate: string) {
    if (dueDate === '') {
      return '';
    }

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    switch(new Date(dueDate).toLocaleDateString()) {
      case new Date().toLocaleDateString():
        return 'Today';
      case yesterday.toLocaleDateString():
        return 'Yesterday';
      case tomorrow.toLocaleDateString():
        return 'Tomorrow';
      default:
        return new Date(dueDate).toLocaleDateString();
    }
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
    if (this.currList === 0) {
      let today = [{
        id: 1,
        parentId: 0,
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
      return this.lists[this.currList].data.concat(today);
    }
    return this.lists[this.currList].data;
  }

  resizeInputLabel(input: string, inputHidden: string, newLabel: string | null) {
    let cntrl = document.getElementById(input);
    let hidden = document.getElementById(inputHidden);
    if (cntrl && hidden && newLabel){
      hidden.textContent = newLabel;
      cntrl.style.width = hidden.offsetWidth + 'px';
    }
    else if (cntrl) {
      cntrl.style.width = '0px';
    }
  }

  pickReminder() {
    let len = this.addTodo.controls.notif.getRawValue();
    let unit = this.addTodo.controls.notif.getRawValue();
    let dialogRef = this.dialog.open(ReminderOptionsComponent, {
      width: '50%',
      data: {
        notifLength: len ? len.split(' ')[0] : '',
        notifUnit: unit ? unit.split(' ')[1] : ''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.addTodo.controls.notif.setValue(res.notifLength + ' ' + res.notifUnit);
      this.resizeInputLabel('notifInput', 'notifHidden', res.notifLength + ' ' + res.notifUnit);
    })
  }

  pickRepeat() {

  }

  addItemInputActive() {
    return this.addTodo.controls.title.getRawValue() !== '';
  }

  clearNewTodo() {
    this.addTodo.controls.title.setValue('');
    this.addTodo.controls.due.setValue('');
    let cntrls = document.getElementsByClassName('newTodoLabel');
    for (let label of [].slice.call(cntrls)) {
      (label as any).style.width = '0px';
    }
  }

  saveNewTodo() {
    let len = this.lists[this.currList].data.length;
    let nextid = len === 0 ? 1 : this.lists[this.currList].data[len - 1].id + 1;
    let title = this.addTodo.controls.title.getRawValue();
    let dueDate = this.addTodo.controls.due.getRawValue();
    let notif = this.addTodo.controls.notif.getRawValue();
    let repeat = this.addTodo.controls.notif.getRawValue();
    if (title) {
      this.lists[this.currList].data.push({
        id: nextid,
        title: title,
        description: '',
        completed: false,
        due: dueDate ? formatDate(dueDate, 'yyyy-MM-ddT00:00:00.000', 'en') : '',
        parentId: this.lists[this.currList].id,
        notifLength: notif ? notif.split(' ')[0] : '',
        notifUnit: notif ? notif.split(' ')[1] : '',
        repeatLength: repeat ? repeat.split(' ')[0] : '',
        repeatUnit: repeat ? repeat.split(' ')[1] : ''
      });
    }
    this.clearNewTodo();
  }
}