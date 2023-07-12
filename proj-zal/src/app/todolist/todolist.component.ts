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
  functionalityArray: Functionality[] = [];
  functionality: Functionality = new Functionality(0, '', '', '','',[]);
  time: Date = new Date();
  task: Task = new Task(0,'','','','',0,this.time,'','',);
  

  currentUser: string = "John Doe";

  showTaskForm: boolean = false;
  taskEditMode: boolean = false;

  selectedTask: Task | null = null;
  selectedFunctionality: Functionality | null = null;
  showFunctionalityForm: boolean = false; 
  functionalityEditMode: boolean = false;
  
  defoulttaskStatus: string = "To Do";
  editIndex: number | null = null;
  taskInfoDialogOpen: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.taskArray = this.localStorageService.getAllTasks();
    this.functionalityArray = this.localStorageService.getAllFunctionalities();
  }

  addNewTaskForm(): void {
    debugger;
    this.taskEditMode = false;
    this.showTaskForm = !this.showTaskForm;
  }

  onSubmit(form: NgForm) {
    const date = new Date();
    const task: Task = new Task(
      0, // Używamy null na razie
      form.controls['name'].value,
      form.controls['type'].value,
      form.controls['describe'].value,
      form.controls['priority'].value,
      parseInt(form.controls['effort'].value),
      date, // Używamy null na razie
      "", // Używamy null na razie
      this.defoulttaskStatus
    );
  
    this.localStorageService.addTask(task);
    form.reset();
    this.showTaskForm = false;
  }

  onDelete(index: number) {
    const taskToDelete = this.taskArray[index];
    this.localStorageService.deleteTask(taskToDelete.id);
  }
  onEdit(index: number) {
    this.showTaskForm = !this.showTaskForm;
    this.taskEditMode = true;
    this.editIndex = index;
    this.selectedTask;
    if(this.selectedTask){
      this.task = {
        id: this.selectedTask.id,
        name: this.selectedTask.name,
        type: this.selectedTask.type,
        description: this.selectedTask.description,
        priority: this.selectedTask.priority,
        effort: this.selectedTask.effort,
        dateAdded: this.selectedTask.dateAdded,
        functionalityName: this.selectedTask.functionalityName,
        taskStatus: this.selectedTask.taskStatus,
      };
    }
    
  }
  openTaskInfoDialog(index: number) {
    this.taskInfoDialogOpen = true;
  }
  
  onUpdate(taskForm: NgForm) {
    const editedTaskIndex = this.taskArray.findIndex(f => f.id === this.task.id);
    this.taskArray[editedTaskIndex].name = this.task.name;
    this.taskArray[editedTaskIndex].type = this.task.type;
    this.taskArray[editedTaskIndex].description = this.task.description;
    this.taskArray[editedTaskIndex].priority = this.task.priority;
    this.taskArray[editedTaskIndex].effort = this.task.effort;

    taskForm.reset();
    this.resetTask();
    this.showTaskForm = false;
  }


  onFunctionalityChange() {
    this.showFunctionalityForm = false;
  }

  onFunctionalitySubmit(functionalityForm: NgForm) {
    if (this.functionalityEditMode) {
      // Edycja istniejącej funkcjonalności
      const editedFunctionalityIndex = this.functionalityArray.findIndex(f => f.id === this.functionality.id);
      if (editedFunctionalityIndex !== -1) {
        // Nadpisz wartości pola funkcjonalności z właściwości `functionality`
        this.functionalityArray[editedFunctionalityIndex].name = this.functionality.name;
        this.functionalityArray[editedFunctionalityIndex].description = this.functionality.description;
        this.functionalityArray[editedFunctionalityIndex].priority = this.functionality.priority;
      }
    } else {
      // Dodawanie nowej funkcjonalności
      const newFunctionality = new Functionality(
        // Przypisz unikalne ID, np. na podstawie długości tablicy
        this.functionalityArray.length + 1,
        this.functionality.name,
        this.functionality.description,
        this.functionality.priority,
        this.currentUser,
        this.taskArray
      );
  
      this.functionalityArray.push(newFunctionality);
    }
  
    functionalityForm.reset();
    this.resetFunctionality();
    this.showFunctionalityForm = false;
  }
  
  resetFunctionality() {
    this.functionality = {
      id: 0,
      name: '',
      description: '',
      priority: '',
      projectOwner: '',
      tasks: []
    }
  }
  resetTask() {
    this.task = {
      id: 0,
      name: '',
      type:'',
      description: '',
      priority: '',
      effort: 0,
      dateAdded: this.time,
      functionalityName: this.functionality.name,
      taskStatus: ""
    }
  }

  addFunctionalityForm() {
    this.showFunctionalityForm = !this.showFunctionalityForm;
    this.functionalityEditMode = false;
    this.resetFunctionality();
  }
  editFunctionalityForm() {
    this.showFunctionalityForm = !this.showFunctionalityForm;
    this.functionalityEditMode = true;
  
    if (this.selectedFunctionality) {
      // Skopiuj wartości z wybranej funkcjonalności do właściwości `functionality`
      this.functionality = {
        id: this.selectedFunctionality.id,
        name: this.selectedFunctionality.name,
        description: this.selectedFunctionality.description,
        priority: this.selectedFunctionality.priority,
        projectOwner: this.selectedFunctionality.projectOwner,
        tasks: this.selectedFunctionality.tasks
      };
    } else {
      // Jeśli żadna funkcjonalność nie jest wybrana, zresetuj wartości właściwości `functionality`
      this.resetFunctionality();
    }
  }
  infoFunctionalityForm() {
    this.showFunctionalityForm = !this.showFunctionalityForm;
  }
  deleteFunctionalityForm() {
    if (this.selectedFunctionality) {
      const functionalityIndex = this.functionalityArray.findIndex(func => func.id === this.selectedFunctionality?.id);
      if (functionalityIndex !== -1) {
        this.functionalityArray.splice(functionalityIndex, 1);
        this.localStorageService.deleteFunctionality(this.selectedFunctionality.id);
      }
    }
  
    this.showFunctionalityForm = false;
    this.resetFunctionality();
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
