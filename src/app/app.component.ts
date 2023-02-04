import { Component } from '@angular/core';
import { TodoItem, TodolistService } from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nextTodo = "";

  constructor(public tdls: TodolistService) {}

  trackById(i: number, item: TodoItem): number {
    return item.id;
  }
}
