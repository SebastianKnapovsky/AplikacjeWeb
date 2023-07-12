import { Injectable } from '@angular/core';
import { Functionality } from '../models/functionality';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Metoda do zapisywania danych w Local Storage
  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Metoda do odczytywania danych z Local Storage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Metoda do usuwania danych z Local Storage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  // Metoda do dodawania nowego zadania
  addTask(task: Task): void {
    const tasks: Task[] = this.getData('tasks') || [];
    tasks.push(task);
    this.saveData('tasks', tasks);
  }

  // Metoda do aktualizacji istniejącego zadania
  updateTask(task: Task): void {
    const tasks: Task[] = this.getData('tasks') || [];
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.saveData('tasks', tasks);
    }
  }

  // Metoda do usuwania zadania
  deleteTask(taskId: number): void {
    const tasks: Task[] = this.getData('tasks') || [];
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    this.saveData('tasks', updatedTasks);
  }

  // Metoda do pobierania wszystkich zadań
  getAllTasks(): Task[] {
    return this.getData('tasks') || [];
  }

  // Metoda do dodawania nowej funkcjonalności
  addFunctionality(functionality: Functionality): void {
    debugger;
    const functionalities: Functionality[] = this.getData('functionalities') || [];
    functionalities.push(functionality);
    this.saveData('functionalities', functionalities);
  }
  deleteFunctionality(functionalityId: number): void {
    const functionalities: Functionality[] = this.getData('functionalities') || [];
    const updatedFunctionalities = functionalities.filter(func => func.id !== functionalityId);
    this.saveData('functionalities', updatedFunctionalities);
  }

  // Metoda do pobierania wszystkich funkcjonalności
  getAllFunctionalities(): Functionality[] {
    return this.getData('functionalities') || [];
  }
}