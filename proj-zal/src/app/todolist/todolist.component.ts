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
  functionality: Functionality = new Functionality(0, '', '', '', '', []);
  time: Date = new Date();
  task: Task = new Task(0, '', '', '', '', 0, this.time, '', '',);

  currentUser: string = "John Doe";

  showTaskForm: boolean = false;
  taskEditMode: boolean = false;

  selectedTask: Task | null = null;
  selectedFunctionality: Functionality | null = null;
  canDeleteFunctionality: boolean = true;
  showFunctionalityForm: boolean = false;
  functionalityEditMode: boolean = false;

  defoulttaskStatus: string = "To Do";
  editIndex: number | null = null;
  taskInfoDialogOpen: boolean = false;
  functionalityInfoDialogOpen: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.functionalityArray = this.localStorageService.getAllFunctionalities();
    if (this.functionalityArray.length == 0) {
      this.addDefaultFunctionality();
    }
    this.selectedFunctionality = this.functionalityArray[0];
    this.taskArray = this.localStorageService.getAllTasks(this.selectedFunctionality?.id);
    this.functionalityValidation()

  }
  addDefaultFunctionality() {
    const date = new Date();
    const newFunctionality: Functionality = new Functionality(
      0,
      "Prace Organizacyjne",
      "organizacja",
      "1",
      this.currentUser,
      [],
    );

    this.localStorageService.addFunctionality(newFunctionality);
    this.functionalityArray = this.localStorageService.getAllFunctionalities();
  }
  functionalityValidation() {
    if (this.selectedFunctionality?.name == "Prace Organizacyjne") {
      this.canDeleteFunctionality = false;
    }
    else {
      this.canDeleteFunctionality = true;
    }
  }

  addNewTaskForm(): void {
    this.taskEditMode = false;
    this.showTaskForm = !this.showTaskForm;
  }

  onSubmit(form: NgForm) {

    const date = new Date();
    var idTask;
    if (this.taskArray.length == 0) {
      idTask = 0;
    }
    else {
      idTask = this.taskArray.length;
    }
    const newTask: Task = new Task(
      idTask,
      this.task.name,
      this.task.type,
      this.task.description,
      this.task.priority,
      this.task.effort,
      date,
      this.selectedFunctionality?.name ? this.selectedFunctionality.name.toString() : '',
      this.defoulttaskStatus
    );
    const tasksId = this.selectedFunctionality?.id ? this.selectedFunctionality.id : 0
    this.localStorageService.addTask(newTask, tasksId);
    this.taskArray = this.localStorageService.getAllTasks(tasksId);
    form.reset();
    this.showTaskForm = false;
  }

  onDelete(index: number) {
    const taskToDelete = this.taskArray[index];
    const tasksId = this.selectedFunctionality?.id ? this.selectedFunctionality.id : 0
    this.localStorageService.deleteTask(taskToDelete.id, tasksId);
    this.taskArray = this.localStorageService.getAllTasks(tasksId);
  }
  onEdit(index: number) {
    this.showTaskForm = !this.showTaskForm;
    this.taskEditMode = true;
    this.editIndex = index;
    this.selectedTask = this.taskArray[this.editIndex];
    if (this.selectedTask) {
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
    this.selectedTask = this.taskArray[index];
    this.taskInfoDialogOpen = true;
  }

  closeTaskInfoDialog() {
    this.selectedTask = null;
    this.taskInfoDialogOpen = false;
  }
  infoFunctionalityForm() {
    this.functionalityArray = this.localStorageService.getAllFunctionalities();
    const tasksId = this.selectedFunctionality?.id ? this.selectedFunctionality.id : 0
    this.selectedFunctionality = this.functionalityArray[tasksId];
    this.functionalityInfoDialogOpen = true;
  }

  closeFunctionalityInfoDialog() {
    this.functionalityInfoDialogOpen = false;
  }
  onUpdate(taskForm: NgForm) {
    const editedTaskIndex = this.taskArray.findIndex(f => f.id === this.task.id);
    this.taskArray[editedTaskIndex].name = this.task.name;
    this.taskArray[editedTaskIndex].type = this.task.type;
    this.taskArray[editedTaskIndex].description = this.task.description;
    this.taskArray[editedTaskIndex].priority = this.task.priority;
    this.taskArray[editedTaskIndex].effort = this.task.effort;

    const tasksId = this.selectedFunctionality?.id ? this.selectedFunctionality.id : 0;
    this.localStorageService.updateTask(this.taskArray[editedTaskIndex], tasksId);

    taskForm.reset();
    this.resetTask();
    this.showTaskForm = false;
  }


  onFunctionalityChange() {

    this.showFunctionalityForm = false;
    this.functionalityValidation();
    const tasksId = this.selectedFunctionality?.id ? this.selectedFunctionality.id : 0
    this.taskArray = this.localStorageService.getAllTasks(tasksId);
  }

  onFunctionalitySubmit(functionalityForm: NgForm) {
    if (this.functionalityEditMode) {
      const editedFunctionalityIndex = this.functionalityArray.findIndex(f => f.id === this.functionality.id);
      if (editedFunctionalityIndex !== -1) {
        this.functionalityArray[editedFunctionalityIndex].name = this.functionality.name;
        this.functionalityArray[editedFunctionalityIndex].description = this.functionality.description;
        this.functionalityArray[editedFunctionalityIndex].priority = this.functionality.priority;
        const tasksId = this.selectedFunctionality?.id ? this.selectedFunctionality.id : 0;
        this.localStorageService.editFunctionality(this.functionality, tasksId);
      }
    } else {
      const newFunctionality = new Functionality(
        this.functionalityArray.length,
        this.functionality.name,
        this.functionality.description,
        this.functionality.priority,
        this.currentUser,
        []
      );
      this.localStorageService.addFunctionality(newFunctionality)
      this.functionalityArray = this.localStorageService.getAllFunctionalities();
      this.selectedFunctionality = this.functionalityArray[0];
    }

    functionalityForm.reset();
    this.showFunctionalityForm = false;
    this.resetFunctionality();
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
      type: '',
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
      this.functionality = {
        id: this.selectedFunctionality.id,
        name: this.selectedFunctionality.name,
        description: this.selectedFunctionality.description,
        priority: this.selectedFunctionality.priority,
        projectOwner: this.selectedFunctionality.projectOwner,
        tasks: this.selectedFunctionality.tasks
      };
    } else {
      this.resetFunctionality();
    }
  }

  deleteFunctionalityForm() {
    if (this.selectedFunctionality) {
      const functionalityIndex = this.functionalityArray.findIndex(func => func.id === this.selectedFunctionality?.id);
      if (functionalityIndex !== -1) {
        this.functionalityArray.splice(functionalityIndex, 1);
        this.localStorageService.deleteFunctionality(this.selectedFunctionality.id);
      }
    }
    this.functionalityArray = this.localStorageService.getAllFunctionalities();
    this.selectedFunctionality = this.functionalityArray[0];
    this.showFunctionalityForm = false;
    this.functionalityValidation();
    this.resetFunctionality();
  }
  onTaskStatusChange(newStatus: string, task: any) {

    task.taskStatus = newStatus;
    const tasksId = this.selectedFunctionality?.id ? this.selectedFunctionality.id : 0
    this.localStorageService.updateTask(task, tasksId);
  }

  countTasksByStatus(status: string): number {
    return this.taskArray.filter(task => task.taskStatus === status).length;
  }
}
