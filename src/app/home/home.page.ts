import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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

  constructor(private alertController: AlertController) {
    this.initForm();
  }

  private initForm() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]);

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

  public async deleteTask(task: ITask) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTaskFromList(task);
          },
        },
      ],
    });
    await alert.present();
  }

  public deleteTaskFromList(task: ITask) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }
}
