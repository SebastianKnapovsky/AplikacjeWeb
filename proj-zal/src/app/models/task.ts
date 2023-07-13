export class Task {
  public id: number;
  public name: string;
  public type: string;
  public description: string;
  public priority: string;
  public effort: number;
  public dateAdded: Date;
  public functionalityName: string;
  public taskStatus: string;

  constructor(
    id: number,
    name: string,
    type: string,
    description: string,
    priority: string,
    effort: number,
    dateAdded: Date = new Date(),
    functionalityName: string,
    taskStatus: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.priority = priority;
    this.effort = effort;
    this.dateAdded = dateAdded;
    this.functionalityName = functionalityName;
    this.taskStatus = taskStatus;
  }
}