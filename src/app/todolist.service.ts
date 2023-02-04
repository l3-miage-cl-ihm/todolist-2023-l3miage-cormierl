import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { runInZone } from './utils';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}

export interface TodoList {
  readonly label: string;
  readonly items: readonly TodoItem[];
}

let idItem = 0;

function extractTDLfromLocal(): TodoList {
  const str = localStorage.getItem('TODOLIST');
  if (!str) 
    return {label: 'L3 MIAGE', items: [] };
  
  const L: TodoList = JSON.parse(str);
  idItem = 1 + L.items.reduce( (max, item) => item.id > max ? item.id : max , 0);

  return L;
}

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private subj = new BehaviorSubject<TodoList>(
    extractTDLfromLocal()
  );
  readonly observable: Observable<TodoList>;

  constructor(ngz: NgZone) {
    this.observable = this.subj.pipe(
      runInZone(ngz),
      shareReplay(1)
    );

    this.observable.subscribe( 
      TDL => localStorage.setItem("TODOLIST", JSON.stringify(TDL) )
    )
  }

  create(...labels: readonly string[]): this {
    const L: TodoList = this.subj.value;
    this.subj.next( {
      ...L,
      items: [
        ...L.items,
        ...labels.filter( l => l !== '').map(
            label => ({label, isDone: false, id: idItem++})
          )
      ]
    } );
    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );
    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    if(data.label !== "") {
      const L = this.subj.value;
      this.subj.next( {
        ...L,
        items: L.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
      } );
    } else {
      this.delete(...items);
    }
    return this;
  }

}
