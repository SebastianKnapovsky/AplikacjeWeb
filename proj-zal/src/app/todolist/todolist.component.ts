import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [{ taskName: 'SQL script',tasktype: 'Implementacja',taskdescribe: 'Przygotowanie skryptów',taskpriority: '1',taskeffort: '3', taskStatus: "To Do" }];

  functionalityArray: string[] = []; 
  selectedFunctionality: string = ''; 
  showFunctionalityForm: boolean = false; 

  showTaskForm: boolean = false;

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
      taskStatus: form.controls['taskStatus'].value
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



  
  onFunctionalitySubmit(functionalityForm: NgForm) {
    const functionalityName = functionalityForm.value.functionalityName;
    
    this.functionalityArray.push(functionalityName);
    
    functionalityForm.reset();
  }

  
  toggleFunctionalityForm() {
    this.showFunctionalityForm = !this.showFunctionalityForm;
  }

  
  onFunctionalitySelectionChange() {
    
    console.log('Wybrana funkcjonalność:', this.selectedFunctionality);
  }


  
  onTaskStatusChange(task: any) {
    
    console.log('Zmieniony status dla zadania:', task.taskName, '- Nowy status:', task.taskStatus);
  }
  

  countTasksByStatus(status: string): number {
    return this.taskArray.filter(task => task.taskStatus === status).length;
  }
}
