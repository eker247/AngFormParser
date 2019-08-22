import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormContainer } from '../app.component';

@Component({
  selector: 'app-form-parser',
  templateUrl: './form-parser.component.html',
  styleUrls: ['./form-parser.component.scss']
})
export class FormParserComponent implements OnInit {
  @Input() controls: FormContainer[];
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.controls.forEach(control => {
      this.form.addControl(control.name, control.control);
    });
  }

  checkForm() {
    console.log('Value:', this.form.value);
    console.log(`Validation: touched: ${this.form.touched}, dirty: ${this.form.dirty}, valid: ${this.form.valid}`);
  }
}
