import { Component, OnInit, NgModule } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.taskObj= new Todo();
    this.getAllTasks();
    this.taskArr= [];
    this.addTaskData= '';
    this.editTaskData= '';
  }
  constructor(private api:TasksService) {}

  //create variables 
  taskObj:Todo= new Todo();
  taskArr:Todo[]= [];
  addTaskData:string= '';
  editTaskData:string= '';

  addTask() {
   this.taskObj.task= this.addTaskData;
    this.api.addTask(this.taskObj).subscribe((resp)=> {
      this.ngOnInit();
    }, err=> {
      alert("Create failed, "+err);
    });
  }

  getAllTasks() {
    this.api.getAllTask().subscribe((resp)=> {
      this.taskArr= resp;
    }, err=> {
      alert("Fetch failed, "+err)
    });
  }

  editTask() {
    this.taskObj.task= this.editTaskData;
    this.api.editTask(this.taskObj).subscribe((resp)=> {
      this.ngOnInit();
    }, err=> {alert("Update failed, "+ err)})
  }

  callEditMethod(todo:Todo) {
    this.taskObj= todo;
    this.editTaskData= todo.task;
  }

  deleteTask(todo:Todo) {
    this.api.deleteTask(todo).subscribe((resp)=> {
      this.ngOnInit();
    }, err=> {alert("Deletion failed, "+err)})
  }

}
