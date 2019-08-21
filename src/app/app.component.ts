import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';



export interface FormContainer {
  controlName: string;
  controlLabel: string;
  control: AbstractControl;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  controls: FormContainer[];

  constructor(private formBuilder: FormBuilder) {
    this.controls = [
      { controlName: 'name', controlLabel: 'labelName', control: new FormControl('', [Validators.required])},
      { controlName: 'email', controlLabel: 'labelEmail', control: new FormControl('', [Validators.required, Validators.email])}
    ];

    // this.form = formBuilder.group({
    //   name: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]]
    // });

    // console.log('form', this.form);
    // console.log('form2', f2);
  }
}
