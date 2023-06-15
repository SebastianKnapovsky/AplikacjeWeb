import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [{ taskName: 'SQL script',tasktype: 'Implementacja',taskdescribe: 'Przygotowanie skryptów',taskpriority: '1',taskeffort: '3', isCompleted: false }];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      tasktype: form.controls['type'].value,
      taskdescribe: form.controls['describe'].value,
      taskpriority: form.controls['priority'].value,
      taskeffort: form.controls['effort'].value,
      isCompleted: false
    })
    form.reset();
  }

  onDelete(index: number) {
    console.log(index);
    this.taskArray.splice(index, 1);
  }
  onEdit(index: number) {
    console.log(index);
  }

  onCheck(index: number) {
    console.log(this.taskArray);
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

}
