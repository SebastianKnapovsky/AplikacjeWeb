import { Task } from "./task";

export class Functionality {
    public id: number;
    public name: string;
    public description: string;
    public priority: string;
    public projectOwner: string;
    public tasks: Task[];
  
    constructor(
      id: number,
      name: string,
      description: string,
      priority: string,
      projectOwner: string,
      tasks: Task[]
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.priority = priority;
      this.projectOwner = projectOwner;
      this.tasks = tasks;
    }
  }