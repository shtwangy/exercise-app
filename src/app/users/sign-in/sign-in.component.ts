import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  passwordHide = true;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(160), Validators.pattern('^[ -~]+$')]],
      password: ['', [Validators.required, Validators.maxLength(32), Validators.pattern('^[ -~]+$')]]
    });
  }

  onSubmit() {
    console.log(this.formGroup);
    this.authService.signIn(
      this.formGroup.get('email').value,
      this.formGroup.get('password').value
    );
  }

}
