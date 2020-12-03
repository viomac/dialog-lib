import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DialogLibConfig} from '../../../../../dialog-lib/src/lib/dialog-lib.config';
import {DialogRef} from '../../../../../dialog-lib/src/lib/dialog-ref';

@Component({
  selector: 'app-greeting',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ config.data.message }}</h5>
        <form [formGroup]="greetingForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="exampleInputName">
              Name
            </label>
            <input type="text" class="form-control"
                   id="exampleInputName"
                   formControlName="name"
                   aria-describedby="nameHelp">
          </div>
          <div class="form-group">
            <label for="exampleInputGreeting">
              Greeting
            </label>
            <input type="text" class="form-control"
                   id="exampleInputGreeting"
                   formControlName="greeting">
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"
                   formControlName="shareInfo">
            <label class="form-check-label" for="exampleCheck1">Share my info</label>
          </div>
          <a class="btn btn-primary mr-2" (click)="onClose()">CANCEL</a>
          <button type="submit" class="btn btn-primary">SEND</button>
        </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class GreetingComponent {
  greetingForm = new FormGroup({
    name: new FormControl(''),
    greeting: new FormControl(''),
    shareInfo: new FormControl(false)
  });


  constructor(public config: DialogLibConfig, public dialog: DialogRef) {}

  onSubmit(): void {
    this.dialog.close(this.greetingForm.value);
  }

  onClose(): void {
    this.dialog.close('Canceled');
  }
}
