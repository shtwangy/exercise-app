import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  passwordHide = true;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // TODO: Enhance Validation.
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(32), Validators.pattern('^[ -~]+$')]],
      email: ['', [Validators.required, Validators.maxLength(160), Validators.pattern('^[ -~]+$')]],
      password: ['', [Validators.required, Validators.maxLength(32), Validators.pattern('^[ -~]+$')]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(32), Validators.pattern('^[ -~]+$')]]
    });
  }

  onSubmit() {
    console.log(this.formGroup);
    this.authService.signIn(
      this.formGroup.get('username').value,
      this.formGroup.get('email').value,
      this.formGroup.get('password').value,
      this.formGroup.get('confirmPassword').value
    );
  }
}
