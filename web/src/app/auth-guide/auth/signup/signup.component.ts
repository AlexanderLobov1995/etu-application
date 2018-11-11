import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthState} from '../auth-state';
import {AuthService} from '../auth.service';
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthResponse} from "../auth-interfaces";
import {AuthGuideState} from "../../auth-guide-state";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.styl'],
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
    )],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  inputFormGroup: FormGroup;

  inputFirstNameFormControl: FormControl;
  inputLastNameFormControl: FormControl;
  inputPhoneNumberFormControl: FormControl;
  inputEmailFormControl: FormControl;
  inputUsernameFormControl: FormControl;
  inputPasswordFormControl: FormControl;
  inputConfirmPasswordFormControl: FormControl;
  inputSecretQuestionFormControl: FormControl;
  inputSecretAnswerFormControl: FormControl;

  errorMessage = '';

  constructor(public authService: AuthService,
              private authState: AuthState,
              private appState: AuthGuideState,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.inputFirstNameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputLastNameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputPhoneNumberFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputEmailFormControl = new FormControl('', [
      Validators.required, Validators.email
    ]);
    this.inputUsernameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputPasswordFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputConfirmPasswordFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputSecretQuestionFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputSecretAnswerFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputFormGroup = new FormGroup({
      firstName: this.inputFirstNameFormControl,
      lastName: this.inputLastNameFormControl,
      phoneNumber: this.inputPhoneNumberFormControl,
      email: this.inputEmailFormControl,
      username: this.inputUsernameFormControl,
      password: this.inputPasswordFormControl,
      secretQuestion: this.inputSecretQuestionFormControl,
      secretAnswer: this.inputSecretAnswerFormControl
    });
  }

  signUp() {
    if (this.inputFormGroup.valid) {
      this.authService.signUp(
        this.inputFirstNameFormControl.value,
        this.inputLastNameFormControl.value,
        this.inputPhoneNumberFormControl.value,
        this.inputEmailFormControl.value,
        this.inputUsernameFormControl.value,
        this.inputPasswordFormControl.value,
        this.inputSecretQuestionFormControl.value,
        this.inputSecretAnswerFormControl.value
        ).subscribe((authResponse: AuthResponse) => this.handleSuccess(authResponse),
        (error) => this.handleError(error));
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
}
