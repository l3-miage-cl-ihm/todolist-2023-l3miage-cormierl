import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodolistService, TodoList, TodoItem } from './todolist.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/* 
  Le but quand on injecte c'est de ne pas travailler sur le flux publié par le service
  C'est pour ça qu'on déclare un observable en attribut ici qui est une référence vers le flux du service
  On peut ainsi par composant faire des méthodes particulières pour un flux
*/
export class AppComponent {
  title = 'l3m-tp3-todolist-2023';
  readonly todoListObs: Observable<TodoList>;

  constructor(private tds: TodolistService) {
    this.todoListObs = tds.observable;
  }

  trackById(i: number, e: TodoItem) {
    return e.id;
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
  


}
