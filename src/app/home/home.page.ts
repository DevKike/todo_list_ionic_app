import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface ITask {
  title: string;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public title!: FormControl;
  public description!: FormControl;

  public taskForm!: FormGroup;

  public tasks: ITask[] = [];
  public taskDone: boolean = false;
  public taskToDelete!: ITask;

  constructor() {
    this.initForm();
  }

  private initForm() {
    this.title = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.description = new FormControl('', [Validators.required, Validators.minLength(10)]);

    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
    });
  }

  public doRegister() {
    const newTask: ITask = {
      title: this.title.value,
      description: this.description.value,
      done: false,
    };

    this.tasks.push(newTask);
    this.taskForm.reset();
  }

  public deleteATask(task: ITask) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.deleteATask(this.taskToDelete);
      }
    },
  ];

  public setTaskToDelete(task: ITask) {
    this.taskToDelete = task;
  }
}
