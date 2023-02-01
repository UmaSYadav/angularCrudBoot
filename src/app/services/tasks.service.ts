import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl!:string;
  constructor(private http:HttpClient) {
    this.baseUrl= 'http://localhost:3000/tasks';
  }

  addTask(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }
  getAllTask():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }
  deleteTask(todo:Todo):Observable<Todo> {
    return this.http.delete<Todo>(this.baseUrl + '/' + todo.id);
  }
  editTask(todo:Todo):Observable<Todo> {
    return this.http.put<Todo>(this.baseUrl + '/' + todo.id, todo);
  }
}
