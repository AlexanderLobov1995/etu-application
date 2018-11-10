import {animate, style, transition, trigger} from '@angular/animations';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthGuideState} from '../../auth-guide-state';
import {AuthState} from '../auth-state';
import {AuthService} from '../auth.service';
import * as jwt from 'jsonwebtoken';
import {AuthResponse} from "../auth-interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({transform: 'translateY(-100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateY(0)', 'opacity': 1}),
            animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
          ]
        )]
    )
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  @ViewChild('authForm') authForm: NgForm;

  username = '';
  password = '';

  inputFormGroup: FormGroup;
  inputUsernameFormControl: FormControl;
  inputPasswordFormControl: FormControl;

  errorMessage = '';

  constructor(public authService: AuthService,
              private authState: AuthState,
              private appState: AuthGuideState,
              private cd: ChangeDetectorRef) {
  }

  login() {
    if (this.inputFormGroup.valid) {
      this.authService.login(this.inputFormGroup.value.username, this.inputFormGroup.value.password)
        .subscribe((authResponse: AuthResponse) => this.handleSuccess(authResponse), (error) => this.handleError(error));
    }
  }


  handleSuccess(authResponse: AuthResponse) {
    this.authState.token = authResponse.token;
    this.authState.user = authResponse.user;
    this.appState.showAuthDialog = false;
  }

  handleError(error) {
    this.inputUsernameFormControl.setErrors({error});
    this.inputPasswordFormControl.setErrors({error});
    this.errorMessage = 'Неверно введены логин или пароль';
    this.cd.detectChanges();
    console.log('error= ', error);
  }

  ngOnInit() {
    this.inputUsernameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputPasswordFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputFormGroup = new FormGroup({
      username: this.inputUsernameFormControl,
      password: this.inputPasswordFormControl
    });
  }
}
