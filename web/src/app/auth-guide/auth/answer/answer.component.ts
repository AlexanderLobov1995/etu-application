import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponse} from "../auth-interfaces";
import {AuthService} from "../auth.service";
import {AuthState} from "../auth-state";
import {AuthGuideState} from "../../auth-guide-state";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.styl']
})
export class AnswerComponent implements OnInit {


  inputFormGroup: FormGroup;
  inputSecretQuestionFormControl: FormControl;
  inputAnswerFormControl: FormControl;

  errorMessage = '';

  constructor(public authService: AuthService,
              private authState: AuthState,
              private appState: AuthGuideState,
              private cd: ChangeDetectorRef) { }

  answer() {
    if (this.inputFormGroup.valid) {
      this.authService.answer(this.inputSecretQuestionFormControl.value, this.inputAnswerFormControl.value, this.appState.tempUserId.getValue())
        .subscribe((authResponse: AuthResponse) => this.handleSuccess(authResponse), (error) => this.handleError(error));
    }
  }


  handleSuccess(authResponse: AuthResponse) {
    this.authState.token.next(authResponse.token);
    this.authState.user = authResponse.user;
    this.appState.showPopupState.next('');
    this.appState.tempUserId.next('');
  }

  handleError(error) {
    this.errorMessage = 'Неверно введены логин или пароль';
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.inputSecretQuestionFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputAnswerFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputFormGroup = new FormGroup({
      secretQuestion: this.inputSecretQuestionFormControl,
      answer: this.inputAnswerFormControl
    });
  }

}
