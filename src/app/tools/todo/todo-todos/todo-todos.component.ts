import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReminderOptionsComponent } from '../reminder-options/reminder-options.component';
import { todoItem, todoList } from '../todo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-todo-todos',
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './todo-todos.component.html',
  styleUrl: './todo-todos.component.scss'
})
export class TodoTodosComponent {
  addTodo = new FormGroup({
    title: new FormControl(''),
    due: new FormControl(''),
    notif: new FormControl(''),
    repeat: new FormControl('')
  });
  @Input()
  _currTodos : todoItem[] = [];
  @Input()
  _currListId : todoList = {
    id: 0,
    name: '',
    data: []
  };

  @Output()
  itemAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  itemsChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {
    
  }

  pickReminder() {
    let len = this.addTodo.controls.notif.getRawValue();
    let dialogRef = this.dialog.open(ReminderOptionsComponent, {
      width: '50%',
      data: {
        notifLength: len ? len.split(' ')[0] : '',
        notifUnit: len ? len.split(' ')[1] : ''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.addTodo.controls.notif.setValue(res.notifLength + ' ' + res.notifUnit);
      this.resizeInputLabel('notifInput', 'notifHidden', res.notifLength + ' ' + res.notifUnit);
    })
  }

  pickRepeat() {
    let len = this.addTodo.controls.repeat.getRawValue();
    let dialogRef = this.dialog.open(ReminderOptionsComponent, {
      width: '50%',
      data: {
        notifLength: len ? len.split(' ')[0] : '',
        notifUnit: len ? len.split(' ')[1] : ''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.addTodo.controls.repeat.setValue(res.notifLength + ' ' + res.notifUnit);
      this.resizeInputLabel('repeatInput', 'repeatHidden', res.notifLength + ' ' + res.notifUnit);
    })
  }

  addItemInputActive() {
    return this.addTodo.controls.title.getRawValue() !== '';
  }

  clearNewTodo() {
    this.addTodo.controls.title.setValue('');
    this.addTodo.controls.due.setValue('');
    this.addTodo.controls.notif.setValue('');
    this.addTodo.controls.repeat.setValue('');
    let cntrls = document.getElementsByClassName('newTodoLabel');
    for (let label of [].slice.call(cntrls)) {
      (label as any).style.width = '0px';
    }
  }

  saveNewTodo() {
    let len = this._currTodos.length;
    let nextid = len === 0 ? 1 : this._currTodos.sort((x,y) => x.id <= y.id ? 1 : -1)[0].id + 1;
    let title = this.addTodo.controls.title.getRawValue();
    let dueDate = this.addTodo.controls.due.getRawValue();
    let notif = this.addTodo.controls.notif.getRawValue();
    let repeat = this.addTodo.controls.repeat.getRawValue();
    if (title) {
      let newTodo = {
        id: nextid,
        title: title,
        description: '',
        completed: false,
        due: dueDate ? formatDate(dueDate, 'yyyy-MM-ddT00:00:00.000', 'en') : '',
        parentId: this._currListId.id,
        parentTitle: this._currListId.name,
        notifLength: notif ? notif.split(' ')[0] : '',
        notifUnit: notif ? notif.split(' ')[1] : '',
        repeatLength: repeat ? repeat.split(' ')[0] : '',
        repeatUnit: repeat ? repeat.split(' ')[1] : ''
      };
      fetch('/api/todo/items/add/item/' + this._currListId.id, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      }).then((res) => {
        if (res.ok) {
          this.itemAdded.emit(true);
        }
      });
    }
    this.clearNewTodo();
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
}
