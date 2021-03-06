import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo-service.service'; 

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON(); 
        x["$key"] = element.key;
        this.toDoListArray.push(x); 
      })

      
        this.toDoListArray.sort((a,b) => {
          return a.isChecked - b.isChecked;
        })
    });
  }

  onAdd(itemTitle, itemNotes) {
    this.toDoService.addTitle(itemTitle.value, itemNotes.value); 
    itemTitle.value = null; 
    itemNotes.value = null; 
  }

  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key : string){
    this.toDoService.removeTitle($key); 
  }

}
