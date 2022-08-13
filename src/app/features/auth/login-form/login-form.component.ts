import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() isRegister: boolean = true;
  @Output() formData: EventEmitter<{
    name: string,
    email: string,
    password: string
  }> = new EventEmitter();
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    let nameValidators = [];
    if (this.isRegister) {
      nameValidators.push(Validators.required);
    }

    this.formGroup = this.formBuilder.group({
      name: ['', nameValidators],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.formData.emit(this.formGroup.value);
    } else {
      // TODO - Add an error toast
      console.log("Sign in not valid");
    }
  }
}
