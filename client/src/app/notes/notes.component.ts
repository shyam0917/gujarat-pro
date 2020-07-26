import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [TodoService]
})
export class NotesComponent implements OnInit {
  todoArr: any = [];
  filterArr:any=[];
  todoApp = {
    todoText: ''
  }

  constructor(private todoService: TodoService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.todoService.getAllTodos().subscribe(res => {
      this.todoArr = res['data'];
      this.filterArr = res['data'];
      this.toastr.success(res['message']);
      console.log("res", res);
    }, err => {
      console.log("Err", err);
    })
  }

  addTodo(data) {
    let todo = data.form.value.todoText;
    console.log("Data", data.form.value);
    let todoDetails = {
      text: todo
    }
    this.todoService.addTodo(todoDetails).subscribe(res => {
      this.toastr.success(res['message']);
      this.getTodoList();
      console.log("Res", res);
    }, err => {
      console.log("err", err);
    }
    )
    data.reset();
  }

  deleteTodo(mf) {
    let todoDetails = {
      todoId: mf._id
    }
    this.todoService.deleteTodo(todoDetails).subscribe(res => {
      this.toastr.success(res['message']);
      this.getTodoList();
      console.log("res", res);
    }, err => {
      console.log("err", err);
    })

  }

  updateTodo(not) {
    let todoDetails = {
      todoId: not._id,
      text: not.text,
      status: 'completed'
    }
    this.todoService.updateTodo(todoDetails).subscribe(res => {
      this.toastr.success(res['message']);
      console.log("Res", res);
    }, err => {
      console.log("err", err);
    })
  }

  onChange(event){
    let key = event.target.value;
    if(key=='pending'){
      this.todoArr = this.filterArr.filter(item=>item.status=='pending');
    }
    else if(key=='completed'){
      this.todoArr = this.filterArr.filter(item=>item.status=='completed');
    }
    else{
      this.todoArr = this.filterArr;
    }
    console.log("tty",event.target.value);
  }


}
