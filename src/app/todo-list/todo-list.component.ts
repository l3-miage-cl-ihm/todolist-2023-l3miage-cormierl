import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodolistService, TodoList, TodoItem } from '../todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  readonly todoListObs: Observable<TodoList>;
  public remaining: number = 0

  constructor(private tds: TodolistService) {
    this.todoListObs = tds.observable;
    this.todoListObs.subscribe( obs => {
      this.remaining = 0;
      obs.items.forEach(item => !item.isDone ? this.remaining++ : !item.isDone)
    }
    )
  }

  create(...labels: readonly string[]): void {
    this.tds.create(...labels);
  }

  delete(...items: readonly TodoItem[]): void {
    this.tds.delete(...items);
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): void {
    this.tds.update(data, ...items);
  }

  trackById(i : number, e : TodoItem){
    return e.id;
  }
}
