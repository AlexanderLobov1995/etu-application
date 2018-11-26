import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthState} from '../auth-state';
import {AuthService} from '../auth.service';
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthResponse} from "../auth-interfaces";
import {AuthGuideState} from "../../auth-guide-state";
import {BehaviorSubject} from "rxjs";

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
  inputAdminFormControl: FormControl;

  errorMessage = new BehaviorSubject('');

  phoneMask = ['+','7', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

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
      Validators.required, this.phoneNumberValidator()
    ]);
    this.inputEmailFormControl = new FormControl('', [
      Validators.required, Validators.email
    ]);
    this.inputUsernameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputPasswordFormControl = new FormControl('', [
      Validators.required, this.confirmPasswordValidator()
    ]);
    this.inputConfirmPasswordFormControl = new FormControl('', [
      Validators.required, this.confirmPasswordValidator()
    ]);
    this.inputSecretQuestionFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputSecretAnswerFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputAdminFormControl =  new FormControl(false);
    this.inputFormGroup = new FormGroup({
      firstName: this.inputFirstNameFormControl,
      lastName: this.inputLastNameFormControl,
      phoneNumber: this.inputPhoneNumberFormControl,
      email: this.inputEmailFormControl,
      username: this.inputUsernameFormControl,
      password: this.inputPasswordFormControl,
      secretQuestion: this.inputSecretQuestionFormControl,
      secretAnswer: this.inputSecretAnswerFormControl,
      admin: this.inputAdminFormControl
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
        this.inputSecretAnswerFormControl.value,
        this.inputAdminFormControl.value
        ).subscribe((authResponse: AuthResponse) => this.handleSuccess(authResponse),
        (error) => this.handleError(error));
    }
  }

  handleSuccess(authResponse: AuthResponse) {
    this.authState.token.next(authResponse.token);
    this.authState.user = authResponse.user;
    this.appState.showPopupState.next('');
  }

  handleError(error) {
    if(error.status === 300) {
      this.appState.tempUserId.next(error.error.userId);
      this.appState.showPopupState.next('showAnswerDialog');
      return;
    }
    this.errorMessage.next('Что-то пошло не так');
  }



  get isShowAdditions(){
    return this.isShowConfirmPassword &&
      this.inputConfirmPasswordFormControl.dirty
  }

  get isShowConfirmPassword() {
    return this.inputFirstNameFormControl.dirty &&
      this.inputLastNameFormControl.dirty &&
      this.inputPhoneNumberFormControl.dirty &&
      this.inputEmailFormControl.dirty &&
      this.inputUsernameFormControl.dirty &&
      this.inputPasswordFormControl.dirty
  }

  confirmPasswordValidator(): ValidatorFn {

    return (): { [key: string]: any } | null => {
      const passwordControlValue = this.inputPasswordFormControl && this.inputPasswordFormControl.value || '';
      const confirmPasswordControlValue = this.inputConfirmPasswordFormControl && this.inputConfirmPasswordFormControl.value || '';
      const forbidden = (passwordControlValue !==  confirmPasswordControlValue)
        && this.inputPasswordFormControl.dirty
        && this.inputConfirmPasswordFormControl.dirty;
      return forbidden ? {'error message': {value: 'Подтвердите пароль правильно'}} : null;
    };
  }

  phoneNumberValidator(): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } | null => {
      const phoneRefExp = new RegExp(/[+][\d{1}][(]\d{3}[)][ ]\d{3}[-]\d{4}/);
      return phoneRefExp.test(formControl.value) ? null: {'error message': {value: 'Неверно введен номер'}}
    };
  }
}
