import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormContainer } from '../app.component';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-parser',
  templateUrl: './form-parser.component.html',
  styleUrls: ['./form-parser.component.scss']
})
export class FormParserComponent implements OnInit, OnDestroy {
  @Input() controls: FormContainer[];
  @Output() formChanged = new EventEmitter<any>();
  form = new FormGroup({});
  formSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.controls.forEach(control => {
      this.form.addControl(control.name, control.control);
    });

    this.trackFormChanges();
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  trackFormChanges() {
    this.formSubscription = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.formChanged.emit(this.form.value));
  }

  checkForm() {
    console.log('Value:', this.form.value);
    console.log(
      `Validation: touched: ${this.form.touched}, dirty: ${this.form.dirty}, valid: ${this.form.valid}`
    );
  }
}
