import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

export interface FormContainer {
  kindOfComponent: string; // our custom input
  name: string;
  label: string;
  type?: string;
  options?: { label: string, value: number }[];
  control: AbstractControl;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  controls: FormContainer[];
  cars = [
    { value: 1, label: 'Fiat' },
    { value: 2, label: 'Volvo' },
  ];

  optionsCounter = 3;

  constructor() {
    this.controls = [
      { kindOfComponent: 'input', name: 'name', label: 'Name', type: 'text', control: new FormControl('', [Validators.required])},
      { kindOfComponent: 'input', name: 'email', label: 'Email', type: 'email', control: new FormControl('', [Validators.required, Validators.email])},
      { kindOfComponent: 'input', name: 'phone', label: 'Phone number', type: 'number', control: new FormControl('', [Validators.required, Validators.min(100000000), Validators.max(999999999)])},
      { 
        kindOfComponent: 'select',
        name: 'favoriteCar',
        label: 'Favorite Car',
        options: this.cars,
        control: new FormControl('', [Validators.required])
      },
    ];
  }

  addCar(carName: string) {
    this.cars = [ ...this.cars, { value: this.optionsCounter++, label: carName } ];
    this.controls = this.controls.map(c => {
      if (c.name === 'favoriteCar') {
        c.options = this.cars;
      }
      return c;
    })
  }

  addOption(form: any) {
    if (form && form.name) {
      this.addCar(form.name);
    }
  }
}
