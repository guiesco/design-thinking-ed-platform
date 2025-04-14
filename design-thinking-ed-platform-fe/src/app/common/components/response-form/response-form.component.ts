import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface IResponseFormField {
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
}

@Component({
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  styleUrls: ['./response-form.component.scss'],
})
export class ResponseFormComponent implements OnInit {
  @Input() fields: IResponseFormField[] = [];
  @Input() submitButtonText: string = 'Enviar';
  @Input() loading = false;
  @Input() error: any = null;

  @Output() submitForm = new EventEmitter<Record<string, string>>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const formGroup: { [key: string]: any } = {};
    this.fields.forEach((field) => {
      formGroup[field.key] = ['', field.required ? Validators.required : []];
    });
    this.form = this.fb.group(formGroup);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.form.reset();
    }
  }
}
