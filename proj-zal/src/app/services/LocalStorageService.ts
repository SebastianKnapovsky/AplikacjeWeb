import { Injectable } from '@angular/core';

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
}