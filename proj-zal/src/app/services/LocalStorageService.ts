import { Injectable } from '@angular/core';
import { Functionality } from '../models/functionality';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  addTask(task: Task, tasksId: number): void {

    const functionalities: Functionality[] = this.getData('functionalities') || [];
    const tasks: Task[] = functionalities[tasksId].tasks
    tasks.push(task);
    this.saveData('functionalities', functionalities);
  }

  updateTask(task: Task, tasksId: number): void {

    const functionalities: Functionality[] = this.getData('functionalities') || [];
    const tasks: Task[] = functionalities[tasksId].tasks
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.saveData('functionalities', functionalities);
    }
  }

  deleteTask(taskId: number, tasksId: number): void {

    var functionalities: Functionality[] = this.getData('functionalities') || [];
    functionalities[tasksId].tasks.forEach((element, index) => {
      if (element.id === taskId) {
        functionalities[tasksId].tasks.splice(index, 1)
      }
    });
    this.saveData('functionalities', functionalities);
  }

  getAllTasks(tasksId: number): Task[] {

    const functionalities: Functionality[] = this.getData('functionalities') || [];
    var tasks: Task[] = functionalities[tasksId]?.tasks || [];

    return tasks;
  }

  addFunctionality(functionality: Functionality): void {
    const functionalities: Functionality[] = this.getData('functionalities') || [];
    functionalities.push(functionality);
    this.saveData('functionalities', functionalities);
  }
  editFunctionality(functionality: Functionality, tasksId: number): void {

    const functionalityList: Functionality[] = this.getData('functionalities') || [];
    const index = functionalityList.findIndex(t => t.id === functionality.id);
    if (index !== -1) {
      functionalityList[index] = functionality;
      this.saveData('functionalities', functionalityList);
    }
    this.saveData('functionalities', functionalityList);
  }
  deleteFunctionality(functionalityId: number): void {
    const functionalities: Functionality[] = this.getData('functionalities') || [];
    const updatedFunctionalities = functionalities.filter(func => func.id !== functionalityId);
    this.saveData('functionalities', updatedFunctionalities);
  }
  getAllFunctionalities(): Functionality[] {
    return this.getData('functionalities') || [];
  }
}