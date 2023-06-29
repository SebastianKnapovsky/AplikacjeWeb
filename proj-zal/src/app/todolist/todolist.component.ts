import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/task';
import { Functionality } from '../models/functionality';
import { LocalStorageService } from '../services/LocalStorageService';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: Task[] = [];

  functionalityArray: string[] = []; 
  selectedFunctionality: string = ''; 
  showFunctionalityForm: boolean = false; 

  showTaskForm: boolean = false;
  taskEditMode: boolean = false;
  functionalityEditMode: boolean = false;
  editIndex: number | null = null;


  taskInfoDialogOpen: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.taskArray = this.localStorageService.getAllTasks();
  }

  onSubmit(form: NgForm) {
    const date = new Date();
    const task: Task = new Task(
      0, // Używamy null na razie
      form.controls['task'].value,
      form.controls['type'].value,
      form.controls['describe'].value,
      form.controls['priority'].value,
      parseInt(form.controls['effort'].value),
      date, // Używamy null na razie
      this.selectedFunctionality, // Używamy null na razie
      ""
    );
  
    this.localStorageService.addTask(task);
    form.reset();
  }

  onDelete(index: number) {
    debugger;
    const taskToDelete = this.taskArray[index];
    this.localStorageService.deleteTask(taskToDelete.id);
  }
  onEdit(index: number) {
    this.showTaskForm = true;
    this.taskEditMode = true;
    this.editIndex = index;
  }
  openTaskInfoDialog(index: number) {
    this.taskInfoDialogOpen = true;
  }
  
  closeTaskInfoDialog() {
    this.taskInfoDialogOpen = false;
  }


  onUpdate(taskForm: any) {
  }



  
  onFunctionalitySubmit(functionalityForm: NgForm) {
    const functionalityName = functionalityForm.value.functionalityName;
    
    this.functionalityArray.push(functionalityName);
    
    functionalityForm.reset();
  }

  
  addFunctionalityForm() {
    this.showFunctionalityForm = !this.showFunctionalityForm;
    this.functionalityEditMode = false;
  }
  editFunctionalityForm() {
    this.showFunctionalityForm = !this.showFunctionalityForm;
    this.functionalityEditMode = true;
  }
  infoFunctionalityForm() {
    this.showFunctionalityForm = !this.showFunctionalityForm;
  }
  deleteFunctionalityForm() {
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
