import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { TodoItem } from '../todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todoItem!: TodoItem
  @Output() updateEvt = new EventEmitter<Partial<TodoItem>>()
  @Output() removeEvt = new EventEmitter<TodoItem>()

  public editing = false

  update(todo: Partial<TodoItem>): void {
    this.updateEvt.emit(todo)
  }

  remove(): void {
    this.removeEvt.emit(this.todoItem)
  }

  
}
