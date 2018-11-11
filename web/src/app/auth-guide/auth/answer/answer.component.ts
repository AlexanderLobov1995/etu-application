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
  inputAnswerFormControl: FormControl;
  inputConfirmAnswerFormControl: FormControl;

  errorMessage = '';

  constructor(public authService: AuthService,
              private authState: AuthState,
              private appState: AuthGuideState,
              private cd: ChangeDetectorRef) { }

  answer() {
    if (this.inputFormGroup.valid) {
      this.authService.answer(this.inputAnswerFormControl.value, this.inputConfirmAnswerFormControl.value)
        .subscribe((authResponse: AuthResponse) => this.handleSuccess(authResponse), (error) => this.handleError(error));
    }
  }


  handleSuccess(authResponse: AuthResponse) {
    this.authState.token = authResponse.token;
    this.authState.user = authResponse.user;
    this.appState.showAnswerDialog = false;
  }

  handleError(error) {
    this.inputAnswerFormControl.setErrors({error});
    this.inputConfirmAnswerFormControl.setErrors({error});
    this.errorMessage = 'Неверно введены логин или пароль';
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.inputAnswerFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputConfirmAnswerFormControl = new FormControl('', [
      Validators.required
    ]);
    this.inputFormGroup = new FormGroup({
      answer: this.inputAnswerFormControl,
      confirmAnswer: this.inputConfirmAnswerFormControl
    });
  }

}
