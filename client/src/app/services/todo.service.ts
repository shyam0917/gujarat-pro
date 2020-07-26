import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
baseUrl = "http://localhost:3000/todo/";
  constructor(private http: HttpClient) { }

getAllTodos(){
return this.http.get(`${this.baseUrl}getAll`);
}

addTodo(todoDetails){
  return this.http.post(`${this.baseUrl}addTodo`,todoDetails);
}

deleteTodo(todoDetails){
return this.http.post(`${this.baseUrl}deleteTodo`,todoDetails);
}

updateTodo(todoDetails){
  return this.http.post(`${this.baseUrl}updateTodo`,todoDetails);
}


}
