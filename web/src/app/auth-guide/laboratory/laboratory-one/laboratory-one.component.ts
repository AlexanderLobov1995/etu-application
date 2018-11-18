import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-laboratory-one',
  templateUrl: './laboratory-one.component.html',
  styleUrls: ['./laboratory-one.component.styl'],
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
})
export class LaboratoryOneComponent implements OnInit {
  users = [];
  inputFormGroup: FormGroup;
  inputUsernameFormControl: FormControl;
  inputPasswordFormControl: FormControl;

  inputGetFormControl = new FormControl(false);
  inputUpdateFormControl  = new FormControl(false);
  inputCreateFormControl = new FormControl(false);
  inputDeleteFormControl = new FormControl(false);

  showErrorMessageRules = false;
  isRightsChecked = false;

  foundUser;

  constructor() { }

  ngOnInit() {
    this.users = [
      {
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_1',
        password: 'ivan_ivanov_1',
        role: 'admin'
      },
      {
        id: 2,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_2',
        password: 'ivan_ivanov_2',
        role: 'user'
      },
      {
        id: 3,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_3',
        password: 'ivan_ivanov_3',
        role: 'admin'
      },
      {
        id: 4,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_4',
        password: 'ivan_ivanov_4',
        role: 'user'
      },
      {
        id: 5,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_5',
        password: 'ivan_ivanov_5',
        role: 'user'
      },
      {
        id: 6,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_6',
        password: 'ivan_ivanov_6',
        role: 'admin'
      },
      {
        id: 7,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_7',
        password: 'ivan_ivanov_7',
        role: 'admin'
      },
      {
        id: 8,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_8',
        password: 'ivan_ivanov_8',
        role: 'user'
      },
      {
        id: 9,
        firstName: 'Иван',
        lastName: 'Иванов',
        login: 'ivan_9',
        password: 'ivan_ivanov_9',
        role: 'admin'
      }
    ];

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

  checkUser() {
    this.foundUser = this.users.find((user)=> user.login === this.inputUsernameFormControl.value
      && user.password === this.inputPasswordFormControl.value);
  }

  checkRights () {
    this.isRightsChecked = true;
    switch (this.foundUser.role) {
      case 'user': {
        return this.showErrorMessageRules = !(this.inputGetFormControl.value && this.inputUpdateFormControl.value && !this.inputCreateFormControl.value && !this.inputDeleteFormControl.value);
      }
      case 'admin': {
        return this.showErrorMessageRules =  !(this.inputGetFormControl.value && this.inputUpdateFormControl.value && this.inputCreateFormControl.value && this.inputDeleteFormControl.value);
      }
      default: return false;
    }
  }

  get isShowStep2() {
    return this.inputUsernameFormControl.dirty
  }
  get isShowConfirmCredentials() {
    return this.inputUsernameFormControl.dirty && this.inputPasswordFormControl.dirty;
  }

  get isShowStep3() {
    return this.foundUser;
  }

  get isCompleted() {
    return this.isRightsChecked && !this.showErrorMessageRules && this.isShowStep3;
  }

}
